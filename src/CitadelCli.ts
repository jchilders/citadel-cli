import { html, css, LitElement } from 'lit';
import { globalStyles } from './styles/global-styles.js';
import { property, state } from 'lit/decorators.js';

export class CitadelCli extends LitElement {
  static styles = globalStyles;

  @state() private isVisible = true;
  @property({ type: String }) header = 'Hey there';

  @property({ type: Number }) counter = 5;

  __increment() {
    this.counter += 1;
  }

  constructor() {
    super();
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeydown);
  }

  private async handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (document.startViewTransition) {
        await document.startViewTransition(() => {
          this.isVisible = !this.isVisible;
          this.classList.toggle('hidden', !this.isVisible);
        }).finished;
      } else {
        this.isVisible = !this.isVisible;
        this.classList.toggle('hidden', !this.isVisible);
      }
    }
  }

  render() {
    return html`
      <div class="${this.isVisible ? 'visible' : 'hidden'}">
        <h2>${this.header} Nr. ${this.counter}!</h2>
        <button @click=${this.__increment}>increment</button>
      </div>
    `;
  }
}
