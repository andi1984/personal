import { Suspense } from "react";
import { getAllPosts } from "@/lib/get_all_posts";
import FilterablePostList from "@/components/list/filterable-posts";
import MastHead from "@/components/masthead";
import Link from "next/link";

export const metadata = {
  title: "Notes | Gardening WebDev",
  description: "Quick notes, discoveries, and garden-fresh updates.",
};

const NotesPage = async () => {
  const notes = getAllPosts(
    ["slug", "title", "date", "description", "content"],
    "note",
  );

  return (
    <>
      <main className="mx-auto max-w-6xl px-6 py-12 md:px-8 lg:px-12">
        <MastHead />

        <section className="mt-12">
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
            <FilterablePostList title="All Notes" posts={notes} type="note" />
          </Suspense>
        </section>
      </main>
      <footer className="mx-auto max-w-6xl px-6 py-8 md:px-8 lg:px-12">
        <Link href="/impressum">Imprint & Privacy statement</Link>
      </footer>
    </>
  );
};

export default NotesPage;
