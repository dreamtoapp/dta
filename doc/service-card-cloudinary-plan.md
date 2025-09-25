## Goal
Add an image (from Cloudinary) to each Services card on the homepage, with zero layout regressions and no changes outside scope.

## Scope (Minimal Surface)
- Only touch homepage services files:
  - `app/[locale]/(homepage)/actions/serviceData.ts`
  - `app/[locale]/(homepage)/component/ServiceCard.tsx` (or the card component used by `Services.tsx`)
  - `app/[locale]/(homepage)/component/Services.tsx` (if minor prop threading is required)
- Use existing `lib/cloudinary.ts` helpers; no new deps; preserve Tailwind classes and RSC boundaries.

## Preconditions
- Ensure Cloudinary env vars exist in `.env.local`:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
- `next.config.ts` already allows `res.cloudinary.com` in `images.remotePatterns` (confirmed).

## Data Model Changes (Backward-Compatible)
1) In `serviceData.ts`, extend `CardData` with optional image fields:
   - `imagePublicId?: string` (Cloudinary public_id)
   - `imageAltKey?: string` (i18n key for alt text)
   - Do not remove/rename existing fields; keep icons and tags intact.

2) Populate `imagePublicId` per card (incrementally; can start with 1–2 cards). Leave others undefined to fallback gracefully.

## Fetch Strategy (Server-Safe)
Option A (preferred, simplest):
- Do not prefetch. Use `cloudinary.url(public_id, { fetch_format: "auto", quality: "auto", width: 640, crop: "fill" })` inline in the Server Component for deterministic URLs.

Option B (if centralization desired):
- Add a tiny server helper in `app/[locale]/(homepage)/actions/` that wraps `getImagesFromFolder` or builds a url from `public_id`. Return a typed `{ src: string, alt: string }` per card.

## UI Integration (Non-breaking)
1) In `ServiceCard.tsx` (server component by default):
   - Accept optional `imageSrc?: string` or `imagePublicId?: string` via `card` prop.
   - Render an `Image` at the top of the card with fixed container height to prevent CLS.
   - Fallback: if no image is provided, keep current icon-only layout.

2) Keep all existing classes. Wrap image in a rounded container consistent with current style. Example constraints:
   - Container: fixed aspect ratio (e.g., 16/9), `overflow-hidden`, `rounded-xl`.
   - `next/image` with `sizes` and `priority={false}`; `loading="lazy"`.

3) Alt text: use `t(imageAltKey)` if provided; fallback to `card.title`.

## i18n & Accessibility
- No key changes; only new optional keys for alt text in `messages/{ar,en}.json` if needed.
- Ensure `alt` always present; fallback to localized service title.

## Types & Boundaries
- Keep components as Server Components. Only add `"use client"` if strictly necessary (not expected here).
- Maintain strict TypeScript; optional props for new fields.

## Rollout Plan
1) Add optional fields to `CardData`.
2) Thread fields through `Services.tsx` → `ServiceCard` props without altering existing props.
3) Render `next/image` conditionally; test both with and without images.
4) Verify no layout shift (reserve height via wrapper).
5) Test both locales for alt text and RTL/LTR.

## Verification Checklist
- No unrelated files changed; no dependency changes.
- Types compile; ESLint clean.
- Layout and spacing unchanged for cards without images.
- Images load from `res.cloudinary.com`; no hydration or RSC boundary issues.
- CLS avoided via fixed-size wrapper.
- Fallback icon-only mode preserved.

## Risks & Mitigations
- Missing env vars → logs already in `lib/cloudinary.ts`. Mitigate by graceful fallback to icon-only.
- Slow image loads → use Cloudinary `quality:auto` and `format:auto` with appropriate width.
- Responsive mismatch → use `sizes` and constrain wrapper aspect ratio.

## Minimal Edit Diff (Conceptual)
- `serviceData.ts`: add optional fields, populate `imagePublicId` selectively.
- `ServiceCard.tsx`: conditional image rendering block at top; maintain existing layout structure.

