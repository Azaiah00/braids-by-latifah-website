# Braids by Latifah - spec website

A finished, production-ready spec website for **Braids by Latifah** (also known as Congolese Hair Design by Latifah), a private braiding suite at 101 Buford Rd, Suite 203-9, North Chesterfield, VA 23235. Built by Couture House Co. as a pitch to the owner; ready to launch once the items in `LAUNCH-NOTES.md` are confirmed.

The site unifies her two Instagram accounts, her Facebook page and her Booksy listing under one branded home, with the full Booksy menu, a filterable gallery, and clear text-to-book / Booksy calls to action.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: hero, trust strip, story, signature styles, Booksy reviews, how booking works, gallery teaser, social handles, quick facts, FAQ |
| `styles.html` | Complete Booksy service menu (32 services) with prices and appointment times, grouped by category |
| `gallery.html` | Filterable photo gallery with an accessible lightbox |
| `book.html` | Booksy and text-to-book options, house policies, Netlify style-inquiry form with photo upload |
| `404.html` | Branded not-found page |

## Stack

Static HTML, one stylesheet (`assets/css/site.css`), one vanilla script (`assets/js/site.js`), self-hosted fonts (Cormorant Garamond and Jost from Fontsource, in `assets/fonts/`). No build step, no frameworks, no third-party requests.

SEO / AEO: per-page titles and descriptions, canonical URLs, Open Graph and Twitter cards, JSON-LD (`HairSalon` with `hasOfferCatalog`, `WebSite`, `FAQPage`, `BreadcrumbList`), `sitemap.xml`, `robots.txt` (AI crawlers allowed) and `llms.txt`.

## Preview locally

Double-click `index.html`, or for the most accurate preview (fonts, form behaviour):

```bash
cd braids-by-latifah
python3 -m http.server 8080
# open http://localhost:8080
```

The inquiry form only submits once deployed on Netlify; locally it shows a friendly "please text" fallback message.

## Deploy on Netlify

1. Create a new site in Netlify and drag this folder onto the deploy area (or connect a Git repository containing it). No build command; publish directory is the folder root (`netlify.toml` sets this).
2. In **Forms**, confirm the `style-inquiry` form was detected, then add an email notification to the owner's address.
3. Add the custom domain and enable HTTPS.
4. `netlify.toml` already sets security headers (including a strict Content Security Policy), long-lived caching for `/assets/*`, short URL redirects and the custom 404.

If you edit the one inline script in the page `<head>` (`document.documentElement.classList.add('js')`), update its sha256 hash in the CSP in `netlify.toml`.

## Domain

Proposed: **braidsbylatifah.com** (canonical URLs, sitemap and Open Graph tags already use it). If a different domain is registered, find-and-replace `https://braidsbylatifah.com/` across the HTML files, `sitemap.xml`, `robots.txt` and `llms.txt`.

## Credits

Photos: the business's own public Instagram and Facebook posts (see `LAUNCH-NOTES.md`; owner approval required). Fonts: Cormorant Garamond and Jost, SIL Open Font License. Website concept by Couture House Co.
