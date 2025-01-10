import { LitElement, css, html } from 'lit';
import * as styles from './styles.js';
import { customElement } from 'lit/decorators.js';

@customElement('nav-bar')
export class NavBar extends LitElement {
  static override styles = [
    styles.links,
    styles.boxSizing,
    css`
      nav {
        height: 48px;
        background-color: var(--surface-tonal-a10);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 4px 8px;
      }
    `,
  ];

  override render() {
    return html`
      <nav>
        <a href="/">Actual Goals</a>
      </nav>
    `;
  }
}
