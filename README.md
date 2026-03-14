# Fauzan Blog (Academic Pages + Decap CMS)

This repository uses:
- `academicpages/academicpages.github.io` as the Jekyll theme
- Decap CMS (`/admin`) for visual content editing
- GitHub Pages for deployment

## Theme

Theme is configured in `_config.yml`:

```yaml
remote_theme: academicpages/academicpages.github.io
```

No legacy Texture theme files are required.

## Local development

Prerequisites:
- Ruby + Bundler

Install dependencies:

```bash
bundle install
```

Run site locally:

```bash
bundle exec jekyll serve
```

Open: `http://localhost:4000`

## CMS (Decap)

Open CMS at:
- `https://fauzanalfi.github.io/admin/`

Current collections:
- `posts` (folder: `_posts`)
- `pages` (folder: `_pages`)
- `site_settings` (file: `_data/navigation.yml`, for menu order)

### Navigation and Home setup

- Main menu order can be managed visually in Decap CMS:
   - `Site Settings` → `Navigation`
   - Reorder items with drag-and-drop
- Blog post listing is available at:
   - `/blog/`
- Default Home page is managed as a normal page file:
   - `_pages/home.md` with permalink `/`
   - Editable from Decap CMS in `Pages`

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
- Ensure local override folders like `_layouts`, `_includes`, `_sass` do not contain legacy theme files that conflict with remote theme behavior.
