import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';

@customElement('app-router')
export class AppRouter extends LitElement {
  #router = new Router(this, [
    {
      path: '/',
      enter: () => {
        window.location.href = '/goals';
        return false;
      },
    },
    {
      path: '/goals',
      render: () => html`<goals-page></goals-page>`,
      enter: () => !!import('./goals/goals-page.ts'),
    },
    {
      path: '/goals/new',
      render: () => html`<new-goal-page></new-goal-page>`,
      enter: () => !!import('./goals/new-goal-page.ts'),
    },
  ]);

  override render() {
    return this.#router.outlet();
  }
}
