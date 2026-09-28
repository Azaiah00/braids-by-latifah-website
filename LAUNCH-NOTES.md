# Launch notes - Braids by Latifah

Everything below must be confirmed with Latifah before the site goes live.

## Facts to confirm

1. **Hours**: the site shows Monday to Saturday, 8 AM to 7 PM, closed Sunday (from lead notes and Booksy "Today 08:00 AM - 07:00 PM"; her Instagram says "OFF SUNDAYS"). Confirm the same hours every day, including Saturday.
2. **Years of experience**: the site says **13 years** (current Instagram bio). Her Booksy "About" still says **12 Years of experience**, so ask her to update Booksy, or change the site.
3. **Deposit**: the site says a deposit is required but does not give an amount. Confirm the amount and the cancellation / no-show / late policy (Booksy mentions a "Payment & Cancellation Policy" without details). Once confirmed, add them to `book.html` (Good to know) and the FAQ.
4. **"Arrive prepped"**: the site asks clients to arrive with hair prepared "as discussed when you book". Get her exact prep instructions (washed, blow-dried, detangled, no product?) and add them.
5. **Hair provided**: shown as "on most styles", with exceptions taken from the Booksy notes (French curls, springy bohemian twists and Bobby faux locs: hair not included; boho box braids and boho bob: client provides the curly hair). Confirm.
6. **Prices and durations**: all 32 services, prices and times come from her Booksy page (checked 27 Sep 2026). A "+" / "from" means Booksy shows a starting price. Recheck before launch.
7. **Ratings**: the site shows Booksy 5.0 from 35 reviews, and "Also rated 5.0 on Google". Schema `aggregateRating` (home page only) uses **Google 5.0 from 13 reviews**, as the brief asked. Confirm both counts at launch and update them over time.
8. **Review quotes**: four short quotes from verified Booksy reviews (Chrystal, Senegalese twist; Crystal, boho bob; Teresa, men's cornrows; Melissa, feed-ins). Check the wording against Booksy word for word, and get Latifah's OK to show first names.
9. **Business names**: "Braids by Latifah" is the main brand; "Congolese Hair Design by Latifah" is shown as the same business. Confirm she's happy with that.
10. **Address display**: shown as "101 Buford Rd, Suite 203-9, North Chesterfield, VA 23235 (Bon Air)". Confirm the suite number and whether clients need entry or parking instructions (none are claimed on the site).
11. **Walk-ins**: the site does not say whether she takes walk-ins. Confirm, and add it to the FAQ if useful.
12. **Email**: her business card graphic shows a Gmail address. It is **not** published on the site. Ask whether she wants a public email (then add it to the footer, `llms.txt` and schema).
13. **Services named in captions but not on Booksy**: mohawk styles with color, soft dreads ("Now Booking" post; "Soft dread" is on Booksy), 360 crochet. Only Booksy items have prices on the site; the mohawk appears in the gallery only.
14. **Service descriptions**: the one-line style descriptions on the home page are our copy. Get her approval.
15. **priceRange** in schema is set to "$15-$250", based on the Booksy menu.

## Photos and credits

- All photos come from the business's own public Instagram (@braidsbylatifah804) and Facebook (Congolese Hair Design by Latifah) posts. Latifah must **approve and license** their use, and confirm her clients agreed to appear.
- On purpose, we left out every photo centered on a child's face, and photos centered on clients' faces. Kids' styles appear only as back-of-head shots (`kids-box-braids.webp`, `layered-cornrows.webp`).
- Several photos show clients from the side or back. Confirm she has permission for each: `small-knotless-braids`, `mohawk-braids-blue-purple`, `braids-on-short-hair`, `mens-cornrows`, `two-strand-twists`, `leave-out-weave`.
- Source photos are phone captures. For launch, ask her for higher-resolution originals, or book a short photo session. The hero (`boho-french-curl-braids.webp`) and the suite photo would gain the most.
- The hero is her "Boho French Curl Braids" post, used as the boho hero. Swap it if she has a sharper finished boho knotless photo.

## Items to swap or set up at launch

- Register **braidsbylatifah.com** (proposed). All canonical, Open Graph and sitemap URLs already use it.
- Deploy on Netlify. The **style inquiry form** (`book.html`, name, phone, style, size, length, date, photo upload) only works once deployed on Netlify: turn on form notifications to her email or phone. File uploads count toward Netlify's form storage limits.
- Once the site is live, add the website link to both Instagram bios, the Facebook page, Booksy and Google Business Profile, so all her profiles point to one home.
- Optional: embed a Google Map (the CSP would need to allow `frame-src https://www.google.com`) and add real geo coordinates to the schema.
- Optional: if she has a TikTok (a Booksy review mentions finding her on TikTok), add the link to the footer, `sameAs` and `llms.txt`.

## Proposed domain

**braidsbylatifah.com**
