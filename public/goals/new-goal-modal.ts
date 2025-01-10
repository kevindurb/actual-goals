import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

@customElement('new-goal-modal')
export class NewGoalModal extends LitElement {
  #dialog = createRef<HTMLDialogElement>();

  show() {
    this.#dialog.value?.show();
  }

  override render() {
    return html`<dialog ${ref(this.#dialog)}></dialog>`;
  }
}
