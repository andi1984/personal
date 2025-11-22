import React, { FC } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

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

  return (
    <div className="group flex h-full flex-col gap-4 p-5 rounded-lg border border-slate-200 bg-white transition-colors hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-300">
          <span>{type === "post" ? "Article" : "Note"}</span>
          {date && (
            <>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <time
                dateTime={date}
                className="text-xs text-slate-500 dark:text-slate-400"
              >
                {formattedDate}
              </time>
            </>
          )}
        </div>

        <Link
          href={`/${type}s/${slug}`}
          className="group inline-flex items-baseline gap-2 text-left text-xl font-semibold leading-tight text-slate-900 transition-colors hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-500 dark:text-slate-50 dark:hover:text-slate-200"
        >
          <span>
            {title}
          </span>
          <FiArrowUpRight
            className="h-4 w-4 translate-y-[2px] shrink-0 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-slate-400"
            aria-hidden="true"
          />
        </Link>
      </div>

      {description && (
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {description}
        </p>
      )}
    </div>
  );
};

export default BlogPostCard;
