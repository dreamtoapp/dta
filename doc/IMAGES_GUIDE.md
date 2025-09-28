# Images and Media – Size, Aspect, and Delivery

This guide summarizes where images are used, recommended sizes, and Cloudinary delivery in this app.

## Where images are used

- `components/heroBanner/ImageHero.tsx` – hero banner
- `components/slider/HomepageHeroSlider.tsx` – homepage slider (Facebook cover-like)
- `app/[locale]/services/page.tsx` – multiple hero/service images

## Recommended source sizes

- Hero banner (full-width)
  - Aspect: 16:9
  - Master export: 2880×1620 to 3200×1800
- Homepage slider (Facebook cover-like)
  - Desktop ratio ≈ 205:78 (820×312), mobile 16:9
  - Keep important content in central 60% vertically
  - Master export suggestion: 2460×936 (3× 820×312)
- Logos/smaller UI assets: Prefer SVG; raster at 2×–3× rendered size

## Component behavior

- ImageHero
  - Next/Image `fill`; desktop `object-cover`; mobile height via min-h classes
  - Cloudinary default transform: `f_auto,q_auto,w_1920,c_fill,g_auto`
  - No-crop variant: switch to `c_fit` and component `object-contain`
- HomepageHeroSlider
  - Wrapper: `aspect-[16/9]` (mobile), `md:aspect-[205/78]` (desktop)
  - Next/Image `object-cover`; `sizes="(max-width: 768px) 100vw, 90vw"`

## Cloudinary usage

- Default folder for slider: `website/clients`
- API route: `app/api/cloudinary/clients/route.ts`
  - Dynamic folder via query: `/api/cloudinary/clients?folder=website/clients`
  - Debug: add `&debug=true`
  - Response items: `{ id, url, width, height, format, folder, publicId }`
- Env vars (server):
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
  - Optional: `CLOUDINARY_CLIENTS_FOLDER` (defaults to `website/clients`)

## Performance

- Prefer AVIF/WebP via `f_auto`, `q_auto`
- Aim for delivered size ≤ 300–600 KB for large banners

## Adding new slider images

1. Upload to Cloudinary folder (default `website/clients`)
2. Verify: `/api/cloudinary/clients?folder=website/clients&debug=true`
3. Slider will render automatically, or pass `slides` from `app/[locale]/(homepage)/page.tsx`

---

If you need alternate ratios (e.g., LinkedIn cover), create a variant wrapper or pass `slides` to a specialized component.

