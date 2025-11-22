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
    <section className="space-y-6">
      <div className="mx-auto max-w-3xl text-center sm:max-w-4xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{leadCopy}</p>
      </div>

      <nav>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="h-full">
                <BlogPostCard post={post} type={type} />
              </article>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
};

export default AllPostsList;
