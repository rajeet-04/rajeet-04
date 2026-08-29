# Rajeet Ash Portfolio Design Specification

**Status:** Approved for planning

**Repository:** `rajeet-04/rajeet-04`

**Implementation branch:** `portfolio`

## 1. Purpose

Build a fast, distinctive, accessible portfolio that helps recruiters, clients, and collaborators understand Rajeet Ash as a software engineer who builds native Android applications, AI-enabled products, and full-stack systems. Robotics, ROS2, and Rust are supporting areas of exploration rather than the sole professional identity.

The portfolio replaces the legacy `rash` visual language. Facts from that repository may be reused only when corroborated or explicitly marked as source claims; its terminal-first presentation, glass treatment, cursor effects, backgrounds, and layout are not design requirements.

## 2. Product goals

1. Make the engineering focus clear in the first viewport without relying on a generic skills cloud or a resume dump.
2. Demonstrate range through a small set of verified, specific case studies rather than an undifferentiated repository list.
3. Give visitors a memorable but useful interactive experience: an engineering relationship canvas, a restrained command surface, meaningful project hover reveals, and one text-layout interaction.
4. Work well with a mouse, keyboard, touch screen, reduced-motion preferences, slow devices, and both light and dark environments.
5. Deploy as a static GitHub Pages site from this repository without disrupting the existing profile README synchronization workflow.

## 3. Non-goals

- Do not recreate the legacy `rash` design.
- Do not make the site look like an AI-generated demo: no fake terminal logs, ambient particle fields, auto-playing loader, custom cursor, inflated counters, or an every-section fade-up pattern.
- Do not put unverified claims, generic proficiency percentages, or private-project details into public copy.
- Do not add a CMS, backend, authentication, database, WebGL/3D dependency, or a second application repository.
- Do not install Anime.js, GSAP, and Motion together by default.

## 4. Audience and narrative

The primary audiences are recruiters and potential collaborators or clients. Both should be able to answer three questions quickly:

1. What does Rajeet build?
2. What evidence shows that capability?
3. How can they start a conversation?

The content narrative moves from systems built, to evidence, to collaboration:

1. **Intent:** a software engineer building products across Android, AI, and the web.
2. **Systems:** selected work that shows concrete technical decisions.
3. **Research and growth:** IEEE research, internship work, recognition, credentials, and current exploration.
4. **Conversation:** direct email and a low-friction contact path.

## 5. Approved positioning and content

### 5.1 Lead statement

Use this as the initial hero direction, with room for editorial refinement during implementation:

> Rajeet Ash — software engineer building native Android, AI-enabled products, and full-stack systems.

Supporting language may describe the arc from digital products toward systems closer to the physical world, but must not overstate current robotics experience.

### 5.2 Verified or attributable evidence

| Item | Planned presentation | Evidence status |
| --- | --- | --- |
| Rajeet Ash, Kolkata, West Bengal, India | Identity/contact metadata | Public GitHub and LinkedIn profile |
| GitHub profile | External link and live archive source | Public GitHub profile: `github.com/rajeet-04` |
| LinkedIn profile | Canonical professional profile link | Public profile: `linkedin.com/in/rajeet` |
| JUKES | Flagship native Android product case study | Public GitHub repository and LinkedIn launch post |
| IEEE AICARE 2025 publication | Research feature with DOI link | DOI `10.1109/AICARE66005.2025.11402801`; publication record |
| Smile2Steps React Native internship | Experience item | LinkedIn post: 17 May–17 June 2025; ECD application work |
| Vice Chancellor's Award for Best Scientific Mind | Recognition item | LinkedIn post: UEM Kolkata, 2024–25 |
| Duke local-LLM credentials | Credentials item, not a featured project | LinkedIn public credentials: December 2024 |
| Rust and ROS2 | “Exploring now” capability, not an experience claim | Public GitHub profile README |

### 5.3 Curated work strategy

The selected-work grid begins with six explicitly curated entries. Its initial shortlist is:

