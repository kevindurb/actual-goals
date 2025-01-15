import { Task } from '@lit/task';
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import type { CreateGoalBody } from '../../src/GoalController.ts';
import type { z } from 'zod';
import type { MdFilledTextField } from '@material/web/all.js';

type CreateGoalBodyType = z.infer<typeof CreateGoalBody>;

@customElement('new-goal-page')
export class NewGoalPage extends LitElement {
  static override styles = [typescaleStyles.styleSheet!];

  #createGoal = new Task<[CreateGoalBodyType]>(this, {
    task: ([body]) =>
      fetch('/api/goals', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
  });

  @query('input#goal-name')
  accessor goalName: MdFilledTextField | null = null;

  #submitForm(event: SubmitEvent) {
    event.preventDefault();
    this.#createGoal.run([
      {
        name: this.goalName?.value ?? '',
        type: 'ONE_TIME',
      },
    ]);
  }

  override render() {
    return html`
      <h1 class="md-typescale-display-large">Create a new Goal!</h1>
      <form @submit=${this.#submitForm}>
        <md-filled-text-field
          id="goal-name"
          label="Name"
          required
        ></md-filled-text-field>
        <md-filled-button type="submit">Create</md-filled-button>
      </form>
    `;
  }
}
