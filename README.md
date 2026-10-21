# mfarazaly.github.io

Personal site for **M Faraz Ali** — web developer and toolmaker.
Live at <https://mfarazaly.github.io>.

Plain HTML, one CSS file and one small JavaScript file. No framework, no build
step, no tracking. Fonts are self-hosted (Inter), so the site makes no
third-party requests at all. GitHub Pages serves it from `master`.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Profile-first home: hero, about, services, System Widget carousel, contact |
| `projects.html` | Project index; cards link to write-ups |
| `system-widget.html` | Full product page: gallery, features, install, FAQ, releases |
| `404.html` | Served automatically by GitHub Pages |

Supporting files: `assets/css/site.css`, `assets/js/site.js`, `assets/img/`
(screenshots, favicons, Open Graph images), `assets/fonts/` (Inter variable
font, latin + latin-ext subsets), `robots.txt`, `sitemap.xml`.

## Fonts

The two `Inter-*.woff2` files are self-hosted subsets. `site.css` declares the
`@font-face` rules with `font-display: swap`; the latin subset is preloaded in
each page head. If the font files are replaced, keep the same names so the
preload links keep working.

## Screenshot carousel

The carousel is plain JavaScript (`assets/js/site.js`) — no dependency, no
autoplay. Slides live inside `.carousel-stage`; only one has `.is-active`.

- Each `<figure class="slide">` carries `data-fit` (`bar`, `wide`, `square`,
  `tall`), `data-title` and `data-text`.
- The controller copies the current slide's `data-fit` onto the carousel root,
  and the stylesheet uses that to transition the stage height. This is what
  makes the mobile stage fit portrait screenshots without leaving dead space.
- Captions are rendered in the bar below the stage from `data-title` /
  `data-text`; dots and the counter are generated from the slide list.
- Controls: previous/next buttons, dots, left/right arrows, Home/End, and
  horizontal swipe. There are no animations that hide content before JS runs.

To add a slide, copy a `<figure>`, set its image dimensions and `data-fit`, and
add it before `.stage-taskbar`. The dots and counter update automatically.

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
- `index.html` — the version chip in the System Widget section.
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

Opening the files directly with `file://` mostly works too — there is no fetch
and no module import — but a local server matches GitHub Pages more closely.

## Licence

The text and images in this repository are © 2026 M Faraz Ali. The System Widget
application itself is source-available, all rights reserved — see its
[repository](https://github.com/mfarazaly/system-widget).