1. **JUKES** — native Kotlin/Jetpack Compose music application; show architecture, performance discipline, and release maturity.
2. **INTENTFENCE** — AI/security-focused product; verify public scope and copy from its repository before inclusion.
3. **BlindUnfold** — accessible real-time vision concept; verify technical implementation and role before inclusion.
4. **Offline File Transfer** — peer-to-peer/offline system; verify technical scope and role before inclusion.
5. **BE-PS research** — the IEEE publication as a research case study rather than a repository card.
6. **One current, original engineering project** chosen from the GitHub profile after repository inspection; it must have a clear public role and demonstrable outcome.

Entries that are forks, clone exercises, unclear collaborations, or lack sufficient evidence remain in the archive only. A project card never implies sole ownership unless that is established in its source material.

### 5.4 Excluded content

- Ureckon is excluded until a role, dates, and outcomes are independently confirmed.
- The legacy site’s age, years-of-coding, project totals, technology totals, awards totals, freelance totals, and open-source totals are excluded unless a live source supports them.
- Gistify, forks, and clone repositories are not flagships without a verified contribution statement.

## 6. Information architecture

The site is a single-page, scrollable portfolio with deep-linkable sections:

1. **Home / Hero:** positioning, primary actions, interactive engineering relationship canvas, concise proof signals.
2. **Selected Work:** six curated, evidence-rich projects with screenshots where available.
3. **Research and Experience:** IEEE publication, Smile2Steps internship, award, credentials, and current learning.
4. **Capabilities:** systems-oriented capability map, not proficiency bars.
5. **GitHub Archive:** dynamically refreshed public-repository inventory with filters and clear ownership labels.
6. **Contact:** direct email, LinkedIn, GitHub, and a protected EmailJS contact form with a mailto fallback.
7. **Footer:** concise identity, source links, and theme/accessibility controls.

The navigation exposes these sections conventionally. The terminal is a secondary command surface for visitors who choose it; it is never the only way to navigate.

## 7. Interaction design

### 7.1 Engineering relationship canvas

The hero contains a Canvas 2D relationship map for Android, AI/ML, full-stack systems, research, and robotics exploration. It is an explanatory device, not a decorative particle field.

- Pointer movement on fine-pointer devices may reveal labels and relationships.
- Keyboard focus and touch tap must expose the same labels and destinations.
- It renders a compact static fallback when Canvas is unavailable, when reduced motion is requested, or on constrained devices.
- It uses direct pointer input and `requestAnimationFrame`; the amount of work scales down for smaller screens.

### 7.2 Command surface

A terminal-inspired panel offers useful commands such as `work`, `research`, `stack`, `contact`, `theme`, and `help`.

- Commands map to existing navigation or visible content; there are no simulated logs.
- It opens from a visible control and is fully keyboard operable.
- High-frequency command execution changes state immediately, without ornamental animation.

### 7.3 Project reveals

Project cards reveal a real screenshot or technical visual, role, stack, and outcome on pointer hover. On touch, the same content is revealed on first tap and the destination opens only on a subsequent explicit action.

### 7.4 Pretext text interaction

Use `@chenglou/pretext` once for an editorial statement that can reflow/repel glyphs around a pointer on fine-pointer devices. It must retain a normal semantic DOM reading order and becomes static under reduced motion or touch conditions.

## 8. Visual system

The visual direction is disciplined maximalism: editorial typography, deliberate asymmetry, strong imagery, and a few technical details with a clear purpose. It should feel authored and calm, not overloaded.

- Support light, dark, and high-contrast variants of each.
- Use a small set of design tokens for type, spacing, surfaces, color, elevation, and motion.
- Prioritize real project screenshots, diagrams, and artifacts over generated visual decoration.
- Maintain visible focus treatment, readable contrast, and adequate target sizes.
- Do not use a custom cursor, glassmorphism as a default surface treatment, or decorative fireflies/particles.

## 9. Motion system

Anime.js is the primary programmatic motion system.

