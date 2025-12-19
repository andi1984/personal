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
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{leadCopy}</p>
      </div>

      <nav>
        <ol className="space-y-1">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogPostCard post={post} type={type} />
            </li>
          ))}
        </ol>
      </nav>

      {showViewAll && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <Link
            href={viewAllHref}
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
          >
            {viewAllLabel}
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Browse with filtering options
          </p>
        </div>
      )}
    </section>
  );
};

export default AllPostsList;
