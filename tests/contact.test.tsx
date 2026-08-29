import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactSection } from '../src/components/contact/ContactSection';
import { validateContact } from '../src/lib/contact';

it('shows required contact field errors', async () => {
  const user = userEvent.setup();
  render(<ContactSection />);
  await user.click(screen.getByRole('button', { name: /send message/i }));
  expect(screen.getByText(/name is required/i)).toBeVisible();
  expect(screen.getByText(/email is required/i)).toBeVisible();
});

it('rejects malformed contact input', () => {
  expect(validateContact({ name: '', email: 'bad', subject: '', message: '', website: '' })).toEqual({
    name: 'Name is required', email: 'Enter a valid email address', subject: 'Subject is required', message: 'Message is required',
  });
});
