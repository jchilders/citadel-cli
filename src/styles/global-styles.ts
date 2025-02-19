import { css } from 'lit';

export const globalStyles = css`
  :host {
    --citadel-bg: rgb(17, 24, 39);
    --citadel-text: rgba(255, 255, 255, 0.87);

    --citadel-accent: #646cff;
    --citadel-accent-hover: #535bf2;
    --citadel-border: rgb(55, 65, 81);
    --citadel-error: rgb(239, 68, 68);
    --citadel-min-height: 200px;
    --citadel-max-height: 80vh;
    --citadel-default-height: 35vh;

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
    transform: translateY(100%);
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

  :host(.slide-up) {
    animation: slideUp 200ms ease-out forwards;
  }

  :host(.slide-down) {
    animation: slideDown 200ms ease-out forwards;
  }
`;
