import { CommandRegistry } from './command-registry.js';
import { TextCommandResult } from './command-results.js';

export const createHelpHandler =
  (cmdRegistry: CommandRegistry) => async (): Promise<TextCommandResult> => {
    const commands: string[] = cmdRegistry
      .getCommands()
      .filter(command => command.getFullPath()[0] !== 'help')
      .map((command) => {
        const cmdPath = command.getSegments().map((segment) => {
          if (segment.type === 'argument') {
            return `<${segment.name}>`;
          }
          return segment.name;
        });
        return `${cmdPath.join(' ')} - ${command.getDescription()}`;
      })
      .sort();

    commands.push('help - Show available commands');

    return new TextCommandResult(
      commands.length > 0 ?
        `Available Commands:\n${commands.join('\n')}` :
        'No commands available yet. Add some commands to get started!',
    );
  };
