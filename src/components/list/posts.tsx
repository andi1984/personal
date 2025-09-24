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
        <h2 className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-indigo-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-700 dark:text-emerald-50">{leadCopy}</p>
      </div>

      <nav className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-white via-white to-emerald-50 p-6 shadow-xl shadow-emerald-500/10 backdrop-blur-xl transition dark:border-emerald-800 dark:from-emerald-950/40 dark:via-emerald-950/50 dark:to-indigo-950/50 sm:p-8">
        <span
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_55%),linear-gradient(140deg,rgba(59,130,246,0.2),rgba(16,185,129,0.14),transparent)]"
          aria-hidden="true"
        />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="group relative rounded-2xl border border-emerald-200 bg-white p-[1px] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-emerald-800 dark:bg-emerald-950/60"
            >
              <article className="h-full w-full overflow-hidden rounded-[1.05rem] bg-gradient-to-br from-white via-white to-emerald-50/80 p-5 text-left backdrop-blur-sm transition duration-300 group-hover:from-white group-hover:via-white group-hover:to-emerald-50 dark:from-emerald-950 dark:via-emerald-900 dark:to-emerald-900/80">
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
