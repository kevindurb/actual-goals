import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import type { MdFilledSelect, MdFilledTextField } from '@material/web/all.js';
import { unwrap } from '../utils/unwrap.ts';
import {
  GoalsController,
  type CreateGoalBodyType,
} from './goals-controller.ts';
import { consume } from '@lit/context';
import { routerContext } from '../router-context.ts';
import type { Router } from '@lit-labs/router';
import { TaskStatus } from '@lit/task';

@customElement('new-goal')
export class NewGoal extends LitElement {
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

  @consume({ context: routerContext })
  private router!: Router;

  private controller = new GoalsController(this);

  @query('form')
  private $form: HTMLFormElement | null = null;

  @query('#name')
  private $name: MdFilledTextField | null = null;

  @query('#type')
  private $type: MdFilledSelect | null = null;

  @query('#amount')
  private $amount: MdFilledTextField | null = null;

  @query('end')
  private $end: MdFilledTextField | null = null;

  private get typeValue() {
    return this.$type?.value as CreateGoalBodyType['type'];
  }

  private get endValue() {
    return this.$end?.value ? new Date(this.$end.value) : undefined;
  }

  private async createGoal(event: SubmitEvent) {
    event.preventDefault();
    await this.controller.createTask.run([
      {
        name: this.$name?.value ?? '',
        type: this.typeValue,
        amount: this.$amount?.valueAsNumber ?? 0,
        end: this.endValue,
      },
    ]);

    this.router.goto(`/goals/${this.controller.createTask.value?.id}`);
  }

  private submitForm() {
    this.$form?.submit();
  }

  override render() {
    return html`
      <h1 class="md-typescale-display-large">Create a new Goal!</h1>
      <form @submit=${this.createGoal}>
        <md-filled-text-field
          id="name"
          label="Name"
          required
        ></md-filled-text-field>
        <md-filled-select id="type" required label="Type">
          <md-select-option value="ONE_TIME">One Time</md-select-option>
          <md-select-option value="MONTHLY">Monthly</md-select-option>
        </md-filled-select>
        <md-filled-text-field
          id="amount"
          label="Amount"
          type="number"
          min="0.00"
          step="0.01"
          required
        ></md-filled-text-field>
        <md-filled-text-field
          id="end"
          label="End"
          type="date"
          required
        ></md-filled-text-field>
        <md-fab label="Save" @click=${this.submitForm}>
          <md-icon slot="icon">save</md-icon>
        </md-fab>
      </form>
    `;
  }
}
