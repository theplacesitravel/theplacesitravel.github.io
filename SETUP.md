# Visa Tracker — Setup Guide

## Prerequisites
- Node.js LTS (v20+) — download from https://nodejs.org
- Windows Build Tools (for better-sqlite3 native module):
  ```
  npm install --global windows-build-tools
  ```
  Or install "Visual Studio Build Tools" with "Desktop development with C++"

## Install & Run

### 1. Install all dependencies
```bash
cd visa-tracker
npm install
```

### 2. Start development servers
```bash
npm run dev
```

This starts:
- **Backend API** on http://localhost:3001
- **Frontend** on http://localhost:5173

Open http://localhost:5173 in your browser.

## Project Structure

```
visa-tracker/
├── backend/           Express API + SQLite
│   └── src/
│       ├── data/visa-requirements.json   ← Visa data (edit to update)
│       └── ...
└── frontend/          React + Vite PWA
    └── src/
        └── ...
```

## Updating Visa Data

Edit `backend/src/data/visa-requirements.json` directly.
The backend loads this file at startup — restart the backend after changes.

Status values: `visa_free`, `visa_on_arrival`, `e_visa`, `eta_required`, `visa_required`, `conditional`, `resident`

## Building for Production

```bash
npm run build --workspace=frontend
npm run start --workspace=backend
```
