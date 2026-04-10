# GitHub Pages Deployment Guide

## Quick Deploy to GitHub Pages

### Step 1: Initialize Git Repository
```bash
cd game-2048
git init
git add .
git commit -m "feat: initial 2048 game implementation"
```

### Step 2: Push to GitHub
```bash
# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/game-2048.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to GitHub Pages

#### Option A: Using GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          publish_branch: gh-pages
```

2. Push this workflow file to GitHub
3. Go to your repository Settings → Pages
4. Set source to "GitHub Actions"

#### Option B: Manual Deploy

```bash
# Build the project
npm run build

# Deploy the out/ directory to gh-pages branch
cd out
git init
git add .
git commit -m "Deploy to GitHub Pages"
git branch -M gh-pages
git remote add origin https://github.com/YOUR_USERNAME/game-2048.git
git push -f origin gh-pages
```

### Step 4: Configure Custom Domain (Optional)

1. Add a `CNAME` file to `public/CNAME`:
```
yourdomain.com
```

2. Update your DNS settings with your domain registrar

### Step 5: Update Repository Settings

1. Go to Settings → Pages
2. Set source branch to `gh-pages`
3. Set folder to `/ (root)`
4. Enforce HTTPS (recommended)

---

## Troubleshooting

### Issue: 404 errors after deploy
**Solution:** Make sure `basePath` in `next.config.mjs` matches your repo name:
```js
basePath: '/game-2048',  // Should match repo name
```

### Issue: Assets not loading
**Solution:** Ensure `output: 'export'` is set in `next.config.mjs`

### Issue: Images broken
**Solution:** Use `unoptimized: true` in next.config.mjs (already configured)

---

## Local Testing

Before deploying, test the static build locally:

```bash
# Build the project
npm run build

# Serve the static files
npx serve out
```

Visit `http://localhost:3000` to verify everything works.

---

## Custom Domain Setup

If you want to use a custom domain:

1. Create `public/CNAME`:
```
play2048.yourdomain.com
```

2. Add DNS records:
   - **A records** pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME** for subdomain (if using one)

3. Go to Settings → Pages → Custom domain
4. Enter your domain and save
5. Check "Enforce HTTPS"

---

## Repository Description Template

**Description:** 🎮 A polished 2048 puzzle game built with Next.js and TypeScript. Play online!

**Topics:** `2048-game`, `puzzle`, `nextjs`, `typescript`, `tailwindcss`, `zustand`, `browser-game`, `github-pages`

---

**Enjoy playing! 🎮**
