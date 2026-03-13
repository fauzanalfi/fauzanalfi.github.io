# texture

A configurable jekyll theme for simply beautiful blogs.

**Demo**: [samarsault.com/texture](https://samarsault.com/texture)

![texture theme preview](/screen1.png)


## Installation on Github Pages

Add this line to your site's `_config.yml`:
```yaml
remote_theme: samarsault/texture
```

**NOTE: If you are forking this repo, remove `base_url: /texture` in the `_config.yml` which is required to load the required website assets**
## Installation

Add this line to your Jekyll site's `Gemfile`:

```ruby
gem "texture"
```

And add this line to your Jekyll site's `_config.yml`:

```yaml
theme: texture
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install texture

## Usage

The "texture" key in _config.yml is used to customize the theme data.
```yaml
texture:
  title: Adam Denisov
  tagline: Developer. Designer
  date_format: "%b %-d, %Y"

  social_links:
    twitter: thelehhman
    github:  thelehhman
    linkedIn: in/thelehhman # format: locale/username
```

**Styling**

Multiple header styles are supported using the "style" property under texture in `_config.yml`.

```yaml
texture:
  style: [yellow|red|black|blue|green|purple]
```

For example, the blue style looks like this:

![texture theme blue](/screen2.png)


**Texture Picker**

You can toggle the texture picker to show/experiment various textures on your site using the showPicker variable. Remember to make it `false` for production.

```yaml
texture:
  showPicker: [false|true] # show the texture selector(development purposes)
```

**Comments (Disqus)**

Comments on posts can be enabled by specifying your disqus_shortname under texture in `_config.yml`. For example,
```yaml
texture:
  disqus_shortname: games
```

**Google Analytics**

It can be enabled by specifying your analytics id under texture in `_config.yml`
```yaml
texture:
  analytics_id: '< YOUR ID >'
```

**Excerpts**

Excerpts can be enabled by adding the following line to your `_config.yml`
```yaml
show_excerpts: true
```

**Toggle Navbar**

```yaml
texture:
  showNav: true
```

**Navigation**

After setting `showNav` to true navigation can be built by adding the following to your `_config.yml`

```yaml
texture:
  navigation:
    - title: My Work
      url: "/my-work"
    - title: Resume
      url: "/resume"
```

**Layouts**

- Home
- Page
- Post

## Managing Posts Easily (This Repo)

This site now includes a visual editor using Decap CMS.

### 1. Open the editor

Visit `/admin` on your deployed site.

Example: `https://fauzanalfi.github.io/admin/`

### 2. Write with drafts and review flow

- Create a new post from the CMS UI
- Save as draft while writing
- Move to review when ready
- Publish when done

Draft and review states are controlled by `publish_mode: editorial_workflow` in `admin/config.yml`.

### 3. Schedule posts

Set a future publish date in the post editor. Scheduled content becomes visible after that date when the site rebuilds.

This repo includes `.github/workflows/scheduled-publish.yml`, which triggers an hourly commit to force a GitHub Pages rebuild so future-dated posts can go live automatically.

### 4. Media uploads

Upload images directly in CMS. Files are stored in `assets/uploads/`.

### 5. One-time authentication setup for GitHub Pages

Decap with the `github` backend needs an OAuth proxy service.

#### Quick setup (Render)

This is the easiest path for GitHub Pages users.
No coding is required. Just copy values and click through forms.

Estimated time: 10-15 minutes.

Before starting, prepare these values:
- Site URL: `https://fauzanalfi.github.io`
- Repo URL: `https://github.com/fauzanalfi/fauzanalfi.github.io`
- A Render account and GitHub account (both logged in)

1. Create the OAuth service on Render (Docker).
- Open Render dashboard and click `New` > `Web Service`.
- Connect this repo URL:
  `https://github.com/vencax/netlify-cms-github-oauth-provider`
- On setup page, use these values:
  - Name: `decap-oauth-fauzan` (or any name you like)
  - Region: nearest to your users
  - Branch: `main` (or default branch shown by Render)
  - Runtime: `Docker`
  - Instance Type: `Free`
- Important:
  - Leave Build Command empty
  - Leave Start Command empty
  - Docker build/run will follow the repository `Dockerfile`
- Click `Create Web Service` and wait until status is `Live`.

2. Copy your Render service URL.
- Example: `https://decap-oauth-fauzan.onrender.com`
- Keep this URL for next steps.

3. Create a GitHub OAuth App.
- Open `https://github.com/settings/developers`.
- Click `New OAuth App`.
- Fill:
  - Application name: `Fauzan Blog CMS`
  - Homepage URL: `https://fauzanalfi.github.io`
  - Authorization callback URL: `https://YOUR-RENDER-SERVICE.onrender.com/callback`
- Click `Register application`.
- Copy `Client ID`.
- Click `Generate a new client secret`, then copy `Client Secret`.

4. Add environment variables in Render.
- Open your Render OAuth service > `Environment`.
- Add these exact keys and values:

```text
ORIGINS=fauzanalfi.github.io
OAUTH_CLIENT_ID=<your GitHub client id>
OAUTH_CLIENT_SECRET=<your GitHub client secret>
GIT_HOSTNAME=https://github.com
NODE_ENV=production
```

5. Redeploy the Render service.
- Click `Manual Deploy` > `Deploy latest commit`.
- Wait until status is `Live` again.
- Optional (if deploy fails after env changes): use `Clear build cache & deploy` once.

6. Update CMS config in this repo (`admin/config.yml`).
- Replace backend config with this block:

```yaml
backend:
  name: github
  repo: fauzanalfi/fauzanalfi.github.io
  branch: main
  base_url: https://YOUR-RENDER-SERVICE.onrender.com
  auth_endpoint: auth
```

7. Commit and push changes (copy-paste commands).

If this repo is already on your computer:

```bash
cd fauzanalfi.github.io
git pull origin main
git add admin/config.yml
git commit -m "Configure Decap CMS OAuth via Render"
git push origin main
```

If this repo is not on your computer yet:

```bash
git clone https://github.com/fauzanalfi/fauzanalfi.github.io.git
cd fauzanalfi.github.io
git add admin/config.yml
git commit -m "Configure Decap CMS OAuth via Render"
git push origin main
```

8. Final check.
- Wait for GitHub Pages deploy to finish.
- Open: `https://fauzanalfi.github.io/admin/`
- Click `Login with GitHub`, authorize app, then create one test draft post.

If login fails:
- Check Render logs first (`Logs` tab in your Render service).
- Make sure these two values match exactly:
  - GitHub OAuth callback URL
  - `backend.base_url` in `admin/config.yml`

#### Alternative quick setup (Railway)

If Render is unstable for your account/region, use Railway with the same OAuth provider.

Estimated time: 10-15 minutes.

Before starting, prepare these values:
- Site URL: `https://fauzanalfi.github.io`
- Repo URL: `https://github.com/fauzanalfi/fauzanalfi.github.io`
- A Railway account and GitHub account (both logged in)

1. Create OAuth service on Railway.
- Open Railway dashboard and click `New Project`.
- Choose `Deploy from GitHub repo`.
- Select this repo:
  `https://github.com/vencax/netlify-cms-github-oauth-provider`
- Wait for first deploy to finish.

2. Generate a public domain.
- Open your Railway service > `Settings` > `Networking`.
- Click `Generate Domain`.
- Copy the URL. Example: `https://decap-oauth-fauzan.up.railway.app`

3. Create a GitHub OAuth App.
- Open `https://github.com/settings/developers`.
- Click `New OAuth App`.
- Fill:
  - Application name: `Fauzan Blog CMS (Railway)`
  - Homepage URL: `https://fauzanalfi.github.io`
  - Authorization callback URL: `https://YOUR-RAILWAY-DOMAIN/callback`
- Click `Register application`.
- Copy `Client ID`.
- Click `Generate a new client secret`, then copy `Client Secret`.

4. Add environment variables in Railway.
- Open your Railway service > `Variables`.
- Add these exact keys and values:

```text
ORIGINS=fauzanalfi.github.io
OAUTH_CLIENT_ID=<your GitHub client id>
OAUTH_CLIENT_SECRET=<your GitHub client secret>
GIT_HOSTNAME=https://github.com
NODE_ENV=production
```

5. Redeploy Railway service.
- Trigger a redeploy from `Deployments`.
- Wait until status is successful.

6. Update CMS config in this repo (`admin/config.yml`).
- Replace backend config with this block:

```yaml
backend:
  name: github
  repo: fauzanalfi/fauzanalfi.github.io
  branch: main
  base_url: https://YOUR-RAILWAY-DOMAIN
  auth_endpoint: auth
```

7. Commit and push changes (copy-paste commands).

If this repo is already on your computer:

```bash
cd fauzanalfi.github.io
git pull origin main
git add admin/config.yml
git commit -m "Configure Decap CMS OAuth via Railway"
git push origin main
```

If this repo is not on your computer yet:

```bash
git clone https://github.com/fauzanalfi/fauzanalfi.github.io.git
cd fauzanalfi.github.io
git add admin/config.yml
git commit -m "Configure Decap CMS OAuth via Railway"
git push origin main
```

8. Final check.
- Wait for GitHub Pages deploy to finish.
- Open: `https://fauzanalfi.github.io/admin/`
- Click `Login with GitHub`, authorize app, then create one test draft post.

If login fails:
- Check Railway deploy logs first.
- Make sure these two values match exactly:
  - GitHub OAuth callback URL
  - `backend.base_url` in `admin/config.yml`

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/samarsault/texture. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Development

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site! To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

When your theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled.
To add a custom directory to your theme-gem, please edit the regexp in `texture.gemspec` accordingly.

## Donation
If this project help you reduce time to develop, you can give me a cup of coffee :) 

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/thelehhman)

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## More Themes
[plainwhite](https://github.com/samarsault/plainwhite-jekyll)
