"use client";

import React, { FC } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { unstable_ViewTransition as ViewTransition } from "react";

import { Items, Types } from "@/lib/types";

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
  const transitionName = `${type}-title-${slug.replace(/\//g, "-")}`;

  return (
    <article className="group">
      <Link
        href={`/${type}s/${slug}`}
        className="flex items-start justify-between gap-4 rounded-lg px-4 py-4 -mx-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 !no-underline"
      >
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-3">
            {date && (
              <time
                dateTime={date}
                className="shrink-0 text-xs font-medium text-slate-400 dark:text-slate-500 tabular-nums"
              >
                {formattedDate}
              </time>
            )}
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
              /
            </span>
            <ViewTransition name={transitionName}>
              <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                {title}
              </h3>
            </ViewTransition>
          </div>

          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <FiArrowRight
          className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:text-slate-500 group-hover:translate-x-1 dark:text-slate-600 dark:group-hover:text-slate-400"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
};

export default BlogPostCard;
