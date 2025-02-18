import { html, css, LitElement } from 'lit';
import { globalStyles } from './styles/global-styles.js';
import { property } from 'lit/decorators.js';

export class CitadelCli extends LitElement {
  static styles = globalStyles;

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
