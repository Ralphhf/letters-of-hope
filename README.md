# Letters of Hope — Prison Ministry (3 design drafts)

Three hosted **design drafts** for Julian Khater's prison-ministry website — the client picks one, then it gets rebuilt in **Wix Studio**.

- **Draft A "Correspondence"** (root `/`) — aged paper, indigo ink, amber; letter/envelope identity
- **Draft B "Clarity"** (`/v2/`) — light grey + white, calm blue accent, clean sans, centered hero
- **Draft C "Sanctuary"** (`/v3/`) — forest green + cream + gold, classical serif, dark header/hero
- **Chooser page:** `/drafts.html` — one link showing all three

All 27 pages verified for zero horizontal overflow at 390 px (mobile).

## Pages
- `index.html` — Home
- `our-story.html` — Our Story
- `mission.html` — Our Mission
- `write-to-prisoners.html` — Inmate listings (envelope-styled) + how-to-write guide
- `faq.html` — Mailing rules, inmate lookup, what you can send
- `blog.html` / `post.html` — Blog listing + sample article
- `contact.html` — Contact form + social
- `donate.html` — Monthly / one-time giving with anonymous option

## Design system
- **Concept:** "Correspondence" — the letter/envelope as identity
- **Palette:** aged paper `#EFEADD`, indigo ink `#1E1B33` / midnight `#262550`, candle amber `#E0A03B`
- **Type:** Fraunces (display), Mulish (body), Courier Prime (postal metadata)
- Shared header/footer injected via `assets/js/main.js`; all styles in `assets/css/styles.css`

## Placeholders to replace before launch
- **Brand name** "Letters of Hope" is a working placeholder
- **Our Story / founder photo** — Julian's real content
- **Inmate listings** — real, consented names / IDs / addresses (currently clearly-marked examples)
- **Contact email, location, social links, donation impact figures**

Forms are non-functional in this demo; real forms, blog CMS, and payments are handled natively in Wix.
