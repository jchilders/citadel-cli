import { html, TemplateResult } from 'lit';

/* eslint-disable no-shadow */
export enum CommandStatus {
  Pending = 'pending',
  Success = 'success',
  Failure = 'failure',
  Timeout = 'timeout',
}
/* eslint-enable no-shadow */

export abstract class CommandResult {
  private _status: CommandStatus = CommandStatus.Pending;

  constructor(public readonly timestamp: number = Date.now()) {}

  get status(): CommandStatus {
    return this._status;
  }

  markSuccess(): void {
    this._status = CommandStatus.Success;
  }

  markFailure(): void {
    this._status = CommandStatus.Failure;
  }

  markTimeout(): void {
    this._status = CommandStatus.Timeout;
  }

  abstract render(): TemplateResult;
}

export class JsonCommandResult extends CommandResult {
  constructor(
    public readonly data: any,
    timestamp?: number,
  ) {
    super(timestamp);
  }

  render(): TemplateResult {
    return html`
      <pre class="text-gray-200">
        ${JSON.stringify(this.data, null, 2)}
      </pre
      >
    `;
  }
}

export class TextCommandResult extends CommandResult {
  constructor(
    public readonly text: string,
    timestamp?: number,
  ) {
    super(timestamp);
  }

  render(): TemplateResult {
    return html`
      <div class="text-gray-200 whitespace-pre font-mono">${this.text}</div>
    `;
  }
}

export class ErrorCommandResult extends CommandResult {
  constructor(
    public readonly error: string,
    timestamp?: number,
  ) {
    super(timestamp);
    this.markFailure();
  }

  render(): TemplateResult {
    return html`<div class="mt-1 text-red-400">${this.error}</div>`;
  }
}

export class PendingCommandResult extends CommandResult {
  render(): TemplateResult {
    return html`<div class="text-gray-400">...</div>`;
  }
}

export class ImageCommandResult extends CommandResult {
  constructor(
    public readonly imageUrl: string,
    public readonly altText: string = '',
    timestamp?: number,
  ) {
    super(timestamp);
  }

  render(): TemplateResult {
    return html`
      <div class="my-2">
        <img
          src=${this.imageUrl}
          alt=${this.altText}
          class="max-w-[400px] max-h-[300px] h-auto rounded-lg object-contain"
        />
      </div>
    `;
  }
}
