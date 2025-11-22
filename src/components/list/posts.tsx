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
    <section className="space-y-12">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          {title}
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400">{leadCopy}</p>
      </div>

      <nav>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogPostCard post={post} type={type} />
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
};

export default AllPostsList;
