import { Items } from "./types";

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
 * Returns topics sorted alphabetically with their counts.
 */
export function getTopicsFromPosts(
  posts: Items[],
): { topic: string; count: number }[] {
  const topicCounts = new Map<string, number>();

  for (const post of posts) {
    const slug = typeof post.slug === "string" ? post.slug : "";
    const topic = getTopicFromSlug(slug);

    if (topic) {
      topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
    }
  }

  // Convert to array and sort alphabetically
  return Array.from(topicCounts.entries())
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => a.topic.localeCompare(b.topic));
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
