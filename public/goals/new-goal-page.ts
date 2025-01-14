import { Task } from '@lit/task';
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import type { CreateGoalBody } from '../../src/GoalController.ts';
import type { z } from 'zod';

type CreateGoalBodyType = z.infer<typeof CreateGoalBody>;

@customElement('new-goal-page')
export class NewGoalPage extends LitElement {
  #createGoal = new Task<[CreateGoalBodyType]>(this, {
    task: ([body]) =>
      fetch('/api/goals', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
  });

  @query('input#goal-name')
  goalName!: HTMLInputElement;

  #submitForm() {
    this.#createGoal.run([
      {
        name: this.goalName.value,
        type: 'ONE_TIME',
      },
    ]);
  }

  override render() {
    return html`
      <h1>Create a new Goal!</h1>
      <form @submit=${this.#submitForm}>
        <div>
          <label for="goal-name">Name</label>
          <input id="goal-name" type="text" required />
        </div>
      </form>
    `;
  }
}
