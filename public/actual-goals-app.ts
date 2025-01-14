import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './app-router.ts';

@customElement('actual-goals-app')
export class ActualGoalsApp extends LitElement {
  override render() {
    return html` <app-router></app-router> `;
  }
}
