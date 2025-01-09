import { LitElement, html } from 'lit';
import './nav-bar.js';

class ActualGoals extends LitElement {
  render() {
    return html`<nav-bar></nav-bar>`;
  }
}

customElements.define('actual-goals', ActualGoals);
