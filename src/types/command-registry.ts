import { Logger } from '../utils/logger.js';
import { CommandHandler, CommandNode, NoopHandler } from './command-node.js';
import { ArgumentSegment, CommandSegment, WordSegment } from './segments.js';

/**
 * Used to store user-defined commands.
 */
export class CommandRegistry {
  private commands: CommandNode[] = [];

  getCommands(): CommandNode[] {
    return this.commands;
  }

  /**
   * Registers a new command
   *
   * @param segments The segments that make up the command path
   * @param description A description of what the command does
   * @param handler The function to execute when the command is run
   * @throws {Error} If attempting to add a duplicate command
   */
  addCommand(
    segments: CommandSegment[],
    description: string,
    handler: CommandHandler = NoopHandler,
  ): void {
    if (!segments?.length) {
      throw new Error('Command path cannot be empty');
    }

    const newCommandNode = new CommandNode(segments, description, handler);
    const existingCommand = this.commands.find(command => {
      const cmdPattern = command
        .getSegments()
        .map(segment => (segment.type === 'argument' ? '*' : segment.name))
        .join(' ');

      const newPattern = segments
        .map(segment => (segment.type === 'argument' ? '*' : segment.name))
        .join(' ');

      return cmdPattern === newPattern;
    });

    if (existingCommand) {
      throw new Error(
        `Duplicate commands: '${existingCommand.getFullPathString()}' and '${newCommandNode.getFullPathString()}'`,
      );
    }

    this.commands.push(newCommandNode);
  }

  /**
   * Retrieves a command from the registry for the given path.
   *
   * @param path The path of the command.
   * @returns The command node or undefined if not found.
   */
  getCommand(path: string[]): CommandNode | undefined {
    return this.commands.find(command => {
      const fullPath = command.getFullPath();
      const searchPath = path.join(' ');
      return fullPath.join(' ') === searchPath;
    });
  }

  /**
   * Checks if a command exists for the given path.
   *
   * @param path The path to check
   * @returns True if a command exists for the path
   */
  commandExistsForPath(path: string[]): boolean {
    // Convert the path to a pattern where arguments are represented by '*'
    const pathPattern = this.commands.map(cmd =>
      cmd
        .getSegments()
        .map(segment => (segment.type === 'argument' ? '*' : segment.name))
        .join(' '),
    );

    // Convert the new path to a pattern
    const newPathPattern = path
      .map((segment, index) => {
        const isArgument = this.commands.some(
          cmd => cmd.getSegments()[index]?.type === 'argument',
        );
        return isArgument ? '*' : segment;
      })
      .join(' ');

    return pathPattern.includes(newPathPattern);
  }

  /**
   * Gets possible matches for a given path.
   *
   * @param path The path to get completions for.
   * @returns An array of completion strings.
   */
  getCompletionsStrings(path: string[]): string[] {
    return this.getCompletions(path).map(segment => segment.name);
  }

  /**
   * Gets an array of segments reachable from a given path
   *
   * @param path The path to get completions for.
   * @returns An array of completion strings.
   */
  getCompletions(path: string[]): CommandSegment[] {
    Logger.debug('[getCompletions] path: ', path);

    if (!path.length) {
      const topLevelSegments = this.commands.map(cmd => cmd.getSegments()[0]);
      const isEqual = (a: CommandSegment, b: CommandSegment): boolean =>
        a.type === b.type && a.name === b.name;

      const uniqueSegments = topLevelSegments.filter(
        (seg, index, self) => index === self.findIndex(o => isEqual(o, seg)),
      );

      return uniqueSegments;
    }

    const pathDepth = path.length;

    // Find all commands that match the current path prefix
    const matchingSegments = this.commands
      .filter(command => {
        const segments = command.getSegments();

        // Skip if command isn't long enough to have completions at this depth
        if (segments.length <= pathDepth - 1) {
          return false;
        }

        // Check if all segments up to current depth match
        for (let i = 0; i < pathDepth; i += 1) {
          const pathSegment = path[i];
          const cmdSegment = segments[i];

          // Handle argument segments (marked with '*' in path)
          if (pathSegment === '*' && cmdSegment.type === 'argument') {
            // Skip to next iteration
            return false;
          }

          // Handle word segments
          if (pathSegment !== cmdSegment.name) {
            return false;
          }
        }
        return true;
      })
      .filter(command => command.getSegments().length > pathDepth)
      .map(command => {
        const segment = command.getSegments()[pathDepth];
        const SegmentClass =
          segment.type === 'argument' ? ArgumentSegment : WordSegment;
        return new SegmentClass(segment.name, segment.description);
      });

    // Deduplicate segments based on type and name
    const uniqueSegments = matchingSegments.filter(
      (segment, index, self) =>
        index ===
        self.findIndex(s => s.type === segment.type && s.name === segment.name),
    );

    return uniqueSegments;
  }

  hasNextSegment(path: string[]): boolean {
    return this.getCompletions(path).length > 0;
  }
}
