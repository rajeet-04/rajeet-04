# Rajeet Ash Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a static, evidence-led portfolio for Rajeet Ash on GitHub Pages, with a disciplined editorial interface and accessible engineering-focused interactions.

**Architecture:** Build a Vite React TypeScript single-page application using versioned local content data. Keep curated work separate from a generated public GitHub archive, and ship the hero canvas, command surface, Pretext statement, and project reveals as independently testable components. GitHub Actions builds/deploys the site and refreshes archive data without touching the existing profile README synchronization workflow.

**Tech Stack:** Bun, Vite, React, TypeScript, Vitest, React Testing Library, CSS custom properties, Anime.js, Canvas 2D, `@chenglou/pretext`, Sonner, EmailJS, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-30-portfolio-design.md`

## Global Constraints

- Use Vite with React and TypeScript; the site has no server runtime, CMS, database, authentication, WebGL, or second repository.
- Use Bun for package installation and scripts.
- Use CSS custom properties and component-scoped class names; do not add Tailwind unless an executor proposes and receives approval for a concrete advantage.
- Use Anime.js as the default programmatic animation library. Do not install GSAP or Motion in the initial build.
- Use CSS transitions for hover, focus, press, and color state. Name exact properties; never use `transition: all`.
- Animate only `transform`, `opacity`, and the documented Canvas state. Gate hover motion with `(hover: hover) and (pointer: fine)` and provide reduced-motion behavior.
- Keep terminal controls useful and secondary; they must never gate navigation or content access.
- Curated project content is source-controlled and must never be overwritten by archive generation.
- Exclude Ureckon, unverified totals, generic proficiency bars, forks/clone exercises as flagships, fake logs, custom cursors, particles, and a preloader.
- Treat the IEEE DOI, Smile2Steps internship, award, Duke credentials, JUKES, GitHub, and LinkedIn records as the initial evidence baseline; verify every additional featured-project claim before publishing it.
- Preserve `.github/workflows/sync-repos.yml` unchanged.

---

## Planned file structure

```text
.
├── .github/workflows/
│   ├── deploy-portfolio.yml                 # Pages build/deploy for portfolio branch
│   └── refresh-portfolio-archive.yml        # Daily public repo archive refresh
├── public/
│   ├── favicon.svg
│   ├── og-default.png
│   └── projects/                             # Curated, rights-cleared project media
├── scripts/
│   └── fetch-portfolio-archive.ts            # GitHub metadata fetcher; writes generated data only
├── src/
│   ├── app/App.tsx
│   ├── app/sections.ts
│   ├── components/
│   │   ├── archive/ArchiveSection.tsx
│   │   ├── contact/ContactSection.tsx
│   │   ├── hero/EngineeringCanvas.tsx
│   │   ├── hero/HeroSection.tsx
│   │   ├── hero/PretextStatement.tsx
│   │   ├── layout/Footer.tsx
│   │   ├── layout/Header.tsx
│   │   ├── projects/ProjectCard.tsx
│   │   ├── projects/SelectedWorkSection.tsx
│   │   ├── research/ResearchExperienceSection.tsx
│   │   ├── terminal/CommandSurface.tsx
│   │   └── ui/ThemeToggle.tsx
│   ├── content/
│   │   ├── archive.generated.ts              # Generated; never manually edit
│   │   ├── identity.ts
│   │   ├── projects.ts
│   │   └── timeline.ts
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   └── useReducedMotion.ts
│   ├── lib/
│   │   ├── archive.ts
│   │   ├── contact.ts
│   │   ├── format.ts
│   │   └── motion.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tokens.css
│   │   └── themes.css
│   ├── types/content.ts
│   └── main.tsx
├── tests/
│   ├── archive.test.ts
│   ├── archive.test.tsx
│   ├── content.test.ts
│   ├── contact.test.tsx
│   ├── navigation.test.tsx
│   ├── project-card.test.tsx
│   └── terminal.test.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.setup.ts
```

---

### Task 1: Establish the static React application and test gate

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/app/App.tsx`, `src/styles/globals.css`, `vitest.setup.ts`
- Modify: `.gitignore`
- Test: `tests/navigation.test.tsx`

