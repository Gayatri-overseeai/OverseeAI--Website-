# Oversee website shell — revised package

## Pages

- `index.html` — category and platform homepage
- `about.html` — company, leadership, and operating model
- `contact.html` — briefing request and evaluation process
- `insights.html` — aligned current writing and editorial focus
- `perspectives.html` — local compatibility redirect to `insights.html`

## Changes in this revision

- Reframed the homepage around launch, rationalization, and modernization.
- Added the role of the Product Catalog as a product model for downstream systems and AI.
- Replaced generic AI commentary with insurance-product-focused insights.
- Reframed the company as a software infrastructure provider rather than a boutique advisory firm.
- Updated shared navigation, footer, metadata, canonical links, and the social image.
- Added form validation and keyboard handling for the mobile menu.

## Production notes

- The contact form currently opens a pre-filled email. Replace the fallback in `site.js` with the production form endpoint.
- The display typography still uses a system serif stack. A licensed brand webfont should be loaded before production if identical rendering across operating systems is required.
- Verify office, leadership, security, response-time, and legal-link details before publication.
