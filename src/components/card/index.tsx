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
    <article className="group border-b border-slate-200 py-6 last:border-0 dark:border-slate-800">
      <Link
        href={`/${type}s/${slug}`}
        className="flex flex-col gap-2"
      >
        <div className="flex items-baseline gap-3">
          <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-slate-600 dark:text-slate-50 dark:group-hover:text-slate-300">
            {title}
          </h3>
          <FiArrowUpRight
            className="h-4 w-4 shrink-0 text-slate-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-slate-500"
            aria-hidden="true"
          />
        </div>

        {description && (
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}

        {date && (
          <time
            dateTime={date}
            className="text-xs text-slate-500 dark:text-slate-500"
          >
            {formattedDate}
          </time>
        )}
      </Link>
    </article>
  );
};

export default BlogPostCard;