**Interfaces:**
- Produces: `App` as the single application root and Bun commands `dev`, `build`, `lint`, `typecheck`, and `test`.
- Consumed by: every subsequent task.

- [ ] **Step 1: Create the failing application-shell test**

```tsx
import { render, screen } from '@testing-library/react';
import App from '../src/app/App';

it('renders the portfolio landmark and primary navigation', () => {
  render(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bunx vitest run tests/navigation.test.tsx`

Expected: FAIL because `src/app/App.tsx` does not exist.

- [ ] **Step 3: Scaffold Vite, dependencies, and the minimal app**

Use `bun create vite . --template react-ts`, preserving repository files. Add `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `eslint`, `typescript`, and React type packages as development dependencies. Add `animejs`, `@chenglou/pretext`, `@emailjs/browser`, and `sonner` as runtime dependencies.

Implement the root contract:

```tsx
export default function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav aria-label="Primary">{/* Task 2 fills navigation */}</nav>
      <main id="main-content" tabIndex={-1}>{/* Task 2 fills sections */}</main>
    </div>
  );
}
```

Configure `vite.config.ts` with `base: '/'` for the profile repository Pages URL. Configure Vitest with `environment: 'jsdom'`, `setupFiles: ['./vitest.setup.ts']`, and `globals: true`. In `vitest.setup.ts`, import `@testing-library/jest-dom/vitest`.

- [ ] **Step 4: Verify local quality gates**

Run: `bun run typecheck && bun run lint && bunx vitest run tests/navigation.test.tsx && bun run build`

Expected: all commands exit 0 and Vite emits `dist/`.

- [ ] **Step 5: Commit the working foundation**

```bash
git add package.json bun.lock vite.config.ts tsconfig.json index.html src/main.tsx src/app/App.tsx src/styles/globals.css vitest.setup.ts tests/navigation.test.tsx .gitignore
git commit -m "feat: scaffold static portfolio application"
```

### Task 2: Add tokens, themes, page shell, and conventional navigation

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/themes.css`, `src/app/sections.ts`, `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/ui/ThemeToggle.tsx`, `src/hooks/useMediaQuery.ts`, `src/hooks/useReducedMotion.ts`
- Modify: `src/app/App.tsx`, `src/styles/globals.css`
- Test: `tests/navigation.test.tsx`

**Interfaces:**
- Consumes: `App` from Task 1.
- Produces: `SECTIONS`, `Header`, `Footer`, `ThemeToggle`, `useMediaQuery(query): boolean`, and `useReducedMotion(): boolean`.

- [ ] **Step 1: Extend the failing navigation test**

```tsx
expect(screen.getByRole('link', { name: /work/i })).toHaveAttribute('href', '#work');
expect(screen.getByRole('link', { name: /research/i })).toHaveAttribute('href', '#research');
expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused test**

Run: `bunx vitest run tests/navigation.test.tsx`

Expected: FAIL because the navigation links and theme button are absent.

- [ ] **Step 3: Implement the token and shell contracts**

Define named custom properties in `tokens.css` for type scale, spacing, layout width, radii, focus ring, elevation, `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. In `themes.css`, implement `data-theme="light"`, `data-theme="dark"`, `data-contrast="more"`, and system-preference defaults.

Implement exact section IDs:

```ts
export const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'research', label: 'Research' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'archive', label: 'Archive' },
  { id: 'contact', label: 'Contact' },
] as const;
```

`ThemeToggle` persists `theme` and `contrast` to `localStorage`, has accessible labels, and changes the root element attributes. The header uses real anchors, works without JavaScript navigation tricks, and contains the terminal trigger introduced in Task 7. Use `:focus-visible`, target sizes of at least 44px, and no custom cursor.

- [ ] **Step 4: Verify the app and keyboard-visible controls**

