import { LitElement, html } from 'lit';
import './nav-bar.js';
import { customElement } from 'lit/decorators.js';

@customElement('actual-goals')
export class ActualGoals extends LitElement {
  override render() {
    return html`<nav-bar></nav-bar>`;
  }
}
