import { css } from 'lit';

export const globalStyles = css`
  :host {
    all: initial;

    --citadel-accent: #646cff;
    --citadel-accent-hover: #535bf2;
    --citadel-bg: rgb(17, 24, 39);
    --citadel-border: rgb(55, 65, 81);
    --citadel-error: rgb(239, 68, 68);
    --citadel-min-height: 200px;
    --citadel-max-height: 80vh;
    --citadel-default-height: 35vh;
    --citadel-text: rgba(255, 255, 255, 0.87);

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
    transform: translateY(110vh);
  }

  @keyframes slideUp {
    from {
      transform: translateY(110vh);
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
      transform: translateY(110vh);
    }
  }

  :host(.slide-up) {
    animation: slideUp 550ms ease-in forwards;
  }

  :host(.slide-down) {
    animation: slideDown 550ms ease-in forwards;
  }
`;