Run: `bun run typecheck && bun run lint && bunx vitest run tests/navigation.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the accessible shell**

```bash
git add src/styles src/app src/components/layout src/components/ui src/hooks tests/navigation.test.tsx
git commit -m "feat: add portfolio shell and accessible themes"
```

### Task 3: Encode verified content and preserve provenance

**Files:**
- Create: `src/types/content.ts`, `src/content/identity.ts`, `src/content/projects.ts`, `src/content/timeline.ts`, `src/content/archive.generated.ts`, `src/lib/format.ts`
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces: `Identity`, `CuratedProject`, `TimelineEntry`, `ArchiveProject`, `identity`, `curatedProjects`, `timeline`, and `archiveProjects`.
- Consumed by: Tasks 4–10.

- [ ] **Step 1: Write content-invariant tests**

```ts
import { curatedProjects } from '../src/content/projects';
import { timeline } from '../src/content/timeline';

it('keeps exactly six featured records with source links', () => {
  expect(curatedProjects.filter((project) => project.featured)).toHaveLength(6);
  expect(curatedProjects.every((project) => project.evidenceUrl)).toBe(true);
});

it('does not publish the excluded Ureckon record', () => {
  expect(timeline.some((item) => /ureckon/i.test(item.title))).toBe(false);
});
```

- [ ] **Step 2: Run the content test to verify it fails**

Run: `bunx vitest run tests/content.test.ts`

Expected: FAIL because the content modules do not exist.

- [ ] **Step 3: Implement strict content types and initial records**

Use these exact contracts:

```ts
export type Ownership = 'original' | 'contribution' | 'research' | 'unknown';

export interface CuratedProject {
  id: string; title: string; category: 'android' | 'ai' | 'web' | 'research';
  summary: string; role: string; stack: string[]; evidenceUrl: string;
  repositoryUrl?: string; liveUrl?: string; image?: string; ownership: Ownership; featured: boolean;
}
```

Include the approved JUKES, IEEE BE-PS research, INTENTFENCE, BlindUnfold, Offline File Transfer, and sixth verified original project records. Mark unverified role/outcome fields as excluded from rendering until repository verification completes; never fabricate them. Include timeline items for the IEEE paper/DOI, Smile2Steps dates and scope, Vice Chancellor’s Award, and Duke credentials. Place `archiveProjects: ArchiveProject[] = []` in the generated file as a valid first-build baseline.

- [ ] **Step 4: Run content gates**

Run: `bun run typecheck && bunx vitest run tests/content.test.ts`

Expected: PASS; all featured records have evidence URLs and no excluded company appears.

- [ ] **Step 5: Commit the evidence model**

```bash
git add src/types/content.ts src/content src/lib/format.ts tests/content.test.ts
git commit -m "feat: add verified portfolio content model"
```

### Task 4: Build selected work and research/experience sections

**Files:**
- Create: `src/components/projects/ProjectCard.tsx`, `src/components/projects/SelectedWorkSection.tsx`, `src/components/research/ResearchExperienceSection.tsx`
- Modify: `src/app/App.tsx`
- Test: `tests/project-card.test.tsx`

**Interfaces:**
- Consumes: `CuratedProject`, `curatedProjects`, and `timeline` from Task 3.
- Produces: `ProjectCard({ project }: { project: CuratedProject })` and semantic `work`/`research` sections.

- [ ] **Step 1: Write a card disclosure test**

```tsx
render(<ProjectCard project={curatedProjects[0]} />);
expect(screen.getByRole('heading', { name: /jukes/i })).toBeVisible();
await user.click(screen.getByRole('button', { name: /details for jukes/i }));
expect(screen.getByText(/jetpack compose/i)).toBeVisible();
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `bunx vitest run tests/project-card.test.tsx`

Expected: FAIL because `ProjectCard` is absent.

- [ ] **Step 3: Implement evidence-led project and timeline UI**

Each card renders title, category, concise summary, ownership, source link, explicit repository/live links only when present, and an accessible details button. The hidden details contain role, stack, and outcome only when the record provides verified copy. Use a CSS `@media (hover: hover) and (pointer: fine)` visual reveal; disclosure state remains keyboard and touch accessible.

