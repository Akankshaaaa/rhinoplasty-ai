# Next.js App Router Migration Guide

This document explains the changes made to migrate our RhinoplastyAI application from Next.js Pages Router to App Router.

## Background

Next.js 13+ introduced a new App Router that uses React Server Components and has several advantages over the old Pages Router:

- Improved performance with Server Components
- More intuitive nested routing
- Enhanced data fetching capabilities
- Better static/dynamic rendering control
- Simplified layouts and templates

However, having both routing systems in the same project can cause conflicts, especially when both try to define the same route.

## Changes Made

1. **Removed Conflicting Files**
   - Deleted `src/pages/index.tsx` which was conflicting with `src/app/page.tsx`

2. **Updated App Router Files**
   - Modified `src/app/page.tsx` to include our rhinoplasty application logic
   - Added `'use client'` directive at the top because we're using React hooks
   - Updated `src/app/layout.tsx` to remove Geist font references (not installed)
   - Updated `src/app/globals.css` to include our Tailwind components

3. **Retained API Routes**
   - Kept the `src/pages/api` directory since API routes work differently in App Router

## Directory Structure

The updated application has the following structure:

```
src/
├── app/                  # App Router
│   ├── favicon.ico       # Favicon
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page (our rhinoplasty app)
├── components/           # Shared components
├── pages/                # Pages Router (for API routes only)
│   └── api/              # API endpoints
├── styles/               # Additional styles
└── utils/                # Utility functions
```

## Key Differences Between Pages Router and App Router

1. **File Naming**
   - Pages Router: `index.tsx` for routes
   - App Router: `page.tsx` for routes

2. **Layout Handling**
   - Pages Router: Uses `_app.tsx` and `_document.tsx`
   - App Router: Uses `layout.tsx` files

3. **Client vs Server Components**
   - Pages Router: All components are client components
   - App Router: Server components by default, need `'use client'` for client components

4. **Data Fetching**
   - Pages Router: Uses `getStaticProps`, `getServerSideProps`
   - App Router: Uses `fetch` with options (deduped by default)

5. **API Routes**
   - Pages Router: In `pages/api` directory
   - App Router: In `app/api` directory with Route Handlers

## Future Improvements

For a full migration to App Router, consider:

1. Moving API routes to the App Router format (using Route Handlers)
2. Leveraging Server Components for parts of the UI that don't need interactivity
3. Using the more efficient data fetching mechanisms
4. Taking advantage of parallel routes for complex layouts

## Resources

- [Next.js Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [App Router Documentation](https://nextjs.org/docs/app)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) 