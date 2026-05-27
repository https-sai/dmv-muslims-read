# DMV Muslims Read

The first Muslim book club in the DMV — open to all curious minds and original thoughts.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Motion (formerly Framer Motion)
- Radix UI primitives
- Hosted on GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

## Deployment

This project deploys automatically to GitHub Pages via GitHub Actions on every push to `main`.

### Setup (one-time)

1. Push this repo to GitHub as `dmv-muslims-read`
2. Go to Settings > Pages
3. Set Source to **GitHub Actions**
4. Push to `main` — the workflow handles the rest

The site will be live at: `https://<your-username>.github.io/dmv-muslims-read/`

## Updating Content

- **Books**: Edit the `books` object in `src/App.jsx`
- **Interest form**: Replace the Google Form embed `src` URL in the Join section with your actual form
- **Map**: The Google Maps embed already points to Cube Coffee MD
- **Instagram**: Update the link in the footer/join section with your handle