Implement research/experience as a semantic timeline. The IEEE entry links the DOI, Smile2Steps accurately states its date range and described ECD contribution, and award/credentials visibly carry an “Evidence: LinkedIn” label. Do not show numeric proficiency bars.

- [ ] **Step 4: Run section tests and build**

Run: `bun run typecheck && bunx vitest run tests/project-card.test.tsx && bun run build`

Expected: PASS and the production build includes all selected-work and research landmarks.

- [ ] **Step 5: Commit curated evidence sections**

```bash
git add src/components/projects src/components/research src/app/App.tsx tests/project-card.test.tsx
git commit -m "feat: add curated work and research sections"
```

### Task 5: Create the generated GitHub archive pipeline

**Files:**
- Create: `src/lib/archive.ts`, `scripts/fetch-portfolio-archive.ts`, `.github/workflows/refresh-portfolio-archive.yml`
- Modify: `src/content/archive.generated.ts`, `package.json`
- Test: `tests/archive.test.ts`

**Interfaces:**
- Produces: `toArchiveProject(repo: GitHubRepository): ArchiveProject`, `isEligibleArchiveProject(repo: GitHubRepository): boolean`, and `bun run refresh:archive`.
- Consumed by: Task 6.

- [ ] **Step 1: Write archive ownership/exclusion tests**

```ts
expect(isEligibleArchiveProject({ name: 'rajeet-04', fork: false, archived: false })).toBe(false);
expect(toArchiveProject({ name: 'example', fork: true, archived: false }).ownership).toBe('fork');
expect(toArchiveProject({ name: 'old', fork: false, archived: true }).archived).toBe(true);
```

- [ ] **Step 2: Run the archive test to verify it fails**

Run: `bunx vitest run tests/archive.test.ts`

Expected: FAIL because archive transformation functions do not exist.

- [ ] **Step 3: Implement deterministic generation and scheduled refresh**

The script calls `https://api.github.com/users/rajeet-04/repos?per_page=100&sort=updated`, accepts `GITHUB_TOKEN` when present, writes sorted deterministic TypeScript data to `src/content/archive.generated.ts`, excludes `rajeet-04` and `.github`, and preserves fork/archived/ownership metadata. It must exit non-zero for a non-OK API response or malformed payload and must not touch `projects.ts`.

The workflow runs daily and on `workflow_dispatch`, has `contents: write`, checks out `portfolio`, installs Bun, runs `bun run refresh:archive`, and commits only when `git diff --quiet -- src/content/archive.generated.ts` is false. Do not modify `sync-repos.yml`.

- [ ] **Step 4: Run unit tests and a no-token failure check**

Run: `bunx vitest run tests/archive.test.ts && bun run refresh:archive`

Expected: unit tests PASS. The refresh either writes valid generated data or exits with an explicit GitHub API/rate-limit error; it must never change `src/content/projects.ts`.

- [ ] **Step 5: Commit the archive generator**

```bash
git add src/lib/archive.ts scripts/fetch-portfolio-archive.ts src/content/archive.generated.ts .github/workflows/refresh-portfolio-archive.yml package.json tests/archive.test.ts
git commit -m "feat: add public GitHub archive refresh"
```

### Task 6: Render archive filters without mixing them into selected work

**Files:**
- Create: `src/components/archive/ArchiveSection.tsx`
- Modify: `src/app/App.tsx`
- Test: `tests/archive.test.ts`

**Interfaces:**
- Consumes: `archiveProjects`, `ArchiveProject`, and archive helpers from Tasks 3 and 5.
- Produces: `ArchiveSection` with visible filter state and ownership labels.

- [ ] **Step 1: Add a filter behavior test**

