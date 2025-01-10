import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('icon-button')
export class IconButton extends LitElement {
  static override styles = css`
    button {
    }
  `;

  @property({ type: String })
  accessor icon = '';

  override render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
      />
      <button><i class="fa-solid fa-${this.icon}"></i></button>
    `;
  }
}
