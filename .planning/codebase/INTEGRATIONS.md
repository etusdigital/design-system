# External Integrations

**Analysis Date:** 2026-03-13

## APIs & External Services

**Not applicable.**

This is a component library (design system) with no external API integrations. All components are self-contained UI elements with no backend or third-party service dependencies.

## Data Storage

**Databases:**
- None - This is a client-side UI library with no data persistence layer

**File Storage:**
- None required - Codebase manages local file operations in development only

**Caching:**
- None - No caching layer needed for a component library

## Authentication & Identity

**Auth Provider:**
- None - This library does not handle authentication. Consumers integrate auth in their own applications.

## Monitoring & Observability

**Error Tracking:**
- Not applicable - Library has no error tracking integration

**Logs:**
- Console-based only - No structured logging or external logging service
- Used internally for Storybook and test output only

## CI/CD & Deployment

**Hosting:**
- GitHub Pages - Storybook documentation hosted at https://etusdigital.github.io/design-system/
- npm Registry - Package distributed via npm as @etus/design-system

**CI Pipeline:**
- GitHub Actions - Build and deployment automation configured via `.github/` directory

**Build & Publish:**
- npm publish workflow for automated package releases
- Storybook build deployed to GitHub Pages

## Environment Configuration

**Required env vars:**
- None - Library requires no environment variables

**Secrets location:**
- Not applicable - No secrets required for this library package

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## CDN/External Resources

**Material Design Icons:**
- CDN-loaded via `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:...`
- Loaded dynamically in `src/index.ts` at app initialization
- Link element created with `rel="stylesheet"` and appended to document.head

**Icon Library:**
- @mdi/font - Material Design Icons font files
- @mdi/js - SVG icon collection

## Event System

**Internal Event Bus:**
- `src/utils/event.ts` - Custom publish/subscribe event emitter for internal component communication
- Used for Toast and Confirm dialog interactions
- No external event broker or message queue

## Publishing & Distribution

**Package Registry:**
- npm: https://www.npmjs.com/package/@etus/design-system
- Repository: https://github.com/etusdigital/design-system

**Supported Installation Methods:**
```bash
npm install @etus/design-system
yarn add @etus/design-system
pnpm install @etus/design-system
```

**Export Types:**
- Dual-format distribution (ESM and CJS/UMD)
- TypeScript declaration files included
- Tailwind configuration exported for consumer customization

## Third-Party Integrations

**Chromatic:**
- Service: Visual regression testing and review platform
- Package: @chromatic-com/storybook 4.1.1
- Purpose: Automated visual testing of component changes in CI/CD

**Storybook Addons:**
- A11y Addon - Accessibility testing within stories
- Vitest Addon - Run Vitest tests directly in Storybook
- Docs Addon - MDX documentation support

---

*Integration audit: 2026-03-13*
