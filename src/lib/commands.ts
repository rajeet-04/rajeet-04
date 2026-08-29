export const COMMANDS = ['work', 'research', 'stack', 'contact', 'theme', 'help'] as const;
export type CommandResult = { target?: string; message: string };

export function executeCommand(command: string): CommandResult {
  const normalized = command.trim().toLowerCase();
  if (normalized === 'work' || normalized === 'research' || normalized === 'contact') return { target: normalized, message: `Opening ${normalized}` };
  if (normalized === 'stack') return { target: 'capabilities', message: 'Opening capabilities' };
  if (normalized === 'theme') return { message: 'Use the theme controls in the header' };
  if (normalized === 'help') return { message: 'Try: work, research, stack, contact, theme' };
  return { message: `Unknown command: ${normalized || 'empty'}` };
}
