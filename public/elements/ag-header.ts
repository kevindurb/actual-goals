import { css, html, LitElement } from 'lit';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import { unwrap } from '../utils/unwrap.ts';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ag-header')
export class AgHeader extends LitElement {
  static override styles = [
    unwrap(typescaleStyles.styleSheet),
    css`
      .center {
        text-align: center;
      }
    `,
  ];

  @property({ type: Boolean })
  center = false;

  override render() {
    return html`<h1
      class="md-typescale-display-large ${classMap({ center: this.center })}"
    >
      <slot></slot>
    </h1>`;
  }
}
