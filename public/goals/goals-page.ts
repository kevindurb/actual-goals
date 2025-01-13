import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import type { NewGoalModal } from './new-goal-modal.ts';
import { Task } from '@lit/task';

interface Goal {
  id: number;
  name: string;
}

@customElement('goals-page')
export class GoalsPage extends LitElement {
  #newGoalModal = createRef<NewGoalModal>();
  #goalsTask = new Task<[], Goal[]>(this, {
    task: async () => fetch('/api/goals').then((res) => res.json()),
    args: () => [],
  });

  #renderGoalList(goals: Goal[]) {
    return html`
      <table>
        <tbody>
          ${goals.map(
            (goal) => html`
              <tr>
                <th>${goal.name}</th>
              </tr>
            `,
          )}
        </tbody>
      </table>
    `;
  }

  override render() {
    return html`
      <h1>
        Goals
        <button @click=${() => (window.location.href = '/goals/new')}>
          Add Goal
        </button>
      </h1>
      ${this.#goalsTask.render({
        complete: (goals) => this.#renderGoalList(goals),
      })}
    `;
  }
}
