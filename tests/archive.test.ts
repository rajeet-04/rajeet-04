import { isEligibleArchiveProject, toArchiveProject } from '../src/lib/archive';

it('excludes the profile repository from the public archive', () => {
  expect(isEligibleArchiveProject({ name: 'rajeet-04', fork: false, archived: false })).toBe(false);
});

it('preserves fork and archived ownership metadata', () => {
  expect(toArchiveProject({ name: 'example', description: '', language: 'TypeScript', updated_at: '2026-01-01T00:00:00Z', html_url: 'https://github.com/example', fork: true, archived: false })).toMatchObject({ ownership: 'fork', fork: true });
  expect(toArchiveProject({ name: 'old', description: '', language: null, updated_at: '2026-01-01T00:00:00Z', html_url: 'https://github.com/old', fork: false, archived: true }).archived).toBe(true);
});
