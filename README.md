# Where can I go? ✈️

A visa requirements tracker for Nepal passport holders. Check entry requirements for 197 countries — and see how holding a US Green Card, Australian PR, UK ILR, EU/Schengen PR, New Zealand PR, or Japan PR changes your access.

**Live site:** https://theplacesitravel.github.io/

---

## Features

- **197 countries** with visa status, max stay, and e-visa availability
- **7 travel document profiles** — switch profiles to instantly see how requirements change
- **Filter** by region and visa status (Visa Free, On Arrival, E-Visa, eTA, Visa Required)
- **Country detail page** with all 7 profiles compared side by side
- **Verify links** to official embassy/immigration sources for every entry
- **Dark mode** and **PWA** — installable, works offline
- **Fully static** — no backend, hosted on GitHub Pages

## Profiles

| Profile | Description |
|---------|-------------|
| Nepal Passport Only | Base Nepal passport |
| + US Green Card | Nepal passport + US Permanent Resident Card |
| + Australia PR | Nepal passport + Australian Permanent Residency |
| + UK ILR | Nepal passport + UK Indefinite Leave to Remain |
| + EU/Schengen PR | Nepal passport + EU/Schengen Permanent Residency |
| + New Zealand PR | Nepal passport + New Zealand Permanent Residency |
| + Japan PR | Nepal passport + Japan Permanent Residency |

## Disclaimer

Visa requirements change frequently. Always verify with the official embassy or consulate of your destination country before booking travel. This app is for reference only.

## Local Development

```bash
npm install
npm run dev --workspace=frontend
```

Frontend runs at `http://localhost:5173`.

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via GitHub Actions.
