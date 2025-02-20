/** Base interface for command segments */
export abstract class BaseSegment {
  constructor(
    public readonly type: 'word' | 'argument' | 'null',
    public readonly name: string,
    public readonly description?: string,
  ) {}

  toString(): string {
    return this.name;
  }
}

/** Represents a null segment for empty stack operations */
export class NullSegment extends BaseSegment {
  constructor() {
    super('null', '>null<', 'Empty segment');
  }
}

/** Represents a literal word in a command path */
export class WordSegment extends BaseSegment {
  constructor(name: string, description?: string) {
    super('word', name, description);
  }
}

/** Represents an argument that can be passed to a command, and its value */
export class ArgumentSegment extends BaseSegment {
  constructor(
    name: string,
    description?: string,
    public value?: string,
    public readonly valid?: () => boolean,
  ) {
    super('argument', name, description);
  }
}

/** Represents a segment in a command path - either a word or argument */
export type CommandSegment = WordSegment | ArgumentSegment | NullSegment;
