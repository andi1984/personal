# BackToHome Component

A reusable navigation component that provides a consistent "Back to Home" link across the application.

## Usage

```tsx
import BackToHome from "@/components/back-button";

// Basic usage
<BackToHome />

// With custom className
<BackToHome className="mt-8" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `""` | Optional additional CSS classes to apply |

## Features

- Consistent styling across all pages
- Accessible with proper ARIA labels
- Dark mode support
- Hover state transitions
- Fully testable

## Testing

Tests are located in `index.test.tsx`. To run the tests (after setting up a testing framework):

```bash
# Install testing dependencies first:
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom

# Run tests
npm test
```

## Used In

- `/posts/[...slug]` - Blog post detail pages
- `/notes/[...slug]` - Note detail pages
- `/about` - About page
