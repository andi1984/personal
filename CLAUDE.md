# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 personal website/blog built with React 19, TypeScript, and Tailwind CSS. It serves blog posts and quick notes, both written in Markdown, with features like dark mode, webmentions, RSS feeds, and YouTube video highlights.

**Package Manager**: npm

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint

# Format code (using Prettier)
# Note: Project uses 2 spaces for indentation, no tabs
```

## Architecture

### Content System

The site uses a **folder-based content structure** where each piece of content lives in its own folder with an `index.md` file:

- **Posts** (long-form articles): `src/_posts/[slug]/index.md` or `src/_posts/[category]/[slug]/index.md`
- **Notes** (short-form content): `src/_notes/[slug]/index.md` or `src/_notes/[category]/[slug]/index.md`

Content can be nested in subdirectories. The slug generation is recursive and automatically discovers all folders containing `index.md` files.

**Key functions**:
- `getPostSlugs()` / `getNoteSlugs()` in `src/lib/get_post_slugs.ts`: Recursively generates slugs from folder structure
- `findMarkdownFile(slug, type)` in `src/lib/find_md_file.ts`: Locates the `index.md` file for a given slug
- `getPostBySlug(slug, fields, type)` in `src/lib/get_post_by_slug.ts`: Parses frontmatter and content using gray-matter
- `getAllPosts(fields, type)` in `src/lib/get_all_posts.ts`: Gets all posts/notes sorted by date

### Markdown Processing

Markdown is converted to HTML using a unified/remark/rehype pipeline (`src/lib/markdown_to_html.ts`):
1. Parse markdown with `remark-parse`
2. Convert to HTML with `remark-rehype`
3. Add heading IDs with `rehype-slug`
4. Add heading anchor links with `rehype-autolink-headings`
5. Syntax highlighting with `rehype-highlight`
6. External links get `rel="nofollow"` and `target="_blank"`

### Routing Structure

- `/` - Homepage with tabs for Articles, Notes, and Community
- `/posts/[...slug]` - Blog post detail pages (catch-all route for nested paths)
- `/notes/[...slug]` - Note detail pages (catch-all route for nested paths)
- `/about` - About page
- `/impressum` - Imprint/Privacy page
- `/rss.xml` - RSS feed (combined posts + notes)
- `/sitemap.xml` - Sitemap
- `/api/follower` - API endpoint for social media follower count (cached 1 hour)

Both posts and notes use catch-all routes (`[...slug]`) to support nested paths like `css-in-js/the-ugly-part`.

### Dark Mode Implementation

Dark mode uses a custom implementation with localStorage and system preference detection:
- Theme sync script runs before hydration in `src/app/layout.tsx` (prevents flash)
- Adds `dark` or `light` class to `<html>` element
- Respects `prefers-color-scheme` as fallback
- Toggle component in `src/components/dark-mode-toggle.tsx`

### Component Organization

- `src/components/ui/` - shadcn/ui base components (avatar, badge, button, card, table)
- `src/components/` - Custom feature components
  - `masthead/` - Site header with navigation and dark mode toggle
  - `list/` - Post/note list rendering
  - `card/` - Post card component
  - `metadata/` - Date and Dev.to link display
  - `reading-pane.tsx` - Content wrapper for detail pages
  - `detail-page-shell.tsx` - Shell for blog/note detail pages
  - `back-button/` - Navigation back button
  - `webmentions.tsx/` - Webmentions display
  - `video-highlights.tsx` - YouTube video showcase
  - `influence/` - Social media follower count display

### Special Features

**YouTube Integration**: Posts can have YouTube metadata in frontmatter (videoId, views) which is displayed on the homepage as "video highlights" sorted by views.

**Webmentions**: Site supports webmentions via webmention.io (see `<link rel="webmention">` in layout)

**Fediverse**: Fediverse creator metadata in layout (`@andi1984@toot.cafe`)

## Path Aliases

The project uses `@/*` to reference `./src/*` (configured in `tsconfig.json`)

## Build & Runtime

- **Node.js**: Requires version 22+ (see `engines` in package.json and `.nvmrc`)
- **React Strict Mode**: Disabled due to react-spring compatibility issue
- **Remote Images**: Configured to allow YouTube thumbnails (`i.ytimg.com/vi/*/*`)
