import React, { FC } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

import { Items, Types } from "@/lib/types";

const BlogPostCard: FC<{ post: Items; type: Types }> = ({ post, type }) => {
  const { slug, title, date, description } = post;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formattedDate = formatDate(date);

  return (
    <div className="group flex h-full flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-800 dark:text-emerald-100">
          <span>{type === "post" ? "Article" : "Note"}</span>
          <span
            className="h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-300"
            aria-hidden="true"
          />
          <time
            dateTime={date}
            className="text-[0.7rem] tracking-wider text-emerald-700 dark:text-emerald-100"
          >
            {formattedDate}
          </time>
        </div>

        <Link
          href={`/${type}s/${slug}`}
          className="group inline-flex items-baseline gap-2 text-left text-xl font-semibold leading-tight text-emerald-900 transition duration-200 hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:text-white dark:hover:text-emerald-200"
        >
          <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-indigo-600 bg-clip-text text-transparent transition duration-200 group-hover:from-emerald-500 group-hover:via-emerald-400 group-hover:to-indigo-500 dark:from-emerald-200 dark:via-emerald-200 dark:to-indigo-200">
            {title}
          </span>
          <FiArrowUpRight
            className="h-5 w-5 translate-y-[1px] shrink-0 text-emerald-600 transition duration-200 group-hover:translate-x-1 group-hover:text-indigo-500 dark:text-emerald-200"
            aria-hidden="true"
          />
        </Link>
      </div>

      {description && (
        <p className="text-sm leading-relaxed text-slate-700 transition duration-200 group-hover:text-slate-800 dark:text-emerald-100 dark:group-hover:text-emerald-50">
          {description}
        </p>
      )}

      <div className="mt-auto flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-emerald-800 transition duration-200 group-hover:text-emerald-700 dark:text-emerald-100 dark:group-hover:text-emerald-50">
        <span
          className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-600/50 transition duration-200 group-hover:bg-emerald-600 dark:bg-emerald-400/40"
          aria-hidden="true"
        />
        <span>Open to read</span>
      </div>
    </div>
  );
};

export default BlogPostCard;
