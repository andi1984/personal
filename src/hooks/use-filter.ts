"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

/**
 * Hook for managing post/note filtering via URL search params.
 * Uses ?topic= param which supports multiple values (?topic=react&topic=css).
 * Filter state is stored in the URL for shareability.
 */
export function useFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const topics = searchParams.getAll("topic");

  const clearFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("topic");
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.push(newUrl, { scroll: false });
  }, [searchParams, router, pathname]);

  return {
    topics,
    clearFilter,
    isFiltered: topics.length > 0,
  };
}

/**
 * Check if content matches any of the selected topics.
 * Matches against slug (folder path) and content title/description.
 */
export function matchesFilter(
  item: { slug?: string; title?: string; description?: string; content?: string },
  topics: string[],
): boolean {
  if (topics.length === 0) return true;

  const slug = (item.slug ?? "").toLowerCase();
  const title = (item.title ?? "").toLowerCase();
  const description = (item.description ?? "").toLowerCase();

  // Check if any topic matches
  return topics.some((topic) => {
    const searchTerm = topic.toLowerCase();

    // Check if the slug path contains the topic (folder-based categorization)
    if (slug.includes(searchTerm)) return true;

    // Check title and description for the topic
    if (title.includes(searchTerm)) return true;
    if (description.includes(searchTerm)) return true;

    return false;
  });
}
