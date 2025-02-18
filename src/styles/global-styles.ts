import { css } from 'lit';

export const globalStyles = css`
  :host {
    --citadel-bg: rgb(17, 24, 39);
    --citadel-text: rgba(255, 255, 255, 0.87);

    --citadel-border: rgb(55, 65, 81);
    --citadel-accent: #646cff;
    --citadel-accent-hover: #535bf2;
    --citadel-min-height: 200px;
    --citadel-max-height: 80vh;
    --citadel-default-height: 35vh;
    --citadel-error: rgb(239, 68, 68);

    view-transition-name: citadel;
    background-color: var(--citadel-bg, rgb(17, 24, 39));
    color: var(--citadel-text, rgb(0, 99, 30));
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :host(.hidden) {
    display: none;
  }

  @keyframes slide-in {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  @keyframes slide-out {
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
  }

  ::view-transition-old(citadel) {
    animation: 250ms cubic-bezier(0.4, 0, 1, 1) both slide-out;
  }

  ::view-transition-new(citadel) {
    animation: 250ms cubic-bezier(0, 0, 0.2, 1) both slide-in;
  }
`;
