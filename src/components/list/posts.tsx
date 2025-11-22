import { Items, Types } from "@/lib/types";
import { FC } from "react";
import BlogPostCard from "../card";

const AllPostsList: FC<{
  title: string;
  posts: Items[];
  type: Types;
}> = ({ title, posts, type }) => {
  const leadCopy =
    type === "post"
      ? "Explore long-form pieces hand-crafted to inspire and inform."
      : "Browse quick notes and garden-fresh updates worth bookmarking.";

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          {title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">{leadCopy}</p>
      </div>

      <nav>
        <ol className="border-t border-slate-200 dark:border-slate-800">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-slate-200 last:border-0 dark:border-slate-800">
              <BlogPostCard post={post} type={type} />
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
};

export default AllPostsList;
