import { LitElement, html } from 'lit';
import './nav-bar.js';
import { customElement } from 'lit/decorators.js';
import './app-router.ts';

@customElement('actual-goals-app')
export class ActualGoalsApp extends LitElement {
  override render() {
    return html`
      <nav-bar></nav-bar>
      <app-router></app-router>
    `;
  }
}
