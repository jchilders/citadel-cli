import { html, LitElement } from 'lit';
import { createContext, provide } from '@lit/context';
import { customElement, property, state } from 'lit/decorators.js';
import { globalStyles } from './styles/global-styles.js';
import { LogLevel } from './utils/logger.js';
import { handleKeydown } from './handlers/keydown.js';

export interface CitadelConfig {
  activationKey: string;
  deactivationKey: string;
  logLevel: LogLevel;
}

export const defaultConfig: CitadelConfig = {
  activationKey: '.',
  deactivationKey: 'Escape',
  logLevel: LogLevel.WARN,
};

export const citadelConfigContext = createContext<CitadelConfig>('citadel-config');

@customElement('citadel-cli')
export class CitadelCli extends LitElement {
  static styles = globalStyles;

  @state() private isVisible = false;

  @property({ type: String }) header = 'Hey there';

  @property({ type: Number }) counter = 5;

  @provide({ context: citadelConfigContext })
  @property({ attribute: false })
    config: CitadelConfig = defaultConfig;

  __increment() {
    this.counter += 1;
  }

  constructor() {
    super();
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  /* eslint-disable wc/guard-super-call */
  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleKeydown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeydown);
  }
  /* eslint-enable wc/guard-super-call */

  private setVisible(visible: boolean) {
    this.isVisible = visible;
  }

  private async handleKeydown(event: KeyboardEvent) {
    await handleKeydown(event, this.config, {
      isVisible: this.isVisible,
      setVisible: this.setVisible.bind(this),
      toggleVisibilityHandler: this.toggleVisibility.bind(this),
    });
  }

  private toggleVisibility() {
    // Use requestAnimationFrame to batch class changes
    requestAnimationFrame(() => {
      const root = this.shadowRoot?.host;
      if (root) {
        // Create a new class list based on state
        const newClasses = new Set(root.classList);

        // Update classes based on visibility state
        if (this.isVisible) {
          newClasses.add('slide-up');
          newClasses.delete('slide-down');
          newClasses.delete('hidden');
        } else {
          newClasses.add('slide-down');
          newClasses.delete('slide-up');
          newClasses.add('hidden');
        }

        // Apply the new class list
        root.className = Array.from(newClasses).join(' ');
      }
    });
  }

  render() {
    return html`
      <div>
        <h2>${this.header} Nr. ${this.counter}!</h2>
        <button @click=${this.__increment}>increment</button>
      </div>
    `;
  }
}
