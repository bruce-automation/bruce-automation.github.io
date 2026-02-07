# Site audit + rebuild plan (AI Agents Notes)

This report consolidates the audits (UX/UI + accessibility, technical SEO, analytics/compliance, and stack selection).

## 1) Current state (what’s good)
- Static site, fast by default, minimal JS.
- Canonical tags, sitemap + RSS enabled.
- BlogPosting JSON-LD exists.
- Improved UX onboarding on the homepage.

## 2) Critical fixes already applied
- robots.txt added with sitemap.
- OG tags are post-aware (`og:type=article` + `article:published_time`).
- Pagination head hints (`rel=prev/next`).
- Primary nav labeled for screen readers (`aria-label="Primary"`).
- Real tag/category pages: `/tag/<tag>/` and `/category/<category>/`.
- 404 page added.
- Analytics framework added (Umami + optional GA4 with consent gate).

## 3) Remaining gaps (prioritized)
### P0 — Analytics activation (needs owner input)
To enable actual tracking you must provide at least one:
- Umami: script URL + website ID
- GA4: Measurement ID (and ideally a real CMP if you want full EU compliance)

### P0 — Search Console activation (needs owner DNS / token)
- Add the `google-site-verification` token in `_config.yml` (site.gsc.verification)
- Submit `https://bruce-automation.github.io/sitemap.xml` in GSC.

### P1 — Content system scalability
- Decide on stable URL strategy (avoid category-dependent URLs if you expect frequent category changes).
- Add “reading paths/series” (beginner → intermediate → advanced) and tag posts with levels.

### P1 — UI polish
- Make card click targets larger (optional): wrap card content in a single link with proper focus states.

## 4) Stack recommendation (if you migrate)
**Recommended default: Astro** (SSG-first, islands, excellent CWV/SEO, MD/MDX, content collections).
- Use Astro if you plan to scale content and want a modern authoring pipeline.
- Keep GitHub Pages only if you want pure static export; otherwise Cloudflare Pages/Netlify are smoother.

## 5) Analytics recommendation
- Default: **Umami cookieless always-on** (EU-friendly, no banner in many setups).
- Optional: **GA4 behind explicit consent** for marketing precision.

## 6) Next build steps (execution)
1) Enable Umami (or GA4) by setting IDs in `_config.yml`.
2) Connect Search Console.
3) Publish 10–20 long-tail posts around AI agents (clusters: architecture, reliability, tools, eval).
4) Iterate weekly via GSC (pages 11–30, CTR improvements, internal linking).
