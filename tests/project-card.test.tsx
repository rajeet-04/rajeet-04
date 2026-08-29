import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { curatedProjects } from '../src/content/projects';
import { ProjectCard } from '../src/components/projects/ProjectCard';

it('reveals project details through an accessible button', async () => {
  const user = userEvent.setup();
  render(<ProjectCard project={curatedProjects[0]} />);
  expect(screen.getByRole('heading', { name: /jukes/i })).toBeVisible();
  await user.click(screen.getByRole('button', { name: /details for jukes/i }));
  expect(document.querySelector('.project-card__details')).toHaveTextContent(/jetpack compose/i);
});

it('gives each project a meaningful visual preview', () => {
  render(<ProjectCard project={curatedProjects[0]} />);

  const preview = screen.getByTestId('project-preview-jukes');
  expect(preview).toHaveAttribute('data-category', 'android');
  expect(preview).toHaveTextContent('JUKES');
  expect(preview).toHaveTextContent('Kotlin');
});
