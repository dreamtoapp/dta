# PRD: Pinterest-style Worksample Gallery

## 1) Summary
Transform the Worksample experience into a Pinterest-style, high-performance gallery with infinite scroll, folder-based filtering, and image-first UX powered by Cloudinary.

## 2) Objectives & KPIs
- Objectives
  - Delight users with a fast, modern gallery that scales to hundreds of images.
  - Keep implementation risk near-zero by aligning with current code and infra.
- KPIs (route: `/[locale]/worksample` and `/[locale]/worksample/show/[folder]`)
  - Core Web Vitals: CLS ≤ 0.05, LCP ≤ 2.5s (fast 4G), TBT ≤ 200ms
  - Lighthouse Performance ≥ 90
  - Error rate on API routes < 0.5%
  - Scroll FPS ≥ 55 on mid-tier mobile (no jank)

## 3) Scope
- In-scope
  - Masonry gallery layout using CSS columns (no heavy JS layout lib)
  - Infinite scroll via Intersection Observer (package: `react-intersection-observer`)
  - Folder dropdown filter (categories from Cloudinary folders)
  - Cloudinary pagination using `next_cursor` (admin/search APIs)
  - Image pipeline: `next/image` with `sizes`, explicit `width`/`height` or stable aspect ratio, `blurDataURL`
- Out-of-scope (phase 1)
  - Drag & drop reordering, client-side uploads
  - Complex animations beyond simple hover/transition
  - Full-blown virtualization (only if metrics demand)

## 4) Users & Use Cases
- Visitors preview work quickly; switch categories; keep scrolling without page reloads.
- Marketing shares direct links with selected folder via query param.

## 5) Functional Requirements
- FR1: Display gallery in responsive Masonry grid (1/2/3/4 columns by viewport).
- FR2: Infinite scroll loads next page of images automatically when near the end.
- FR3: Folder filter dropdown lists all folders; selecting filters the feed.
- FR4: URL reflects current filter (`?folder=...`) and is shareable.
- FR5: Images render with low-CLS placeholders and correct aspect ratios.
- FR6: Fallback to a “Load more” button if observer not supported.

## 6) Non-Functional Requirements
- NFR1: Performance budgets (see KPIs).
- NFR2: Accessibility: keyboard navigable filter, focus rings, descriptive `alt`.
- NFR3: Localization/RTL respected by existing layout + `dir`.
- NFR4: Error resilience: graceful empty states, retries limited (no loops).

## 7) Information Architecture & Data Contracts
- Data Sources
  - Cloudinary folders: `website/workSample`
  - Helpers (extend with pagination):
    - `getImagesFromFolderPaginated(folderPath: string, cursor?: string, max?: number)` → `{ items, nextCursor }`
    - `getFoldersWithCoverImagesPaginated(baseFolder: string, cursor?: string, max?: number)` → `{ items, nextCursor }`
  - Existing non-paginated helpers remain for SSR-first page.
- API Routes (Route Handlers)
  - `GET /api/worksample/images?folder=...&cursor=...&limit=24`
  - `GET /api/worksample/folders?cursor=...&limit=24`
  - Response: `{ items: ImageItem[] | FolderItem[], nextCursor: string | null }`

## 8) UX & Interaction Details
- Layout
  - Container: `columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4`
  - Items: `break-inside-avoid`, rounded card, subtle shadow
- Filter Dropdown
  - Button label shows current selection; menu with `All + folders` (radio/check)
  - Sync selection to search param; reset pagination cursor
- Infinite Scroll
  - Sentinel at grid end observed with `rootMargin: '1000px'`
  - Skeleton cards (6–8) while fetching
  - Abort stale requests on filter/cursor changes; de-dup by `public_id`

## 9) Accessibility
- `aria-haspopup="menu"`, `aria-expanded` on filter button
- Keyboard navigation for menu and cards; visible focus styles
- Meaningful `alt` text; no decorative-only images without `alt=""`

