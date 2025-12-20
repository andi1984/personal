import { Items, Types } from "@/lib/types";
import { FC } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import BlogPostCard from "../card";

/**
 * Renders a list of blog posts or notes with a title and description.
 * Used on the homepage to display articles and notes in separate tabs.
 */
const AllPostsList: FC<{
  title: string;
  posts: Items[];
  type: Types;
  showViewAll?: boolean;
}> = ({ title, posts, type, showViewAll = true }) => {
  const leadCopy =
    type === "post"
      ? "Long-form pieces on web development, tooling, and the craft of building for the web."
      : "Quick notes, discoveries, and garden-fresh updates.";

  const viewAllHref = type === "post" ? "/posts" : "/notes";
  const viewAllLabel = type === "post" ? "View all articles" : "View all notes";

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {leadCopy}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <nav>
          <ol className="divide-y divide-slate-100 dark:divide-slate-800">
            {posts.map((post) => (
              <li key={post.slug}>
                <BlogPostCard post={post} type={type} />
              </li>
            ))}
          </ol>
        </nav>

        {showViewAll && (
          <div className="px-5 py-4 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-800/50 dark:via-slate-900/30 dark:to-slate-800/50 border-t border-slate-200 dark:border-slate-800">
            <Link
              href={viewAllHref}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-all"
            >
              {viewAllLabel}
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2 group-hover:scale-110" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPostsList;
