import React, { FC } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { ViewTransition } from "react";

import { Items, Types } from "@/lib/types";

/**
 * Card component for displaying a blog post or note in a list.
 * Features a modern hover effect and view transition for the title.
 */
const BlogPostCard: FC<{ post: Items; type: Types }> = ({ post, type }) => {
  const slug = typeof post.slug === "string" ? post.slug : "";
  const title = typeof post.title === "string" ? post.title : "";
  const date = typeof post.date === "string" ? post.date : "";
  const description =
    typeof post.description === "string" ? post.description : undefined;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formattedDate = date ? formatDate(date) : "";

  // Unique transition name for view transitions between list and detail pages
  const transitionName = `${type}-title-${slug.replace(/\//g, "-")}`;

  return (
    <article className="group">
      <Link
        href={`/${type}s/${slug}`}
        className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 px-5 py-5 transition-all hover:bg-slate-50/80 dark:hover:bg-slate-800/30 !no-underline border-l-2 border-transparent hover:border-l-slate-300 dark:hover:border-l-slate-600 hover:shadow-sm"
      >
        {/* Date - spans full width on mobile, first row on desktop */}
        {date && (
          <time
            dateTime={date}
            className="col-span-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 tabular-nums"
          >
            {formattedDate}
          </time>
        )}

        {/* Title - wraps naturally, no truncation */}
        <div className="col-span-1 min-w-0">
          <ViewTransition name={transitionName}>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
              {title}
            </h3>
          </ViewTransition>

          {/* Description */}
          {description && (
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Arrow icon - positioned on the right */}
        <div className="flex items-start pt-1">
          <FiArrowRight
            className="h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:text-blue-500 group-hover:translate-x-1 group-hover:scale-110 dark:text-slate-600 dark:group-hover:text-blue-400"
            aria-hidden="true"
          />
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard;
