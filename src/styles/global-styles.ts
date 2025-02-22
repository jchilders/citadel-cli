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

    background-color: var(--citadel-bg, rgb(17, 24, 39));
    bottom: 0;
    box-sizing: border-box;
    color: var(--citadel-text, rgb(0, 99, 30));
    display: block;
    height: 40vh;
    left: 0;
    margin: 0;
    opacity: 0;
    padding: 0;
    position: fixed;
    transform: translateY(110vh);
    view-transition-name: citadel;
    width: 100%;
  }

  @keyframes slideUp {
    from {
      transform: translateY(110vh);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(110vh);
      opacity: 0;
    }
  }

  :host(.slide-up) {
    animation: slideUp 550ms ease-in forwards;
  }

  :host(.slide-down) {
    animation: slideDown 550ms ease-in forwards;
  }
`;
