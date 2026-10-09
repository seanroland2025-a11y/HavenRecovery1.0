# Haven: Production Deployment & Custom Domain Guide

This guide details how to launch **Haven: Trauma Recovery Sanctuary** on a permanent custom domain (e.g., `havenrecovery.org` or `app.havenrecovery.org`) and configure hosting past beta testing.

---

## 1. Quick Deploy Options

### Option A: Vercel (Recommended for instant global CDN & auto-SSL)
1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel will automatically detect `vite` and the included `vercel.json`.
4. Click **Deploy**. Your app will be live in under 60 seconds with an automatic SSL certificate.

### Option B: Netlify
1. Log in to [netlify.com](https://netlify.com) and click **"Add new site" > "Import an existing project"**.
2. Select your repository. Netlify reads the pre-configured `netlify.toml` automatically.
3. Click **Deploy Site**.

### Option C: Google Cloud Run (Containerized)
1. Ensure the Google Cloud SDK (`gcloud`) is installed.
2. Run the deployment command from the repository root:
   ```bash
   gcloud run deploy haven-recovery \
     --source . \
     --region us-central1 \
     --allow-unauthenticated \
     --port 8080
   ```
3. Map your custom domain in the Google Cloud Console under **Cloud Run > Manage Custom Domains**.

---

## 2. Custom Domain & DNS Setup

To link your purchased domain (from Namecheap, GoDaddy, Google Domains / Squarespace, Cloudflare, etc.):

### Root Domain (`havenrecovery.org`)
Add these DNS records in your domain registrar's DNS manager:

| Type | Host / Name | Value / Target | Notes |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` (if using Vercel) or `75.2.60.5` (if using Netlify) | Directs root traffic |
| **CNAME** | `www` | `cname.vercel-dns.com.` or your Netlify site URL | Directs www traffic |

### Subdomain (`app.havenrecovery.org`)
| Type | Host / Name | Value / Target |
| :--- | :--- | :--- |
| **CNAME** | `app` | `cname.vercel-dns.com.` or your Cloud Run service URL |

---

## 3. PWA & Mobile Home Screen Verification
Haven includes a configured Web App Manifest (`/public/manifest.json`) and Service Worker (`/public/sw.js`).
* **iOS Users:** In Safari, tap the **Share** button > **"Add to Home Screen"**.
* **Android / Desktop Users:** Click the in-app **"Install Haven App"** button or select **"Install Haven"** from the browser address bar.
* Once installed, Haven operates as an independent, distraction-free app with offline recovery tool access and quick exit camouflage.
