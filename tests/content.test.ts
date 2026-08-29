import { curatedProjects } from '../src/content/projects';
import { timeline } from '../src/content/timeline';

it('keeps exactly six featured records with source links', () => {
  expect(curatedProjects.filter((project) => project.featured)).toHaveLength(6);
  expect(curatedProjects.every((project) => project.evidenceUrl)).toBe(true);
});

it('does not publish the excluded Ureckon record', () => {
  expect(timeline.some((item) => /ureckon/i.test(item.title))).toBe(false);
});