| Situation | Tool | Rule |
| --- | --- | --- |
| Hover, focus, press, and color state | CSS transitions | Fine-pointer gated; 100–160ms press feedback; do not use `transition: all` |
| Deliberate hero, section, text, terminal, and project sequences | Anime.js timelines | Transform and opacity only; 30–80ms stagger where needed |
| Canvas relationship state | Canvas 2D + requestAnimationFrame; Anime.js may interpolate node state | Pause or simplify for reduced motion/offscreen canvas |
| Pinned or scrubbed case-study story | GSAP ScrollTrigger only if Anime.js cannot achieve the interaction cleanly | Dynamically load and scope to one feature |
| Drag, gesture physics, or layout/exits | Motion only if such a component is introduced | Do not add during the initial build |

Motion purposes must be feedback, spatial consistency, state indication, prevention of a jarring change, explanation, or rare delight. All animation ships with `prefers-reduced-motion` behavior and fine-pointer hover gating. No routine UI motion exceeds 300ms without a specific reason.

## 10. Technical architecture

### 10.1 Site runtime

- **Framework:** React with TypeScript and Vite.
- **Package manager:** Bun.
- **Rendering:** static client-side site; no server runtime.
- **Styling:** tokenized CSS or Tailwind only after the implementation plan confirms the lower-complexity option.
- **Animation:** Anime.js, CSS, Canvas 2D, and optional narrowly scoped GSAP/Motion as specified above.
- **Text layout:** `@chenglou/pretext` for the single semantic text interaction.
- **Notifications:** Sonner for one contact-form status surface.

### 10.2 Content model

Keep editorial content in versioned TypeScript/JSON data files, split by responsibility:

- identity and links
- verified timeline records
- curated project records
- capability nodes
- theme/token settings

Each curated project record carries `id`, `title`, `category`, `summary`, `role`, `stack`, `evidenceUrl`, `repositoryUrl`, optional `liveUrl`, optional `image`, `ownership`, and `featured` fields. Archive entries use a separate generated type and can never overwrite curated records.

### 10.3 GitHub archive refresh

Use a daily GitHub Action to fetch public repository metadata, label forks/archived items, and write a generated archive data file. The action must:

- never modify the curated project source;
- exclude the profile repository and generated workflow files;
- preserve ownership labels;
- fail clearly on API errors or rate limits;
- commit only when generated data changes.

The existing `.github/workflows/sync-repos.yml` profile README automation stays independent and unchanged.

### 10.4 Contact

The initial public contact paths are direct email, GitHub, LinkedIn, and an EmailJS form. The form has client-side required-field validation, an accessible error summary, a honeypot, a short cooldown, and direct `mailto:` fallback when EmailJS configuration is absent or delivery fails. No secret is committed; EmailJS public configuration remains in GitHub Pages build secrets/variables.

## 11. Accessibility and performance acceptance criteria

- Keyboard users can reach and operate navigation, command surface, canvas fallback content, project cards, filters, theme controls, and contact form.
- Every interaction available through hover has a touch and focus equivalent.
- `prefers-reduced-motion: reduce` removes position-changing/decorative motion while keeping clear state changes.
- The site is usable at 320px wide, common mobile widths, tablet, and large desktop without horizontal scrolling.
- Images are responsive, carry useful alt text, and defer non-critical loading.
- Canvas pauses while offscreen and scales density/work to device capability.
- Build, lint, type-check, unit tests, and browser smoke checks are required before release.

## 12. Delivery phases

1. **Foundation:** Vite/React/Bun static app, Pages workflow, base tokens, themes, accessibility baseline, and source structure.
2. **Content and evidence:** typed content, curated work cards, verified timeline, archive generator, and content ownership rules.
3. **Signature experience:** hero canvas, Pretext statement, terminal command surface, project interaction states, and imagery.
4. **Motion and polish:** Anime.js system, CSS feedback, optional single-purpose library review, responsive performance work, contact flow, and visual QA.
5. **Release and maintenance:** automated archive refresh, metadata, sitemap/social assets, test gates, deployment verification, and content update guidance.

Each phase must result in a testable, reviewable state. The implementation plan will break every phase into independently verifiable tasks and commits.

## 13. Open verification work

Before an item is published as a featured claim, implementation must verify its repository source, screenshot rights, live URL, exact role, and outcome. This includes the selected sixth flagship, INTENTFENCE, BlindUnfold, and Offline File Transfer. The IEEE citation and Smile2Steps statement must retain their evidence links.
