# Love Date Project 💝🌸

A pink-themed, love-filled apology project that asks someone special out on a
date — Sundar Nursery's Teej festival event, then lunch at Karnataka Food Center.

## Features
- 💌 Typewriter apology letter
- 🌸 Floating hearts + falling flower petals (canvas animations)
- 😤 "Are you still angry at me?" with a "wrong option" loop on Yes
- 🥺 Apology message that reveals the date plan
- 🗓️ Date itinerary: Sundar Nursery Teej festival + Karnataka Food Center lunch
- 🎉 Heart-confetti burst on the plan reveal

## Run locally
```bash
# any static server works
npx serve .
# or
python3 -m http.server 8080
```
Then open http://localhost:8080

## Deploy to Vercel
### Option A: CLI (fastest)
```bash
npm i -g vercel
cd teej-love-project
vercel
# then confirm "yes" for deploy, follow the prompts
vercel --prod
```

### Option B: Dashboard / Git
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Vercel auto-detects it as a static site. Framework preset: **Other**.
4. Click **Deploy**. Done.

## Customize
Edit `script.js`:
- `APOLOGY_TEXT` — the apology message

Edit `index.html`:
- The date itinerary (Sundar Nursery + Karnataka Food Center)
- Names, emojis, and wording
# sorry-cutie
