import { Items } from "./types";

/**
 * Featured topics that should always appear in the filter list.
 * These match the hero section links (React, TypeScript, CSS).
 */
export const FEATURED_TOPICS = ["react", "typescript", "css"] as const;

/**
 * Extracts the primary topic from a post/note slug.
 * Topics are derived from the folder structure (first path segment).
 * E.g., "react/synthetic-blur-bubbles" -> "react"
 */
function getTopicFromSlug(slug: string): string | null {
  if (!slug) return null;

  // If there's a path separator, the first segment is the topic
  if (slug.includes("/")) {
    return slug.split("/")[0].toLowerCase();
  }

  // For slugs without path (e.g., "css-container-queries"),
  // try to extract topic from prefix patterns
  const prefixMatch = slug.match(/^(css|react|typescript|javascript|html|node|vue|angular|svelte|tailwind|nextjs|neovim|vim|go|htmx|youtube|stream|blog|personal|homeoffice|browsers|vscode|mistakes|state-of-surveys)/i);
  if (prefixMatch) {
    return prefixMatch[1].toLowerCase();
  }

  return null;
}

/**
 * Extracts all unique topics from a collection of posts/notes.
 * Always includes featured topics (React, TypeScript, CSS) even if count is 0.
 * Returns topics sorted with featured topics first, then alphabetically.
 */
export function getTopicsFromPosts(
  posts: Items[],
): { topic: string; count: number }[] {
  const topicCounts = new Map<string, number>();

  // Initialize featured topics with 0 count
  for (const topic of FEATURED_TOPICS) {
    topicCounts.set(topic, 0);
  }

  for (const post of posts) {
    const slug = typeof post.slug === "string" ? post.slug : "";
    const topic = getTopicFromSlug(slug);

    if (topic) {
      topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
    }
  }

  // Convert to array
  const topics = Array.from(topicCounts.entries()).map(([topic, count]) => ({
    topic,
    count,
  }));

  // Sort: featured topics first (in order), then others alphabetically
  return topics.sort((a, b) => {
    const aFeatured = FEATURED_TOPICS.indexOf(a.topic as (typeof FEATURED_TOPICS)[number]);
    const bFeatured = FEATURED_TOPICS.indexOf(b.topic as (typeof FEATURED_TOPICS)[number]);

    // Both are featured - sort by featured order
    if (aFeatured !== -1 && bFeatured !== -1) {
      return aFeatured - bFeatured;
    }
    // Only a is featured - a comes first
    if (aFeatured !== -1) return -1;
    // Only b is featured - b comes first
    if (bFeatured !== -1) return 1;
    // Neither featured - sort alphabetically
    return a.topic.localeCompare(b.topic);
  });
}

/**
 * Format topic name for display (capitalize first letter).
 */
export function formatTopicName(topic: string): string {
  // Special cases for acronyms
  const upperCases: Record<string, string> = {
    css: "CSS",
    html: "HTML",
    htmx: "HTMX",
    nextjs: "Next.js",
    vscode: "VS Code",
    youtube: "YouTube",
  };

  if (upperCases[topic]) {
    return upperCases[topic];
  }

  return topic.charAt(0).toUpperCase() + topic.slice(1);
}
