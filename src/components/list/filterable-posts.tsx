"use client";

import { FC, useMemo } from "react";
import { Items, Types } from "@/lib/types";
import BlogPostCard from "../card";
import FilterIndicator from "../filter-indicator";
import { useFilter, matchesFilter } from "@/hooks/use-filter";

/**
 * Client component that renders a filterable list of posts or notes.
 * Uses URL search params for filter state management.
 */
const FilterablePostList: FC<{
  title: string;
  posts: Items[];
  type: Types;
}> = ({ title, posts, type }) => {
  const { filter, isFiltered } = useFilter();

  const filteredPosts = useMemo(() => {
    if (!filter) return posts;
    return posts.filter((post) => matchesFilter(post, filter));
  }, [posts, filter]);

  const leadCopy =
    type === "post"
      ? "Long-form pieces on web development, tooling, and the craft of building for the web."
      : "Quick notes, discoveries, and garden-fresh updates.";

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{leadCopy}</p>
      </div>

      <FilterIndicator />

      {filteredPosts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 dark:border-slate-700 p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            No {type === "post" ? "articles" : "notes"} found matching{" "}
            <strong className="text-slate-700 dark:text-slate-300">
              {filter}
            </strong>
            .
          </p>
        </div>
      ) : (
        <nav>
          <ol className="space-y-1">
            {filteredPosts.map((post) => (
              <li key={post.slug}>
                <BlogPostCard post={post} type={type} />
              </li>
            ))}
          </ol>
          {isFiltered && (
            <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">
              Showing {filteredPosts.length} of {posts.length}{" "}
              {type === "post" ? "articles" : "notes"}
            </p>
          )}
        </nav>
      )}
    </section>
  );
};

export default FilterablePostList;
