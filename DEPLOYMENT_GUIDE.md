# BRIZA 24/7 - GitHub Pages Deployment Guide

This guide will help you deploy your BRIZA 24/7 Next.js website to GitHub Pages.

## ✅ Changes Made

### 1. Theme Changed to Light Mode
- Updated `globals.css` with light color scheme
- Changed background from dark (#021C24) to light (#F0F9FA)
- Updated all CSS variables for light theme
- Modified glass effects and gradients for light mode
- Updated layout.tsx to remove dark class

### 2. GitHub Pages Configuration
- Updated `next.config.ts` for static export (`output: "export"`)
- Added `images.unoptimized: true` for GitHub Pages compatibility
- Added `basePath` configuration for custom domain support
- Updated workflow to use stable `actions/deploy-pages@v4`

---

## 📋 Step-by-Step Deployment Instructions

### Step 1: Push Your Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Update to light theme and GitHub Pages config"

# Add your remote repository (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to main branch
git push -u origin main
```

### Step 2: Configure GitHub Repository Settings

1. **Go to your GitHub repository** on github.com

2. **Navigate to Settings → Pages**

3. **Configure Build and Deployment:**
   - Under "Source", select: **GitHub Actions**
   - This will use the workflow file at `.github/workflows/nextjs.yml`

4. **Save the settings**

### Step 3: Enable GitHub Actions (if needed)

1. Go to **Settings → Actions → General**

2. Under "Actions permissions", select:
   - ✅ **Allow all actions and reusable workflows**

3. Click **Save**

### Step 4: Trigger the Deployment

The deployment will automatically trigger when you push to the `main` branch.

To manually trigger:
1. Go to **Actions** tab in your repository
2. Select **"Deploy Next.js site to Pages"** workflow
3. Click **"Run workflow"**
4. Select the `main` branch
5. Click **"Run workflow"**

### Step 5: Monitor the Deployment

1. Go to **Actions** tab
2. Click on the running workflow
3. Watch the progress:
   - ✅ Checkout
   - ✅ Setup Node
   - ✅ Install dependencies
   - ✅ Build with Next.js
   - ✅ Upload artifact
   - ✅ Deploy to GitHub Pages

### Step 6: Access Your Deployed Site

Once deployment is complete:
1. Go to **Settings → Pages**
2. Your site URL will be displayed at the top
3. Format: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## 🔧 Optional: Custom Domain Configuration

If you want to use a custom domain:

### 1. Add CNAME File
Create a file named `CNAME` in the `public/` directory:

```bash
echo "yourdomain.com" > public/CNAME
```

### 2. Update next.config.ts (Optional)
For custom domain with subpath:

```typescript
basePath: "/your-subpath",
```

### 3. Configure DNS
In your domain provider's DNS settings:
- Add CNAME record pointing to `YOUR_USERNAME.github.io`

### 4. Update GitHub Pages Settings
1. Go to **Settings → Pages**
2. Under "Custom domain", enter your domain
3. Click **Save**
4. Check "Enforce HTTPS" after DNS propagates

---

## 🚨 Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build
# or
bun run build
```

### Images Not Loading
- Ensure images are in the `public/` folder
- Use absolute paths: `/image.png` not `./image.png`
- The config has `unoptimized: true` for static export

### 404 Errors
- Make sure you're accessing the correct URL
- Check that `basePath` is configured if using subpath
- Verify all routes are static (no server-side rendering)

### Workflow Fails
- Check **Actions** tab for error details
- Ensure Node version is compatible (set to 20)
- Verify all dependencies install correctly

---

## 📝 Important Notes

1. **Static Export Only**: GitHub Pages only supports static sites. All pages must be pre-rendered at build time.

2. **No API Routes**: Server-side API routes won't work. Use client-side API calls or external services.

3. **Image Optimization**: Disabled for GitHub Pages compatibility (`images.unoptimized: true`).

4. **Build Output**: Files are exported to the `out/` directory and deployed from there.

5. **Automatic Deployment**: Every push to `main` branch triggers automatic deployment.

---

## 🎨 Light Theme Features

Your site now features:
- **Light ocean-inspired background** (#F0F9FA)
- **Dark teal text** (#021C24) for excellent readability
- **Glass morphism effects** adapted for light mode
- **Smooth gradients** with aqua and teal accents
- **Updated scrollbar** styling for light theme
- **Mobile-friendly** responsive design

---

## 📞 Support

If you encounter issues:
1. Check the GitHub Actions logs for detailed error messages
2. Test the build locally: `npm run build`
3. Verify your repository settings match the configuration above
4. Ensure all files are committed and pushed to the `main` branch

---

**Last Updated**: $(date)
**Framework**: Next.js 16
**Deployment Target**: GitHub Pages
