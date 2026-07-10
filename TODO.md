# TODO

## 1. Add a “What We Do” section

Create a section that explains JADCS programs in concrete terms. Suggested cards:

- **Computer Science Workshops** — Hands-on lessons for students learning programming, robotics, or digital literacy.
- **Laptop & Technology Donations** — Collect, refurbish, and distribute devices to students who need them.
- **Mentorship** — Pair students with volunteers who can support STEM learning and career exploration.
- **School & Community Partnerships** — Work with schools, libraries, or nonprofits to reach students directly.

## 2. Add a clear “Get Involved” section

Give visitors action paths beyond donating money. Suggested options:

- Volunteer
- Donate a laptop
- Partner with JADCS
- Join as a student member
- Contact the team

Each option can initially link to an email address, interest form, or placeholder contact method.

## 3. Add a contact section or footer

Add a basic footer/contact area with:

- Email address
- Social links, if available
- Donation link
- Short organization description
- Copyright line

Suggested copy:

> Have a laptop to donate, want to volunteer, or want to bring JADCS to your school? Contact us at `...`.

## 5. Add a “Why It Matters” statistics section

Add 2–3 concise stats about the digital divide, STEM access, or computer science education.

Possible topics:

- Students without reliable access to computers at home
- Unequal access to computer science education
- Benefits of early STEM exposure
- How technology access affects academic and career opportunity

## 6. Add a founding team section

Create a section that introduces the people behind JADCS.

Suggested fields:

- Name
- Role
- Short one-line bio
- Optional photo or avatar

This will help make the organization feel more credible and personal.

## 7. Add an FAQ section

Answer common visitor questions, such as:

- Who can receive a donated laptop?
- How are donations used?
- Can I donate used devices?
- Do you accept volunteers?
- What areas do you serve?
- Are donations tax-deductible? Only include this if confirmed true.

## 8. Add more navigation links

Bring back and expand the commented-out navbar links once the relevant sections exist.

Suggested nav links:

- Mission
- Programs
- Goals
- Get Involved
- Donate
- Contact

## 9. Add a stronger CTA near the hero

Add a second primary action near the existing `Learn More` button.

Suggested CTA pair:

- **Learn More**
- **Donate** or **Get Involved**

This gives already-convinced visitors an immediate action path.

## 11. Improve SEO and page metadata

Update `index.html`, which currently uses the default title.

Suggested title:

```html
<title>JADCS | Expanding Access to STEM Education</title>
```

Suggested description:

```html
<meta
  name="description"
  content="JADCS helps close the STEM opportunity gap through computer science instruction, mentorship, and technology donations."
/>
```

Also consider adding Open Graph tags for better link previews on social platforms.

## 12. Replace the template README

Replace the default Vite README with project-specific documentation.

Suggested sections:

- What JADCS is
- How to run the site locally
- How to build the site
- Deployment notes
- Contribution notes

## 13. Improve accessibility

Make the site easier to use for keyboard, screen reader, and motion-sensitive users.

Recommended improvements:

- Respect `prefers-reduced-motion` for animated backgrounds and hover effects.
- Restore or replace visible focus states for buttons and links.
- Add React `key` props to mapped elements.
- Use real links (`<a href="...">`) for navigation and donation actions instead of `window.location.href` where appropriate.
- Add appropriate `alt` text or empty `alt=""` attributes for decorative icons/images.
