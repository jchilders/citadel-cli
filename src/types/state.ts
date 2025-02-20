import { ArgumentSegment } from './segments.js';
import { CommandResult, PendingCommandResult } from './command-results.js';
import { CommandStorage, StoredCommand } from './storage.js';
import { SegmentStack } from './segment-stack.js';

export class OutputItem {
  readonly timestamp: number;

  readonly command: string[];

  result: CommandResult;

  constructor(segmentStack: SegmentStack, result?: CommandResult) {
    this.command = segmentStack.toArray().map((segment): string => {
      if (segment.type === 'argument') {
        return (segment as ArgumentSegment).value || '';
      }
      return segment.name;
    });
    this.timestamp = Date.now();
    this.result = result ?? new PendingCommandResult();
  }
}

export interface CitadelState {
  currentInput: string;
  isEnteringArg: boolean;
  output: OutputItem[];
  history: {
    commands: StoredCommand[];
    position: number | null;
    storage?: CommandStorage;
  };
}

export interface CitadelActions {
  setCurrentInput: (input: string) => void;
  setIsEnteringArg: (isEntering: boolean) => void;
  addOutput: (output: OutputItem) => void;
  executeCommand: () => Promise<void>;
  clearHistory: () => Promise<void>;
}
