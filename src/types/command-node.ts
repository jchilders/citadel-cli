import { CommandResult, TextCommandResult } from './command-results.js';
import { CommandSegment } from './segments.js';

/**
 * A callback function that executes a command and returns a Promise of CommandResult.
 * Similar to a lambda in Ruby, this is a first-class function that can be passed
 * as an argument and stored as a variable.
 */
export type CommandHandler = (_args: string[]) => Promise<CommandResult>;

/**
 * A no-op handler that returns an empty string. Used as the default handler
 * for CommandNodes that don't specify a handler.
 */
export const NoopHandler: CommandHandler = async () =>
  new TextCommandResult('');

/** Defines a complete command with its path and behavior */
export class CommandNode {
  constructor(
    private readonly segments: CommandSegment[],
    private readonly description?: string,
    private readonly handler: CommandHandler = NoopHandler,
  ) {}

  getSegments(): CommandSegment[] {
    return this.segments;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getHandler(): CommandHandler {
    return this.handler;
  }

  hasArguments(): boolean {
    return this.segments.some(segment => segment.type === 'argument');
  }

  getFullPath(): string[] {
    return this.segments.map(segment => segment.name);
  }

  getFullPathString(): string {
    return this.getFullPath().join(' ');
  }

  equals(other: CommandNode): boolean {
    return this.getFullPathString() === other.getFullPathString();
  }
}
