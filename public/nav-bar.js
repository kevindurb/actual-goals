import { LitElement, css, html } from 'lit';
import * as styles from './styles.js';

class NavBar extends LitElement {
  static styles = [
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

  render() {
    return html`
      <nav>
        <a href="/">Actual Goals</a>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
