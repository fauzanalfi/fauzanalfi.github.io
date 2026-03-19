# Fauzan Blog (Jekyll + Decap CMS)

This repository uses:
- GitHub Pages-compatible Jekyll plugins
- local layouts and includes for the editorial redesign shell
- `academicpages/academicpages.github.io` as a remote base theme while templates are being replaced incrementally
- Decap CMS (`/admin`) for visual content editing
- GitHub Pages for deployment

## Theme

The site is transitioning from a remote-theme-driven setup to locally owned templates.

Current foundation files live in:

- `_layouts/`
- `_includes/`
- `assets/css/main.scss`
- `assets/js/site.js`

The remote theme is still configured in `_config.yml` for compatibility while the redesign is rolled out:

```yaml
remote_theme: academicpages/academicpages.github.io
```

## Content model

Current editable content types include:

- `posts`
- `drafts`
- `core_pages`
- `additional pages`
- `research_projects`
- `structured_data`
- site settings and navigation

Additional rendered page types now present in the site:

- `/search/`
- `/tags/`
- `/categories/`

These pages are stored under `_pages/` and are managed from the dedicated `Core Pages` collection in Decap CMS.

Additional custom pages can be created under:

- `_pages/extras/`

and managed through the `Additional Pages` collection.

Structured research support now also lives in data files:

- `_data/lab_members.yml`
- `_data/publications.yml`
- `_data/research.yml`
- `_data/about.yml`

## Local development

Prerequisites:
- Ruby + Bundler

Windows note:

- Ruby 3.1 with DevKit works for this repository.
- If `bundle` is not on `PATH` yet after install, reopen the terminal or use the RubyInstaller path directly.

Install dependencies:

```bash
bundle install
```

Run site locally:

```bash
bundle exec jekyll serve
```

If the shell has not picked up `PATH` yet on Windows, this also works:

```powershell
& "C:\Ruby31-x64\bin\bundle.bat" install
& "C:\Ruby31-x64\bin\jekyll.bat" serve
```

Open: `http://localhost:4000`

## CMS (Decap)

Open CMS at:
- `https://fauzanalfi.github.io/admin/`

Current collections:
- `posts` (folder: `_posts`, includes SEO, tags, featured image, publish toggle, featured + manual sort order)
- `drafts` (folder: `_drafts`, for pre-publish writing workflow)
- `pages` (folder: `_pages`, includes SEO + publish toggle)
- `research_projects` (folder: `_research_projects`, for the project index and case-study pages, with featured + manual sort order)
- `site_settings`:
   - `Blog & SEO Settings` (file: `_config.yml`)
   - `Navigation` (file: `_data/navigation.yml`)
- `structured_data`:
   - `about.yml`, `research.yml`, `teaching.yml`, `cv.yml`, `lab_members.yml`, `publications.yml`

### WordPress-like CMS workflow (safe for Jekyll)

- Manage global identity and blog title from:
   - `Site Settings` → `Blog & SEO Settings`
- Manage menu structure from:
   - `Site Settings` → `Navigation`
- Write first in `Drafts`, then move/publish to `Posts` when ready.
- Use `publish_mode: editorial_workflow` for review-before-publish flow.
- Use post/page `Published` toggle for controlled visibility.

### Navigation and Home setup

- Main menu order can be managed visually in Decap CMS:
   - `Site Settings` → `Navigation`
   - Reorder items with drag-and-drop
- Blog post listing is available at:
   - `/blog/`
- Home page is managed as a normal page file:
   - `_pages/home.md` with permalink `/`
   - Editable from Decap CMS in `Pages`
- Home and research cards can be curated from CMS with:
   - `featured` toggle
   - `sort_order` manual integer field (lower number appears first)
- Research landing page is available at:
   - `/research/`
- Research project detail pages are generated from:
   - `_research_projects/`

## OAuth setup for GitHub backend

Decap with `backend: github` needs an OAuth proxy service.

### Quick setup (Render, Docker)

1. Create a new Render Web Service from:
   - `https://github.com/vencax/netlify-cms-github-oauth-provider`
2. Use Runtime: `Docker`.
3. Set env vars:

```text
ORIGINS=fauzanalfi.github.io
OAUTH_CLIENT_ID=<your GitHub client id>
OAUTH_CLIENT_SECRET=<your GitHub client secret>
GIT_HOSTNAME=https://github.com
NODE_ENV=production
```

4. Create GitHub OAuth App callback URL:
   - `https://YOUR-RENDER-SERVICE.onrender.com/callback`
5. Update `admin/config.yml`:

```yaml
backend:
  name: github
  repo: fauzanalfi/fauzanalfi.github.io
  branch: main
  base_url: https://YOUR-RENDER-SERVICE.onrender.com
  auth_endpoint: auth
```

6. Commit and push.

### Alternative setup (Railway)

Use the same provider repo and env vars.

Set callback URL to:
- `https://YOUR-RAILWAY-DOMAIN/callback`

Then update `admin/config.yml` with:
- `base_url: https://YOUR-RAILWAY-DOMAIN`

## Notes

- If GitHub Pages build fails, first check `_config.yml` for YAML/merge conflict markers.
- On Windows, `tzinfo-data` is included in the Gemfile so Jekyll can resolve timezone data locally.
- Ensure local override folders like `_layouts`, `_includes`, and `assets/css` do not contain stale legacy theme files that conflict with the redesign.
