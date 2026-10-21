# mfarazaly.github.io

Personal site for **M Faraz Ali** — web developer and toolmaker.
Live at <https://mfarazaly.github.io>.

Plain HTML, one CSS file and about forty lines of JavaScript. No framework, no
build step, no external fonts, no tracking. GitHub Pages serves it straight from
`main`.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: hero, featured project, about, contact |
| `projects.html` | Every project, one card each |
| `system-widget.html` | Product page for System Widget |
| `404.html` | Served automatically by GitHub Pages |

Supporting files: `assets/css/site.css`, `assets/js/site.js`, `assets/img/`
(screenshots, favicons, Open Graph image), `robots.txt`, `sitemap.xml`.

## Adding a project

Open `projects.html`. There is a commented-out `<article class="project">` block
at the bottom of the grid — copy it, fill in the name, description, tags, links
and the language colour (`--lang`), then delete the comment.

A full-width featured card uses `class="project featured"` and needs a
`.project-media` block plus a `.project-body` wrapper; the regular cards don't.

## Shipping a new System Widget version

The version number appears in a handful of places:

- `system-widget.html` — the `.badge.live` badge, the download links (hero and
  final CTA), the release notes, and `~11 MB` if the size changed.
- `index.html` — the hero button chip and the feature card chips.
- `projects.html` — the featured card chips.
- `sitemap.xml` — `lastmod` dates.

Screenshots in `assets/img/widget-*.png` are real captures of the running app,
taken at 150 % UI scale with the window positioned on a dark background. They
are PNGs with transparency, so they sit cleanly on the dark cards.

## Preview locally

```powershell
python -m http.server 8000
# then open http://127.0.0.1:8000
```

Opening the files directly with `file://` also works; the only thing that needs
a server is nothing, actually — there is no fetch, no module import, no API.

## Licence

The text and images in this repository are © 2026 M Faraz Ali. The System Widget
application itself is source-available, all rights reserved — see its
[repository](https://github.com/mfarazaly/system-widget).
