# arjith.github.io

Personal site of Arjith Retna Srikanth: <https://arjith.github.io>

Plain static HTML and CSS with no build step. Everything served lives in `public/`.

```
public/
  index.html            home: intro, selected projects, recent updates, work
  projects/index.html   all projects, grouped by status
  updates/index.html    dated log of releases and changes
  about/index.html      background, experience, education, contact
  feed.xml              Atom feed mirroring the updates page
  assets/site.css       shared layout and components
  assets/visual.css     halftone home, native projects, strata about, water updates
  assets/field.js       shared WebGL2 effects; static CSS fallback, reduced-motion
                        frame, offscreen/hidden pause and context recovery
  404.html, robots.txt, sitemap.xml
```

Project sub-sites such as
[copilot-kubuntu-desktop-kit](https://arjith.github.io/copilot-kubuntu-desktop-kit/)
are published from their own repositories and linked from `projects/`.

Home and About use a paper palette; Projects and Updates use dark palettes.
Artwork responds to pointer movement without affecting text or navigation.
The local prototype comparisons in `public/options/` are untracked design
references and are not deployed. Contact links lead to LinkedIn and project issue
trackers until a separate public inbox has been created and verified.

## Preview locally

```bash
python3 -m http.server 8765 --directory public
```

Then open <http://127.0.0.1:8765/>.

## Deployment

Pushing to `main` runs both workflows in `.github/workflows/`:

- `deploy.yml` publishes `public/` to the `gh-pages` branch for GitHub Pages.
- `azure-static-web-apps-*.yml` uploads `public/` to Azure Static Web Apps.

## Publishing a project update

Releases go out quietly and consistently:

1. Tag the release in the project repository and write short, factual release
   notes: what changed, what was tested, known limits.
2. Update the project's row in `public/projects/index.html` (status, version,
   date). Use `maintained`, `preview` or `experiment` honestly; list forks only
   under **Forks**, crediting the upstream project.
3. Add one dated line to `public/updates/index.html` and a matching `<entry>` in
   `public/feed.xml` (bump the feed's `<updated>`). Mirror it on the home page's
   "Recent updates" if it is one of the latest three.
4. Add new pages to `public/sitemap.xml`.
