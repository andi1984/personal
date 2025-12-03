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
      ? "Long-form pieces on web development, tooling, and the craft of building for the web."
      : "Quick notes, discoveries, and garden-fresh updates.";

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
    </section>
  );
};

export default AllPostsList;
