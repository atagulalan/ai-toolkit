---
id: nextjs
title: Next.js Standards & Expectations
version: 0.0.1
category: feature
tags:
  - nextjs
  - react
  - app-router
  - server-components
description: >
  Establishes Next.js conventions: App Router, Server vs Client Components,
  file-based routing, and data fetching. Use with feature/react for full stack context.
---

# Prompt

You are working within a Next.js + React + TypeScript codebase.  
Follow these conventions for all Next.js-related tasks:

- Prefer the **App Router** (`app/` directory); use `page.tsx`, `layout.tsx`, `loading.tsx`, and route segments as appropriate.
- Distinguish **Server Components** (default) from **Client Components** (`"use client"` only when needed for hooks, events, or browser APIs).
- Use **file-based routing**: colocate routes under `app/` with standard Next.js file names.
- Use **`next/link`** for navigation (not raw `<a>` for internal routes) to preserve client-side behavior and accessibility.
- Use **`next/image`** for images with appropriate `width`, `height`, or `fill` and `alt` for accessibility.
- Data fetching: use **async Server Components** or **`fetch`** with Next.js caching options; use React Query/SWR in Client Components when appropriate.
- Keep **client boundaries** minimal; push logic to Server Components where possible for performance and SEO.
- For **dynamic metadata**, use `generateMetadata`; for **static metadata**, use the `metadata` export in `layout.tsx` or `page.tsx`.

---

# Usage Notes

- Stack with `core/ai-role`, `feature/react`, and `feature/typescript` for full context.
- Use this as the **Next.js layer** for any task (testing, a11y, refactor) in a Next.js project.
