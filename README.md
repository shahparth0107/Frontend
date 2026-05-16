# Mangalam HDPE Pipes — Frontend Assignment

A pixel-perfect, fully responsive marketing webpage built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no libraries.

Completed as part of a frontend web development assignment based on a provided Figma design spec.

---

## Features Implemented

### Sticky Header
- A compact header strip appears **above the primary nav** when the user scrolls past the first fold
- Smoothly disappears on scroll back up using `IntersectionObserver`
- CSS transitions ensure a polished reveal/hide animation

### Image Carousel with Zoom
- Thumbnail-driven carousel on the hero section
- Previous / Next arrow navigation
- **Hover-to-zoom**: hovering over the main carousel image displays a magnified preview overlay
- Smooth CSS transitions on all interactions

### Responsive Design
- Fully responsive across **desktop, tablet, and mobile**
- Mobile hamburger navigation with slide-in menu
- Flexbox and CSS Grid used throughout for layout
- Breakpoints handled entirely in CSS — no JS for layout

### Additional Sections
- Hero section with product badges and CTA buttons
- Technical specifications table
- Feature cards grid
- Tabbed manufacturing process (accessible tab panel pattern)
- FAQ with native `<details>` / `<summary>` elements
- Application cards, testimonials, portfolio grid
- Resources & downloads list
- Final CTA with contact form
- Footer with multi-column layout

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic structure (`<section>`, `<article>`, `<figure>`, `<nav>`) |
| CSS3 | Flexbox, Grid, custom properties, transitions, animations |
| Vanilla JavaScript | Sticky header logic, carousel, zoom, mobile nav, tab panels |
| Google Fonts | Urbanist (headings) + Inter (body) via stylesheet only |

---

## Project Structure

```
Frontend/
├── index.html        # Main HTML — all sections, semantic markup
├── styles.css        # All styling — layout, components, responsive breakpoints
├── script.js         # Sticky header, carousel, zoom, tab panels, mobile nav
└── assets/           # Images, SVGs, logos, icons
```

---

## Assignment Requirements Checklist

- [x] Vanilla HTML, CSS, JS — no frameworks or libraries
- [x] Pixel-accurate Figma implementation
- [x] Fully responsive (desktop / tablet / mobile)
- [x] Sticky header — appears on scroll down, hides on scroll up
- [x] Image carousel with hover zoom
- [x] Smooth transitions and animations
- [x] Semantic HTML5 elements
- [x] Modern CSS practices (Flexbox / Grid)
- [x] Clean, commented code
- [x] Cross-browser compatible

---

## Setup

No build tools required. Just clone and open:

```bash
git clone https://github.com/shahparth0107/Frontend.git
cd Frontend
# Open index.html in your browser
```

Or use the VS Code Live Server extension for a smoother dev experience.

---

## Author

**Parth Shah**
[GitHub](https://github.com/shahparth0107)
