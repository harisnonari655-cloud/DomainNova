# DomainNova 🌐

**DomainNova** is a real free-domain and free-subdomain discovery platform. It helps developers, makers, students, and self-hosters discover genuinely free domain and subdomain options, check authoritative domain availability via ICANN RDAP and DNS-over-HTTPS (DoH), compare providers side-by-side, understand eligibility restrictions, and navigate to official claim repositories and dashboards.

---

## 🌟 Key Features

1. **100% Truthful Provider Directory**:
   - Curated catalog of authentic free community subdomains (`is-a.dev`, `js.org`, `openrepos.org`), public suffix registries (`eu.org`), dynamic DNS services (`duckdns.org`, `freedns.afraid.org`), and cloud platform hostnames (`github.io`, `vercel.app`, `workers.dev`, `netlify.app`, `onrender.com`).
   - Every provider record includes documentation citations, last verified dates, eligibility rules, and ownership models.
   - **No fake .com claims**: Transparent explanation of ICANN wholesale registry economics.

2. **Authoritative Domain Checker**:
   - RFC 1034 / RFC 1123 syntax validation with IDN handling.
   - Live query of the official ICANN Registration Data Access Protocol (RDAP) via `rdap.org`.
   - Real-time DNS record audit using Google Public DNS over HTTPS (DoH).
   - Clear distinction between active DNS traffic, registered RDAP status, and community namespace claims.

3. **High Thinking Architecture Advisor (Gemini 4 Argon)**:
   - Deep reasoning assistant powered by `gemini-4-argon` with `thinkingLevel: ThinkingLevel.HIGH`.
   - Solves intricate DNS architecture problems: CNAME flattening, Let's Encrypt ACME challenges, Cloudflare SSL handshake loops (Orange Cloud vs Grey Cloud), Home Lab DDNS, and GitHub Pages CNAME binding.

4. **Interactive Side-by-Side Comparison Matrix**:
   - Compare pricing models, DNS record support (A, AAAA, CNAME, TXT, MX), SSL certificate provisioning, renewal conditions, and registration workflows.

5. **Technical Knowledge Base**:
   - Written guides explaining DNS record fundamentals, setting up custom subdomains on GitHub Pages, Vercel edge configuration, Duck DNS ACME automation, and the history behind the Freenom (.tk, .ml) collapse.

6. **Privacy-First & Anti-Surveillance**:
   - Zero tracking cookies, zero analytics beacons.
   - Favorites and recent searches stored strictly in local browser storage with instant one-click wipe.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ or Node.js 20+
- npm or pnpm

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/your-username/domainnova.git
cd domainnova

# 2. Install dependencies
npm install

# 3. (Optional) Configure environment variables
cp .env.example .env

# 4. Start full-stack development server (runs Express + Vite middleware on Port 3000)
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build & Verification

```bash
# Run unit test suite
npm run test

# Type check
npm run lint

# Build production bundle
npm run build
```

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Start Command**: `npm run start`

---

## ☁️ Deployment Guide

### Deploying to Vercel (Works from Android Phone, Tablet, or PC)

DomainNova is designed to deploy to **Vercel** with **zero configuration** and **no mandatory paid API keys** required to run the core discovery and availability engine.

#### Option A: Deploy via GitHub (Recommended for Android / Mobile)
1. **From your Android phone or browser**, open [GitHub.com](https://github.com/new) and create a new repository called `domainnova`.
2. Upload the project files using the GitHub web interface:
   - Click **Add file** > **Upload files**.
   - Drag/select the files from your device storage and commit.
3. Open [Vercel.com](https://vercel.com) on your phone or desktop and tap **Add New...** > **Project**.
4. Select your `domainnova` repository.
5. Vercel automatically detects the Vite framework and uses the settings from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. (Optional) If you wish to enable the Gemini 4 Argon Architecture Advisor:
   - Expand **Environment Variables** in Vercel.
   - Add `GEMINI_API_KEY` with your Google AI Studio API key.
   - *Note: If omitted, the rest of the application (Directory, RDAP Domain Checker, Compare Matrix, Guides) continues to function 100% normally.*
7. Tap **Deploy**. Your app is live with a free `*.vercel.app` domain and automatic SSL!

#### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🔐 Environment Variables (`.env.example`)

| Variable | Required? | Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Optional | Used by `/api/ai/advisor` for Gemini 4 Argon High Thinking Advisor. If omitted, app operates normally with prompt previews and written guides. |
| `PORT` | Optional | Port for Express dev server (defaults to `3000`). |

---

## 🧪 Testing

DomainNova includes an automated unit test suite (`scripts/runTests.ts`) verifying:
- RFC 1034 / 1123 domain label and total length validation
- URL normalization, protocol stripping, port stripping, and trailing dot removal
- Special community suffix recognition (`.is-a.dev`, `.js.org`, `.github.io`)
- Multi-level ccTLDs (`.co.uk`, etc.)
- Provider catalog schema completeness, HTTPS links, and valid verification timestamps

Run tests via:
```bash
npm run test
```

---

## 📜 License
Apache-2.0 License. Open source and educational platform.
