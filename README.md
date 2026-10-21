# JADCS

JADCS exists to close the opportunity gap in STEM education by equipping curious, STEM-driven young minds with the knowledge, tools, and technology they need to thrive.

Too many students with the talent and drive to succeed in STEM are held back not by ability, but by access. Under-resourced schools, outdated equipment, and a lack of exposure to computer science leave entire communities on the sidelines of the technology revolution.

JADCS is working to change that through hands-on computer science instruction, mentorship, and direct donations of computers and resources to underfunded students.

## Our mission

We believe that access, not circumstance, should determine who gets to shape the future of technology. Every student deserves the chance to learn, create, and lead.

## What we do

### Computer Science Workshops

Hands-on lessons for students learning programming, robotics, and digital literacy.

### Laptop & Technology Donations

Collect, refurbish, and distribute devices to students who need reliable technology access.

### Mentorship

Pair students with volunteers who can support STEM learning and career exploration.

### School & Community Partnerships

Work with schools, libraries, and nonprofits to reach students directly in their communities.

## Goals for this year

- **5** founding members
- **100** student members
- **$1,000** initial fundraising goal

## Get involved

JADCS welcomes support from people and organizations who want to expand STEM access for students.

You can help by:

- Volunteering
- Donating a laptop or other technology
- Partnering with JADCS through a school, library, nonprofit, or community group
- Supporting student membership and workshops
- Donating to the laptop fund

## Donate

Support JADCS through the laptop donation fund:

https://givebutter.com/laptops-for-stem-students-y64rsa

## Contact

Have a laptop to donate, want to volunteer, or want to bring JADCS to your school?

Contact: jadcsfund@gmail.com

---

## About this website

The site is a single page built with [React](https://react.dev), [TypeScript](https://www.typescriptlang.org) and [Vite](https://vite.dev). It has no backend: `npm run build` produces static files in `dist/` that can be served from any static host.

### Running it locally

You need [Node.js](https://nodejs.org) 20.19+ or 22.12+ (required by Vite).

```sh
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

### Scripts

| Command                | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the local development server                  |
| `npm run build`        | Type-check and build the production site to `dist/` |
| `npm run preview`      | Serve the production build locally                  |
| `npm run lint`         | Check the code with ESLint                          |
| `npm run format`       | Format the code with Prettier                       |
| `npm run format:check` | Check formatting without changing anything          |

Please run `npm run lint`, `npm run format:check` and `npm run build` before committing.

### Deployment

`index.html` lists `https://jadcs.netlify.app/` as the site's address. To deploy on a static host, set the build command to `npm run build` and the publish directory to `dist`.

### Where things live

```
src/
├── App.tsx / App.css          page layout, hero, scroll reveals, shared effects
├── index.css                  colours, fonts, buttons and other site-wide styles
├── main.tsx                   entry point
├── assets/
│   ├── photos/                workshop photos used in the hero fan
│   ├── font/                  the Author and Sentient fonts
│   └── contours.svg           the topographic lines in the footer
└── components/
    ├── layout/                navbar and page background
    ├── effects/               doodles, handwritten notes, word-by-word headings
    └── sections/
        ├── Welcome/           hero title, intro and the photo fan
        ├── Mission/           sticky note, mission text and goals
        ├── Programs/          the four programs
        └── ContactFooter/     footer, contact links and the quote scrap
```

### Editing common content

- **Hero photos:** `src/components/sections/Welcome/PhotoFan.tsx`. Each photo has a `src`, a screen-reader description (`alt`) and a caption. Add new images to `src/assets/photos/`.
- **Footer quote:** `src/components/sections/ContactFooter/QuoteScrap.tsx`. **This is currently placeholder text** and should be replaced with a real quote before publishing.
- **Handwritten margin notes:** the `text` on each `<HandNote>` in `App.tsx`, `PhotoFan.tsx` and `MissionSection.tsx`.
- **Programs:** the `programs` list in `src/components/sections/Programs/ProgramsSection.tsx`.
- **Goals:** the `goals` list in `src/components/sections/Mission/MissionSection.tsx`.
- **Contact details and donation link:** `ContactFooter.tsx` and `Navbar.tsx`.

### Photos and privacy

Photos straight from a phone usually contain hidden data, including the GPS location where they were taken. Before adding a photo:

1. Resize it (around 1000px on the long side is plenty) and save it as JPEG.
2. Remove its metadata. For example, re-save it with an image editor that strips EXIF data.
3. Make sure you have permission to publish it. For photos of children, get a parent's consent.

The same applies to quotes: only publish a person's words and name with their permission.

### Notes for contributors

- **Reduced motion:** every animation respects the system "reduce motion" setting. Please keep it that way for new effects.
- **Safari:** Safari can't keep scroll-linked animations in sync with pinned (sticky) elements, so `main.tsx` turns those animations off in Safari and the site falls back to simple one-time reveals.
- **Text selection:** selected text is painted with a highlighter effect from [`@highlighters/core`](https://highlighte.rs).
- **Fonts:** the handwriting font is [Caveat](https://fonts.google.com/specimen/Caveat), bundled through `@fontsource-variable/caveat`, so the site doesn't load anything from Google.
