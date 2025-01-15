import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Task } from '@lit/task';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import type { Goal } from '../../src/GoalModel.ts';
import { unwrap } from '../utils/unwrap.ts';

@customElement('goals-page')
export class GoalsPage extends LitElement {
  static override styles = [
    unwrap(typescaleStyles.styleSheet),
    css`
      h1 {
        text-align: center;
      }

      md-fab {
        position: fixed;
        bottom: var(--md-sys-spacing-md);
        right: var(--md-sys-spacing-md);
      }
    `,
  ];

  #goalsTask = new Task<[], Goal[]>(this, {
    task: () => fetch('/api/goals').then((res) => res.json()),
    args: () => [],
  });

  #renderGoalList(goals: Goal[]) {
    return goals.map(
      (goal) => html`
        <md-list-item href=${`/goals/${goal.id}`}>${goal.name}</md-list-item>
      `,
    );
  }

  override render() {
    return html`
      <h1 class="md-typescale-display-large">Goals</h1>
      <md-list>
        ${this.#goalsTask.render({
          complete: (goals) => this.#renderGoalList(goals),
        })}
      </md-list>
      <md-fab
        @click=${() => {
          window.location.href = '/goals/new';
        }}
        ><md-icon slot="icon">edit</md-icon></md-fab
      >
    `;
  }
}
