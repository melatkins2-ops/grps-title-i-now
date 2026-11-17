# Title I NOW

The GRPS Title I hub: the current monthly brief and priorities, the 2026–27 roadmap, and the GRPS Title I Toolkit of guidance, forms, examples, and resources.

**Live site:** https://melatkins2-ops.github.io/grps-title-i-now/

## What's here

- `index.html`: the site (Home, This Month, 2026–27 Roadmap, GRPS Title I Toolkit)
- `title-i-now-brief.js`: the monthly briefs; add the new month here
- `title-i-resource-library.js`: the Toolkit's resource library
- `files/`: GRPS editable templates (Annual Meeting, compacts, checklists, planners), English and Spanish
- `resources/`: reference files (MDE and district presentations, examples)
- `ask-title-i.html`, `assistant-qa.html`, `mde-assistant.html`: question helpers
- `title-i-decision-lab.html`: decision practice
- `knowledge/`: source content for the question helpers
- `GRPS_Title_I_Overview_Web.mp4`: Title I overview video

## Good to know

- The old standalone Title I Resource Center was retired in November 2026; its address now redirects here, to the Toolkit tab.

## Updating the site

Edit the files on a branch and open a pull request. GitHub Pages publishes `main` automatically, usually within a minute or two of a merge.

## Automated site check

Every pull request and every push to `main` runs **Site check** (`.github/workflows/site-check.yml`). It opens the site in a headless browser at desktop (1366px) and phone (390px) widths and fails if the page throws a JavaScript error, a local file or image is missing, or the page scrolls sideways. See the Actions tab for results.

Maintained by GRPS Community & Student Affairs.
