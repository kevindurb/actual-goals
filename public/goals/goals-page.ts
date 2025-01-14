import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Task } from '@lit/task';
import type { Goal } from '../../src/GoalModel.ts';

@customElement('goals-page')
export class GoalsPage extends LitElement {
  #goalsTask = new Task<[unknown], Goal[]>(this, {
    task: () => fetch('/api/goals').then((res) => res.json()),
    args: () => [this.#deleteGoal.value],
  });

  #deleteGoal = new Task<[number]>(this, {
    task: ([id]) => fetch(`/api/goals/${id}`, { method: 'DELETE' }),
  });

  #renderGoalList(goals: Goal[]) {
    return goals.map(
      (goal) => html`
        <md-list-item>
          ${goal.name}
          <md-icon @click=${() => this.#deleteGoal.run([goal.id])} slot="end"
            >open_in_new</md-icon
          >
        </md-list-item>
      `,
    );
  }

  override render() {
    return html`
      <h1>Goals</h1>
      <md-list>
        ${this.#goalsTask.render({
          complete: (goals) => this.#renderGoalList(goals),
        })}
      </md-list>
      <md-fab
        @click=${() => {
          window.location.href = '/goals/new';
        }}
        ><md-icon slot="icon">add</md-icon></md-fab
      >
    `;
  }
}
