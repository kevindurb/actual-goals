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
        <h3>
          ${goal.name}
          <button @click=${() => this.#deleteGoal.run([goal.id])}>
            Delete
          </button>
        </h3>
        <progress min="0" max="100" value=${Math.random() * 100} />
      `,
    );
  }

  override render() {
    return html`
      <h1>
        Goals
        <button
          @click=${() => {
            window.location.href = '/goals/new';
          }}
        >
          Add Goal
        </button>
      </h1>
      ${this.#goalsTask.render({
        complete: (goals) => this.#renderGoalList(goals),
      })}
    `;
  }
}
