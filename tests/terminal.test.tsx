import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommandSurface } from '../src/components/terminal/CommandSurface';

it('routes the work command to the work section', async () => {
  const user = userEvent.setup();
  render(<CommandSurface open onOpenChange={() => {}} />);
  await user.type(screen.getByRole('textbox', { name: /command/i }), 'work{enter}');
  expect(window.location.hash).toBe('#work');
});
