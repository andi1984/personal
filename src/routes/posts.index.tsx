import { Suspense } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getAllPosts } from "@/lib/get_all_posts";
import { getTopicsFromPosts } from "@/lib/get_topics";
import FilterablePostList from "@/components/list/filterable-posts";
import MastHead from "@/components/masthead";
import Breadcrumb from "@/components/breadcrumb";

const getPostsData = createServerFn().handler(async () => {
  const posts = getAllPosts([
    "slug",
    "title",
    "date",
    "description",
    "content",
  ]);
  const topics = getTopicsFromPosts(posts);
  return { posts, topics };
});

export const Route = createFileRoute("/posts/")({
  head: () => ({
    meta: [
      { title: "Articles | Gardening WebDev" },
      {
        name: "description",
        content:
          "Long-form pieces on web development, tooling, and the craft of building for the web.",
      },
    ],
  }),
  loader: () => getPostsData(),
  component: PostsPage,
});

function PostsPage() {
  const { posts, topics } = Route.useLoaderData();

  return (
    <>
      <main className="mx-auto max-w-6xl px-6 py-12 md:px-8 lg:px-12">
        <MastHead />

        <div className="mt-8">
          <Breadcrumb current="Articles" />
        </div>

        <section className="mt-8">
          <Suspense
            fallback={
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="h-7 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-5 w-96 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>
            }
          >
            <FilterablePostList
              title="All Articles"
              posts={posts}
              type="post"
              topics={topics}
            />
          </Suspense>
        </section>
      </main>
      <footer className="mx-auto max-w-6xl px-6 py-8 md:px-8 lg:px-12">
        <Link to="/impressum">Imprint & Privacy statement</Link>
      </footer>
    </>
  );
}
