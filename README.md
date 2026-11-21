# arjith.github.io

Personal site of Arjith Retna Srikanth: <https://arjith.github.io>

Plain static HTML and CSS with no build step. Everything served lives in `public/`.

```
public/
  index.html            home: intro, selected projects, recent updates, work
  projects/index.html   all projects, grouped by status
  updates/index.html    dated log of releases and changes
  about/index.html      background, experience, education, contact
  links/index.html      shareable public links and contact hub
  feed.xml              Atom feed mirroring the updates page
  assets/site.css       shared layout and components
  assets/visual.css     halftone home, native projects, strata about, water updates
  assets/theme.js       system/light/dark preference, persisted across pages
  assets/field.js       shared WebGL2 effects; static CSS fallback, reduced-motion
                        frame, offscreen/hidden pause and context recovery
  404.html, robots.txt, sitemap.xml
```

Project sub-sites such as
[copilot-kubuntu-desktop-kit](https://arjith.github.io/copilot-kubuntu-desktop-kit/)
are published from their own repositories and linked from `projects/`.

Every page supports system, light and dark themes via the navigation selector.
Home uses a full-viewport halftone background, with shading behind the text.
Artwork responds to pointer movement without affecting text or navigation.
Animation is capped at 20 fps and approximately 1.6 million backing pixels.
The motion button pauses every effect and remembers the choice for the tab's
session. System reduced-motion preferences always take priority.
GPU resources are explicitly released on page exit and rebuilt on back/forward
cache restoration. Observers disconnect on exit; listeners are removed when a
page is not being preserved in the back/forward cache.
The local prototype comparisons in `public/options/` are untracked design
references and are not deployed. Public contact uses `arjith@tutamail.com`,
LinkedIn and project issue trackers.

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

## Public discovery and contact

Use `/links/` in short social profiles and the project site in project-specific
posts. Share a working demonstration, tested configuration, known limitations
and one concrete request (for example, a compatibility report) in relevant
Copilot or KDE communities. Record useful feedback in the project's issue
tracker and link the next release back to it.

GitHub's bio and website link point here. Pin original maintained work ahead of
experiments; do not present forks as original projects. Repository pinning
requires the account owner's GitHub profile UI.

No analytics service, tracking pixels or outbound click collection are
installed. Link measurement needs a separate provider and privacy decision.
The separate public inbox has been created. Tuta Free requires a login within
each six-month period to avoid inactivity deletion. Keep recovery credentials
outside the repository; never include them in site assets, commits or logs.
