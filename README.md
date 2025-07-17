# iZyane Website - Frontend-Only Deployment Guide

## Overview
The iZyane website has been converted to a frontend-only application for easier deployment and maintenance. This guide covers setup, configuration, and deployment options.

## Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview  # Preview the production build locally
```

## Contact Form Setup

The contact form uses EmailJS for client-side email sending. To enable it:

1. **Sign up at [EmailJS](https://emailjs.com)**
2. **Create a service** (Gmail, Outlook, etc.)
3. **Create an email template** with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{company}}` - Sender's company
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content
   - `{{to_name}}` - Recipient name (iZyane Team)

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your EmailJS credentials
   ```

5. **Example .env file:**
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_USER_ID=your_public_key
   ```

## Deployment Options

### Option 1: Netlify (Recommended)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist/public`
4. Add environment variables in Netlify dashboard
5. Enable form handling for contact form fallback

### Option 2: Vercel
1. Connect your GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist/public`
5. Add environment variables in Vercel dashboard

### Option 3: GitHub Pages
1. Build locally: `npm run build`
2. Deploy the `dist/public` folder
3. Or use GitHub Actions for automatic deployment

### Option 4: Cloudflare Pages
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Build output directory: `dist/public`
4. Add environment variables in Cloudflare dashboard

## Content Management

### Job Listings
Edit `client/public/data/jobs.json` to add/remove job postings.

### Partner Information
Edit `client/public/data/partners.json` to update partner details.

### Static Content
All other content is in React components under `client/src/components/`.

## Features Included

✅ **Responsive Design** - Works on all devices
✅ **Dark/Light Theme** - Automatic theme switching
✅ **Contact Form** - EmailJS integration
✅ **Job Listings** - JSON-based job management
✅ **SEO Optimized** - Proper meta tags and structure
✅ **Fast Loading** - Optimized static assets
✅ **Accessible** - WCAG compliant components

## File Structure
```
client/
├── public/
│   ├── data/          # JSON data files
│   └── logo.png       # Company logo
├── src/
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utility functions
└── index.html         # Main HTML file
```

## Performance Optimizations

- Static file serving from CDN
- Automatic code splitting
- Image optimization
- Minified CSS and JavaScript
- Browser caching enabled

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Troubleshooting

### Contact Form Not Working
1. Check EmailJS configuration
2. Verify environment variables
3. Check browser console for errors
4. Test EmailJS service independently

### Build Errors
1. Run `npm run check` for TypeScript errors
2. Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
3. Check for missing dependencies

### Deployment Issues
1. Verify build output in `dist/public`
2. Check environment variables in deployment platform
3. Ensure correct build commands and output directory
