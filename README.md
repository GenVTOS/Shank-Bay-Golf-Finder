# Boys' Golf Trip 2026 — Brisbane Edition

Interactive planner for the boys' golf trip. Fifteen destinations within 3 hours of Brisbane, sortable, filterable, with a shortlist feature.

## Quick deploy options

### Option A — Drag-and-drop to Vercel (easiest, ~2 min)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Browse all templates"** → cancel out, then on the dashboard hit **"Add New... → Project"**
3. Choose **"Import Git Repository"** OR scroll down and use the upload box
4. Drag this entire folder onto the upload area
5. Vercel will auto-detect Next.js and deploy. You'll get a URL like `boys-golf-trip-2026.vercel.app` to share with the boys.

### Option B — Push to GitHub, connect to Vercel (best for updates)

```bash
cd boys-golf-trip-2026
git init
git add .
git commit -m "Initial golf trip planner"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/boys-golf-trip-2026.git
git push -u origin main
```

Then on Vercel:
1. **"Add New... → Project"**
2. Import from GitHub, pick the repo
3. Click **Deploy**. Done.

Any time you push to `main`, Vercel auto-deploys.

### Option C — Run locally first

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Project structure

```
.
├── app/
│   ├── globals.css       # Tailwind directives + scrollbar hide
│   ├── layout.jsx        # Root layout, font loading
│   └── page.jsx          # The planner (all the destination data + UI)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── tsconfig.json
```

## Updating destinations

All the destination data lives in the `DESTINATIONS` array at the top of `app/page.jsx`. Edit, save, redeploy. That's it.

## Custom domain (optional)

Once deployed on Vercel, go to **Project Settings → Domains** and add a custom domain if you've got one (e.g. `golftrip.yourdomain.com`).
