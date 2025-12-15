"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export type FilterTerm = "react" | "typescript" | "css" | null;

export const FILTER_TERMS = ["react", "typescript", "css"] as const;

/**
 * Hook for managing post/note filtering via URL search params.
 * Filter state is stored in the URL for shareability.
 */
export function useFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filter = searchParams.get("filter") as FilterTerm;

  const setFilter = useCallback(
    (term: FilterTerm) => {
      const params = new URLSearchParams(searchParams.toString());
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
    setFilter(null);
  }, [setFilter]);

  return {
    filter,
    setFilter,
    clearFilter,
    isFiltered: !!filter,
  };
}

/**
 * Check if content matches the filter term.
 * Matches against slug (folder path) and content title/description.
 */
export function matchesFilter(
  item: { slug?: string; title?: string; description?: string; content?: string },
  filter: FilterTerm,
): boolean {
  if (!filter) return true;

  const searchTerm = filter.toLowerCase();
  const slug = (item.slug ?? "").toLowerCase();
  const title = (item.title ?? "").toLowerCase();
  const description = (item.description ?? "").toLowerCase();

  // Check if the slug path contains the filter term (folder-based categorization)
  if (slug.includes(searchTerm)) return true;

  // Check title and description for the term
  if (title.includes(searchTerm)) return true;
  if (description.includes(searchTerm)) return true;

  return false;
}
