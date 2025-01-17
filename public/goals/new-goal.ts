import type { Router } from '@lit-labs/router';
import { consume } from '@lit/context';
import type { MdFilledSelect, MdFilledTextField } from '@material/web/all.js';
import { LitElement, css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { routerContext } from '../router-context.ts';
import {
	type CreateGoalBodyType,
	GoalsController,
} from './goals-controller.ts';

@customElement('new-goal')
export class NewGoal extends LitElement {
	static override styles = [
		css`
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

	@query('#form')
	private accessor $form: HTMLFormElement | null = null;

	@query('#name')
	private accessor $name: MdFilledTextField | null = null;

	@query('#type')
	private accessor $type: MdFilledSelect | null = null;

	@query('#amount')
	private accessor $amount: MdFilledTextField | null = null;

	@query('end')
	private accessor $end: MdFilledTextField | null = null;

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

		this.router.goto('/goals');
	}

	private submitForm() {
		this.$form?.requestSubmit();
	}

	override render() {
		return html`
      <ag-header center>Create a new Goal!</ag-header>
      <form id="form" @submit=${this.createGoal}>
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
        ></md-filled-text-field>
        <md-fab label="Save" @click=${this.submitForm}>
          <md-icon slot="icon">save</md-icon>
        </md-fab>
      </form>
    `;
	}
}
