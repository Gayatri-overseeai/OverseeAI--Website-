# Oversee site shell — v3

This package is a static HTML/CSS/JavaScript site shell.

## Positioning in this version

- Oversee is stated plainly as a software company.
- The platform is the grammatical subject when describing evaluation, implementation, and generated outputs.
- The homepage uses Launch, Rationalize, and Modernize as the three primary carrier situations.
- The Product Catalog is the carrier-owned product definition used by downstream systems and AI.
- Institutional character is retained through Briefings, Perspectives, NDA access, and the lines “A conversation, not a demonstration” and “Permanent rather than prominent.”
- Consultancy-coded identity language such as “firm,” “engagements,” and client-scarcity claims has been removed from visible copy.

## Files

- `index.html` — homepage
- `about.html` — company and leadership page
- `contact.html` — briefing and evaluation page
- `perspectives.html` — editorial page
- `insights.html` — compatibility redirect to Perspectives
- `styles.css` — shared styling
- `site.js` — mobile navigation and contact-form shell
- favicon and social-preview assets

## Implementation notes

- The contact form currently opens a pre-filled email. Wire it to the production form service before launch.
- Confirm final canonical URL strategy for `/perspectives/` and configure a server-side redirect from `/insights/` if required.
- Confirm office, leadership, SOC 2, legal, and trust-center details before publication.
- The serif stack uses system fonts and will vary by operating system. Use the approved licensed webfont when the brand font is final.
