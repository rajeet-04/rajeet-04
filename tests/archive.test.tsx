import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ArchiveSection } from '../src/components/archive/ArchiveSection';

it('renders the archive filter and honest empty state', async () => {
  const user = userEvent.setup();
  render(<ArchiveSection />);
  expect(screen.getByLabelText(/ownership/i)).toBeInTheDocument();
  await user.selectOptions(screen.getByLabelText(/ownership/i), 'original');
  expect(screen.getByText(/github archive/i)).toBeVisible();
});
