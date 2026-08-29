# Portfolio development

The redesigned portfolio is a static Vite + React + TypeScript site. Use Bun:

```sh
bun install
bun run dev
bun run typecheck
bun run lint
bun run test
bun run build
```

The public site is deployed from the `portfolio` branch to `https://rajeet-04.github.io/`. The profile README synchronization workflow is separate and should not be edited for portfolio work.

Set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` only in the local environment or GitHub Actions configuration. Without them, the form offers a direct mailto fallback.

`bun run refresh:archive` updates only `src/content/archive.generated.ts` from public GitHub metadata. Curated work lives in `src/content/projects.ts` and must be edited manually with an evidence URL and ownership label.
