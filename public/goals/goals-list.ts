import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';
import { GoalsController, type Goal } from './goals-controller.ts';
import { consume } from '@lit/context';
import { routerContext } from '../router-context.ts';

@customElement('goals-list')
export class GoalsList extends LitElement {
  static override styles = [
    css`
      md-fab {
        position: fixed;
        bottom: var(--md-sys-spacing-md);
        right: var(--md-sys-spacing-md);
      }
    `,
  ];

  @consume({ context: routerContext })
  private router!: Router;

  private controller = new GoalsController(this);

  private renderGoalList(goals: Goal[]) {
    return goals.map(
      (goal) => html`
        <md-list-item @click=${() => this.router.goto(`/goals/${goal.id}`)}</md-list-item>>
          <md-circular-progress slot="start" value="0.6"></md-circular-progress>
          <div slot="headline">${goal.name}</div>
          <div slot="supporting-text">
            ${
              goal.type === 'ONE_TIME'
                ? `${goal.amount} by ${goal.end}`
                : `${goal.amount} every month`
            }
          </div>
        </md-list-item>
        <md-divider inset></md-divider>
      `,
    );
  }

  override render() {
    return html`
      <ag-header center>Goals</ag-header>
      <md-list>
        ${this.controller.listTask.render({
          complete: (goals) => this.renderGoalList(goals),
        })}
      </md-list>
      <md-fab label="New" @click=${() => this.router.goto('/goals/new')}>
        <md-icon slot="icon">add</md-icon>
      </md-fab>
    `;
  }
}
