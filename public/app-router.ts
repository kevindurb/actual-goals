import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';
import { provide } from '@lit/context';
import { routerContext } from './router-context.ts';

@customElement('app-router')
export class AppRouter extends LitElement {
  @provide({ context: routerContext })
  private router = new Router(this, [
    {
      path: '/',
      enter: () => {
        window.location.href = '/goals';
        return false;
      },
    },
    {
      path: '/goals',
      render: () => html`<goals-list></goals-list>`,
      enter: () => !!import('./goals/goals-list.ts'),
    },
    {
      path: '/goals/new',
      render: () => html`<new-goal></new-goal>`,
      enter: () => !!import('./goals/new-goal.ts'),
    },
  ]);

  override render() {
    return this.router.outlet();
  }
}
