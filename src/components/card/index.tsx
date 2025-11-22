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
    <article className="group h-full">
      <Link
        href={`/${type}s/${slug}`}
        className="flex h-full flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {type === "post" ? "Article" : "Note"}
            </span>
            {date && (
              <time
                dateTime={date}
                className="text-xs text-slate-500 dark:text-slate-500"
              >
                {formattedDate}
              </time>
            )}
          </div>

          <h3 className="text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-slate-700 dark:text-slate-50 dark:group-hover:text-slate-200">
            {title}
          </h3>
        </div>

        {description && (
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}

        <div className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-medium text-slate-900 dark:text-slate-100">
          <span>Read more</span>
          <FiArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard;
