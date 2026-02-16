# GitHub Launch Checklist

Use this checklist before making the repository public.

## Repository Setup

- [ ] Update repository name, description, and topics on GitHub.
- [ ] Confirm `README.md` matches the final scope and screenshots.
- [ ] Add branch protection rules for the default branch.
- [ ] Confirm `LICENSE` is the intended license.

## Content and Branding

- [ ] Replace placeholder project links in `src/components/Projects.jsx` (`https://github.com`, `https://demo.com`).
- [ ] Replace sample certification IDs/links in `src/components/Certifications.jsx`.
- [ ] Add real blog posts or intentionally keep blog disabled in `src/components/Blog.jsx`.
- [ ] Verify profile text and social links in `src/components/Hero.jsx` and `src/components/Footer.jsx`.
- [ ] Verify all domain references match production domain in `src/components/SEO.jsx` and `src/components/StructuredData.jsx`.

## Assets and SEO

- [ ] Add `public/og-image.png` (currently referenced by SEO metadata).
- [ ] Add `public/resume.pdf` or set `VITE_RESUME_URL`.
- [ ] Add local preloaded font file `public/fonts/SpaceGrotesk-Regular.woff2` or remove the preload link in `index.html`.
- [ ] Update `public/sitemap.xml` `lastmod` dates from `2024-01-01` to current values.
- [ ] Validate `public/robots.txt` and sitemap URL.

## Integrations

- [ ] Configure contact form env vars: `VITE_CONTACT_ENDPOINT` or `VITE_FORMSPREE_ID`.
- [ ] Configure `VITE_GITHUB_TOKEN` if GitHub API rate limiting occurs.
- [ ] Configure `VITE_ANALYTICS_ENDPOINT` if using custom analytics ingestion.
- [ ] Verify analytics behavior in production mode.

## Quality Gates

- [ ] Run `npm run lint` and fix any issues.
- [ ] Run `npm run build` and verify successful production build.
- [ ] Run `npm run preview` and test major flows.
- [ ] Test on mobile and desktop breakpoints.
- [ ] Test keyboard shortcuts and reduced-motion behavior.

## Community and Maintenance

- [ ] Review `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md`.
- [ ] Verify issue templates in `.github/ISSUE_TEMPLATE/`.
- [ ] Verify pull request checklist in `.github/pull_request_template.md`.