## 10) Performance Strategy
- Server-first: pages are Server Components; only interactive parts are Client
- Streaming: small Suspense boundaries around image-heavy sections
- Caching: `revalidate = 3600` where acceptable; otherwise targeted cache per fetch
- Images: set `width/height` (or aspect ratio), `sizes`, `placeholder="blur"` with `blurDataURL`
- Network hints: route-local preconnect to Cloudinary (not global)

## 11) Risks & Mitigations
- Risk: Cloudinary rate limits or missing env → Mitigation: fallbacks + logs
- Risk: Large payloads → Mitigation: page size 24, responsive transforms
- Risk: Duplicate items on pagination → Mitigation: client-side de-dup by `public_id`

## 12) Analytics & Observability
- Capture Web Vitals on the route (LCP/CLS/TBT)
- Log pagination failures with cursor and folder (no PII)

## 13) Rollout Plan
- Feature-flag the infinite scroll and filter (env or prop) for safe rollout
- Keep old layout behind a quick revert switch (one deploy window)

## 14) Acceptance Criteria
- Grid adapts to 1/2/3/4 columns by viewport
- No visible layout shift during scroll; placeholders present
- Infinite scroll loads pages until `nextCursor = null`
- Folder selection filters feed and syncs to URL
- Lighthouse Perf ≥ 90; CLS ≤ 0.05; LCP ≤ 2.5s (fast 4G)

## 15) Milestones
- M1: API contracts & paginated helpers ready
- M2: Masonry grid and first-page SSR complete
- M3: Infinite scroll with observer + skeleton loader
- M4: Folder dropdown with URL sync + cursor reset
- M5: A11y/Perf verification and rollout flag

---

# Technical Appendix (Implementation Details)

## Architecture
- Components
  - `app/[locale]/worksample/page.tsx` (Server) – fetch items, render layout shell
  - `components/worksample/MasonryGrid.tsx` (Client) – responsive masonry with CSS columns
  - `components/worksample/WorkCard.tsx` (Server or Client if hover effects) – image + meta
  - `components/worksample/Filters.tsx` (Client, optional) – category/tags
- Data
  - Reuse existing fetchers; add `width`, `height`, `alt`, `src`, `blurDataURL`

## Layout Strategy
- CSS Columns Masonry (no JS):
  - Container: `columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4`
  - Items: `break-inside-avoid` card wrappers

## Performance (Detailed)
- Rendering strategy
  - Keep `page.tsx` as Server Component; move only interactive bits (filters) to Client
  - Add small `Suspense` boundaries around sections that fetch images to stream early content
- Caching & revalidation
  - `export const revalidate = 3600;` where acceptable; otherwise targeted cache per fetch
- Images (largest perf lever)
  - Always pass `width`/`height` (or stable aspect ratio)
  - Provide `sizes` to match responsive columns
  - Use `placeholder="blur"` with precomputed `blurDataURL`
- Network hints (route-local)
  - Preconnect only when the route mounts
- JS/runtime
  - Avoid JS masonry libraries; CSS columns + `break-inside-avoid` is zero-runtime
- Streaming & incremental rendering
  - Wrap the grid in a `Suspense` boundary with a lightweight skeleton

### Example snippets
```ts
// app/[locale]/worksample/page.tsx
export const revalidate = 3600; // or omit if dynamic
export default async function Page() { /* ... */ }
```
```tsx
<Image
  src={item.src}
  alt={item.alt}
  width={item.width}
  height={item.height}
  placeholder="blur"
  blurDataURL={item.blurDataURL}
  sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
  className="w-full h-auto rounded-lg"
/>
```

## Infinite Scroll (Cloudinary Pagination)
- Enable on `show/[foldername]`; optional on root page
- Cloudinary pagination via `next_cursor`
- Route handlers: `/api/worksample/images`, `/api/worksample/folders`
- Use `react-intersection-observer` sentinel; fallback button if unsupported
- Debounce, `isLoading` guard, `AbortController`, de-dup by `public_id`

## Folder Filter (Dropdown)
- Server: `getAllFolders("website/workSample")`, normalize labels (last segment)
- Client: dropdown with `All + folders`, update URL `?folder=...`
- With pagination: pass `folder` to API; reset cursor on change

## Risks
- Virtualization if item counts explode; otherwise keep CSS-columns
