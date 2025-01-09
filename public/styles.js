import { css } from 'lit';

export const links = css`
  a {
    color: var(--color-primary-a0);
    text-decoration: none;
  }
`;

export const boxSizing = css`
  :host {
    box-sizing: border-box;
  }

  :host * {
    box-sizing: inherit;
  }
`;
