import { useEffect, useRef, useState } from 'react';
import { COMMANDS, executeCommand } from '../../lib/commands';

export function CommandSurface({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('Try a command.');
  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  if (!open) return null;
  const run = () => { const result = executeCommand(value); setMessage(result.message); if (result.target) { window.location.hash = result.target; onOpenChange(false); } };
  return <div className="command-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onOpenChange(false); }}><section className="command-surface" role="dialog" aria-modal="true" aria-labelledby="command-title"><div className="command-surface__header"><h2 id="command-title">Command surface</h2><button type="button" aria-label="Close command surface" onClick={() => onOpenChange(false)}>Close</button></div><label htmlFor="command-input">Command</label><input id="command-input" aria-label="Command" value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') run(); if (event.key === 'Escape') onOpenChange(false); }} placeholder="work" autoComplete="off" /><p role="status">{message}</p><div className="command-list">{COMMANDS.map((command) => <button type="button" key={command} onClick={() => { setValue(command); }}>{command}</button>)}</div></section></div>;
}