```tsx
render(<ArchiveSection />);
await user.selectOptions(screen.getByLabelText(/ownership/i), 'original');
expect(screen.queryByText(/fork/i)).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `bunx vitest run tests/archive.test.tsx`

Expected: FAIL because `ArchiveSection` is absent.

- [ ] **Step 3: Implement archive presentation**

Render generated repositories as an archive only, with language/category and updated-date formatting, `original`/`fork`/`archived` labels, native `<select>` filters, and direct repository links. The empty generated baseline must show an honest unavailable state and a GitHub profile link rather than fabricated cards.

- [ ] **Step 4: Verify archive UX**

Run: `bun run typecheck && bunx vitest run tests/archive.test.ts tests/archive.test.tsx`

Expected: PASS; selected work is not rendered inside the archive section.

- [ ] **Step 5: Commit archive UI**

```bash
git add src/components/archive src/app/App.tsx tests/archive.test.tsx
git commit -m "feat: add filterable GitHub archive"
```

### Task 7: Build the hero and explanatory Canvas 2D map

**Files:**
- Create: `src/components/hero/HeroSection.tsx`, `src/components/hero/EngineeringCanvas.tsx`
- Modify: `src/app/App.tsx`
- Test: `tests/navigation.test.tsx`

**Interfaces:**
- Produces: `EngineeringCanvas({ reducedMotion }: { reducedMotion: boolean })` and `HeroSection`.
- Consumed by: Task 8 motion integration.

- [ ] **Step 1: Add hero fallback tests**

```tsx
render(<HeroSection />);
expect(screen.getByRole('heading', { name: /ra jeet ash/i })).toBeVisible();
expect(screen.getByRole('list', { name: /engineering focus/i })).toBeVisible();
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `bunx vitest run tests/navigation.test.tsx`

Expected: FAIL because the hero and focus list are absent.

- [ ] **Step 3: Implement the accessible canvas contract**

The canvas visualizes five nodes: Android, AI/ML, Full-Stack, Research, and Robotics Exploration. It renders only after an `IntersectionObserver` marks it visible; it pauses when hidden; it measures via `ResizeObserver`; it scales for device pixel ratio; and it reduces frames/work when `reducedMotion` is true. Represent the same five nodes in an adjacent semantic `<ul aria-label="Engineering focus">` with anchor links. Pointer movement may update an active label only under fine-pointer conditions; clicks and keyboard focus on list buttons provide the same state.

- [ ] **Step 4: Verify the fallback and production build**

Run: `bun run typecheck && bunx vitest run tests/navigation.test.tsx && bun run build`

Expected: PASS. Canvas absence in jsdom does not break the semantic hero.

- [ ] **Step 5: Commit the hero system**

```bash
git add src/components/hero/HeroSection.tsx src/components/hero/EngineeringCanvas.tsx src/app/App.tsx tests/navigation.test.tsx
git commit -m "feat: add accessible engineering canvas hero"
```

### Task 8: Add the one Pretext interaction and useful command surface

**Files:**
- Create: `src/components/hero/PretextStatement.tsx`, `src/components/terminal/CommandSurface.tsx`, `src/lib/motion.ts`
- Modify: `src/components/layout/Header.tsx`, `src/components/hero/HeroSection.tsx`
- Test: `tests/terminal.test.tsx`

**Interfaces:**
- Produces: `COMMANDS`, `executeCommand(command: string): CommandResult`, `CommandSurface`, and `PretextStatement`.
- Consumed by: Task 9 for Anime orchestration.

- [ ] **Step 1: Write command routing tests**

