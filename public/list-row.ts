import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('list-row')
export class ListRow extends LitElement {
  @property()
  label = '';

  override render() {
    return html`<h3>${this.label}</h3>`;
  }
}
