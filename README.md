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

1. Create a new GitHub OAuth App:
- Callback URL: `https://YOUR-RENDER-SERVICE.onrender.com/callback`
- Save the generated `Client ID` and `Client Secret`

2. Deploy an OAuth proxy service on Render:
- Create a new Web Service from this template repo:
  `https://github.com/decaporg/decap-cms-oauth-provider`
- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`

3. Add environment variables in Render:
- `ORIGIN=https://fauzanalfi.github.io`
- `OAUTH_CLIENT_ID=<your GitHub client id>`
- `OAUTH_CLIENT_SECRET=<your GitHub client secret>`
- `GITHUB_HOSTNAME=github.com`
- `NODE_ENV=production`

4. Update `admin/config.yml`:
- Set `backend.base_url` to your Render URL
- Keep `backend.auth_endpoint: auth`

Example:

```yaml
backend:
  name: github
  repo: fauzanalfi/fauzanalfi.github.io
  branch: main
  base_url: https://YOUR-RENDER-SERVICE.onrender.com
  auth_endpoint: auth
```

5. Commit and push, then open:
- `https://fauzanalfi.github.io/admin/`

You should now be able to log in with GitHub and create/edit posts directly from the CMS.

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