```tsx
render(<CommandSurface open onOpenChange={() => {}} />);
await user.type(screen.getByRole('textbox', { name: /command/i }), 'work{enter}');
expect(window.location.hash).toBe('#work');
expect(screen.getByText(/unknown command/i)).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the terminal test to verify it fails**

Run: `bunx vitest run tests/terminal.test.tsx`

Expected: FAIL because command components do not exist.

- [ ] **Step 3: Implement semantic text and command behavior**

`PretextStatement` renders a normal heading/paragraph first. Only after hydration, on a fine pointer and without reduced motion, layer a pointer-driven visual arrangement using `@chenglou/pretext`; never replace or reorder the accessible DOM text.

The command surface is a `<dialog>` or accessible modal with a text input and a visible command list. Support exactly `work`, `research`, `stack`, `contact`, `theme`, and `help`; commands map to hash navigation or documented UI state. Escape closes it, focus returns to the trigger, invalid commands produce an inline status message, and command execution does not animate.

- [ ] **Step 4: Verify keyboard behavior**

Run: `bun run typecheck && bunx vitest run tests/terminal.test.tsx`

Expected: PASS for command routing, invalid feedback, Escape close, and focus restoration.

- [ ] **Step 5: Commit interaction foundations**

```bash
git add src/components/hero/PretextStatement.tsx src/components/terminal src/components/layout/Header.tsx src/lib/motion.ts tests/terminal.test.tsx
git commit -m "feat: add accessible command and text interactions"
```

### Task 9: Implement Anime.js motion and responsive polish

**Files:**
- Create: `src/styles/motion.css`
- Modify: `src/lib/motion.ts`, `src/components/hero/HeroSection.tsx`, `src/components/projects/ProjectCard.tsx`, `src/styles/globals.css`
- Test: `tests/project-card.test.tsx`

**Interfaces:**
- Consumes: `useReducedMotion`, `EngineeringCanvas`, `PretextStatement`, and `ProjectCard`.
- Produces: `createEntranceTimeline(elements: HTMLElement[], reduce: boolean): AnimationControls` and documented CSS motion tokens.

- [ ] **Step 1: Extend a motion-safe card test**

```tsx
render(<ProjectCard project={curatedProjects[0]} />);
const card = screen.getByRole('article', { name: /jukes/i });
expect(card.className).not.toMatch(/transition-all/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bunx vitest run tests/project-card.test.tsx`

Expected: FAIL until the project card exposes the documented article contract.

- [ ] **Step 3: Implement deliberate motion only**

Use Anime.js to sequence the first hero entry, terminal surface entrance/exit, selected-work section reveal, and project detail reveal. Use `transform` and `opacity`, `--ease-out`, and 30–80ms staggering; no normal UI action may exceed 300ms. CSS handles card hover/focus/press changes, gated under fine-pointer media queries. The reduced-motion branch preserves opacity/state feedback but removes translation, glyph repulsion, canvas motion, and stagger. Avoid global scroll-reveal observers that animate every section.

- [ ] **Step 4: Run tests and inspect responsive states**

Run: `bun run typecheck && bunx vitest run tests/project-card.test.tsx && bun run build`

Manual check: inspect 320px, 768px, 1280px, light, dark, high contrast, touch emulation, and reduced motion. Confirm no horizontal overflow and that hover-only content remains reachable.

- [ ] **Step 5: Commit the motion system**

```bash
git add src/lib/motion.ts src/styles/motion.css src/styles/globals.css src/components/hero src/components/projects tests/project-card.test.tsx
git commit -m "feat: add anime-driven portfolio motion"
```

### Task 10: Implement contact and feedback safely

**Files:**
- Create: `src/lib/contact.ts`, `src/components/contact/ContactSection.tsx`
- Modify: `src/app/App.tsx`, `src/main.tsx`
- Test: `tests/contact.test.tsx`

**Interfaces:**
- Produces: `validateContact(input: ContactInput): ContactErrors`, `submitContact(input: ContactInput): Promise<'sent' | 'fallback'>`, and `ContactSection`.

- [ ] **Step 1: Write validation and fallback tests**

```tsx
render(<ContactSection />);
await user.click(screen.getByRole('button', { name: /send message/i }));
expect(screen.getByText(/name is required/i)).toBeVisible();
expect(screen.getByText(/email is required/i)).toBeVisible();
```

```ts
expect(validateContact({ name: '', email: 'bad', subject: '', message: '', website: '' })).toEqual({
  name: 'Name is required', email: 'Enter a valid email address', subject: 'Subject is required', message: 'Message is required',
});
```

- [ ] **Step 2: Run the contact test to verify it fails**

Run: `bunx vitest run tests/contact.test.tsx`

Expected: FAIL because contact modules are absent.

- [ ] **Step 3: Implement protected progressive contact behavior**

Render direct email, GitHub, and LinkedIn links before the form. Implement name, email, subject, message, and visually hidden `website` honeypot fields. Reject honeypot input locally, apply a 30-second submit cooldown, expose errors with `aria-describedby` and an error summary, and use one `Toaster` from Sonner at the application root. If any `VITE_EMAILJS_*` variable is missing or EmailJS rejects, build a URL-encoded `mailto:rajeetash@hotmail.com` fallback and inform the visitor before navigation. Never commit EmailJS values.

- [ ] **Step 4: Verify the form contract**

Run: `bun run typecheck && bunx vitest run tests/contact.test.tsx && bun run build`

Expected: PASS for required validation, email format, honeypot rejection, cooldown, success feedback, and mailto fallback.

- [ ] **Step 5: Commit contact flow**

```bash
git add src/lib/contact.ts src/components/contact src/app/App.tsx src/main.tsx tests/contact.test.tsx
git commit -m "feat: add accessible contact delivery"
```

### Task 11: Add metadata, Pages deployment, and release verification

**Files:**
- Create: `.github/workflows/deploy-portfolio.yml`, `public/robots.txt`, `public/sitemap.xml`, `public/favicon.svg`, `public/og-default.png`
- Modify: `index.html`, `README.md`
- Test: browser smoke script or documented manual smoke checklist in `README.md`

**Interfaces:**
- Produces: GitHub Pages artifact deployment from `portfolio` and a documented release gate.

- [ ] **Step 1: Add build-output assertions**

```bash
bun run build
test -f dist/index.html
test -f dist/robots.txt
test -f dist/sitemap.xml
```

Expected: FAIL until public metadata assets and build configuration are added.

- [ ] **Step 2: Implement production metadata and Pages workflow**

Set a concise title, description, canonical `https://rajeet-04.github.io/`, Open Graph/Twitter image metadata, favicon, robots policy, and sitemap. The Pages workflow triggers only on `push` to `portfolio` when application or deployment files change, configures Pages, installs Bun, runs `bun install --frozen-lockfile`, `bun run typecheck`, `bun run lint`, `bun run test`, and `bun run build`, uploads `dist`, and deploys. Grant only the documented Pages and ID-token permissions. Do not alter the profile README sync workflow.

Update `README.md` with local commands, required `VITE_EMAILJS_*` variables, archive refresh workflow, evidence/content update rules, and the exact deployment URL.

- [ ] **Step 3: Run final local release gates**

Run: `bun run typecheck && bun run lint && bun run test && bun run build && test -f dist/index.html && test -f dist/robots.txt && test -f dist/sitemap.xml`

Expected: every command exits 0.

- [ ] **Step 4: Perform browser smoke checks before declaring release-ready**

Check the built site locally at desktop and 320px wide. Verify deep links, normal navigation, keyboard focus order, theme persistence, command surface, touch-accessible project details, reduced-motion behavior, canvas fallback, archive labels, direct social links, invalid contact submission, and EmailJS-missing mailto fallback.

- [ ] **Step 5: Commit release infrastructure**

```bash
git add .github/workflows/deploy-portfolio.yml public index.html README.md
git commit -m "ci: deploy portfolio to GitHub Pages"
```

## Plan self-review

### Spec coverage

| Specification requirement | Implementation tasks |
| --- | --- |
| Vite/Bun/static Pages foundation | 1, 11 |
| Tokens, themes, accessibility baseline | 2, 9, 11 |
| Verified content and provenance | 3, 4 |
| Curated work distinct from archive | 3, 4, 5, 6 |
| Daily archive refresh without profile-sync changes | 5 |
| Engineering canvas | 7 |
| Terminal and Pretext interaction | 8 |
| Anime.js-first motion and performance constraints | 9 |
| Contact protection and fallback | 10 |
| SEO, Pages deployment, and release checks | 11 |

### Placeholder and consistency check

The plan contains no deferred implementation markers, and every named runtime interface is introduced in the task before it is consumed. The sixth featured project is intentionally constrained to repository-verified content; execution must choose the record before publishing its card, rather than inventing its role or outcomes.
