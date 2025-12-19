"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export type FilterTerm = "react" | "typescript" | "css" | null;

export const FILTER_TERMS = ["react", "typescript", "css"] as const;

/**
 * Hook for managing post/note filtering via URL search params.
 * Supports both legacy single filter (?filter=react) and multi-topic (?topic=react&topic=css).
 * Filter state is stored in the URL for shareability.
 */
export function useFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Support legacy single filter and new multi-topic filter
  const legacyFilter = searchParams.get("filter") as FilterTerm;
  const topics = searchParams.getAll("topic");

  // Combine legacy filter with topics for filtering
  const activeFilters = legacyFilter
    ? [legacyFilter, ...topics]
    : topics;

  const setFilter = useCallback(
    (term: FilterTerm) => {
      const params = new URLSearchParams(searchParams.toString());
      // Clear both filter types when setting legacy filter
      params.delete("topic");
      if (term) {
        params.set("filter", term);
      } else {
        params.delete("filter");
      }
      const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const clearFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("filter");
    params.delete("topic");
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.push(newUrl, { scroll: false });
  }, [searchParams, router, pathname, pathname]);

  return {
    filter: legacyFilter,
    topics,
    activeFilters,
    setFilter,
    clearFilter,
    isFiltered: activeFilters.length > 0,
  };
}

/**
 * Check if content matches any of the active filters.
 * Matches against slug (folder path) and content title/description.
 */
export function matchesFilter(
  item: { slug?: string; title?: string; description?: string; content?: string },
  filters: string[],
): boolean {
  if (filters.length === 0) return true;

  const slug = (item.slug ?? "").toLowerCase();
  const title = (item.title ?? "").toLowerCase();
  const description = (item.description ?? "").toLowerCase();

  // Check if any filter matches
  return filters.some((filter) => {
    const searchTerm = filter.toLowerCase();

    // Check if the slug path contains the filter term (folder-based categorization)
    if (slug.includes(searchTerm)) return true;

    // Check title and description for the term
    if (title.includes(searchTerm)) return true;
    if (description.includes(searchTerm)) return true;

    return false;
  });
}
