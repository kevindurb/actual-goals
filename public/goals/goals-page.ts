import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import type { NewGoalModal } from './new-goal-modal.ts';
import './new-goal-modal.ts';
import '../elements/icon-button.ts';

@customElement('goals-page')
export class GoalsPage extends LitElement {
  #newGoalModal = createRef<NewGoalModal>();

  #openNewGoalModal() {
    this.#newGoalModal.value?.show();
  }

  override render() {
    return html`
      <h1>Goals</h1>
      <icon-button @click=${this.#openNewGoalModal} icon="plus"></icon-button>
      <new-goal-modal ${ref(this.#newGoalModal)}></new-goal-modal>
    `;
  }
}
