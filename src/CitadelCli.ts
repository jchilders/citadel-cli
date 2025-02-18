import { html, css, LitElement, unsafeCSS } from 'lit';
import { globalStyles } from './styles/global-styles.js';
import { property } from 'lit/decorators.js';

export class CitadelCli extends LitElement {
  static styles = [
    globalStyles,
    css`
    :host {
      /* Apply global styles directly to host */
      ${globalStyles}

      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40vh;
      background-color: var(--citadel-bg, rgb(17, 24, 39));
      color: var(--citadel-cli-text-color, #0f0);
      color: #0f0;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  `];

  @property({ type: String }) header = 'Hey there';

  @property({ type: Number }) counter = 5;

  __increment() {
    this.counter += 1;
  }

  render() {
    return html`
      <h2>${this.header} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
  }
}
