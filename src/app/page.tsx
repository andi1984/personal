import AllPostsList from "@/components/list/posts";
import SocialMediaInfluence from "@/components/influence";
import TinyPNGShowcase from "@/components/tinypng-showcase";
import VideoHighlights from "@/components/video-highlights";
import SkipToSection from "@/components/skip-to-section";
import { getAllPosts } from "@/lib/get_all_posts";
import MastHead from "@/components/masthead";
import Link from "next/link";
import FilterLink from "@/components/filter-link";

const Page = async ({}) => {
  const allPosts = getAllPosts([
    "slug",
    "title",
    "date",
    "description",
    "youtube",
    "heroImage",
  ]);
  const allNotes = getAllPosts(
    ["slug", "title", "date", "description"],
    "note",
  );

  // Limit to 3 items each for the homepage
  const posts = allPosts.slice(0, 3);
  const notes = allNotes.slice(0, 3);

  const youtubeHighlights = allPosts
    .filter((post) =>
      typeof post.youtube === "object" && post.youtube !== null
        ? (post.youtube as { videoId?: string }).videoId
        : false,
    )
    .sort((postA, postB) => {
      const viewsA =
        typeof postA.youtube === "object" && postA.youtube !== null
          ? ((postA.youtube as { views?: number }).views ?? 0)
          : 0;
      const viewsB =
        typeof postB.youtube === "object" && postB.youtube !== null
          ? ((postB.youtube as { views?: number }).views ?? 0)
          : 0;
      return viewsB - viewsA;
    })
    .slice(0, 3);

  return (
    <>
      <SkipToSection targetId="tools" label="Skip to Tools" />
      <SkipToSection targetId="videos" label="Skip to Videos" />
      <SkipToSection targetId="content" label="Skip to Content" />
      <SkipToSection targetId="community" label="Skip to Community" />

      <main className="mx-auto max-w-6xl px-6 py-12 md:px-8 lg:px-12">
        <MastHead />

        {/* Hero Section */}
        <section className="mb-16 mt-12">
          <div className="relative mx-auto max-w-4xl">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-50 via-transparent to-blue-50 opacity-60 blur-3xl dark:from-green-950 dark:via-transparent dark:to-blue-950 dark:opacity-30" />

            <div className="space-y-8 text-center px-6">
              {/* Main heading with gradient text */}
              <div className="space-y-4">
                <div className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h2 className="text-5xl font-bold tracking-tight md:text-7xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 dark:from-slate-50 dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                    Hi, I&apos;m Andi
                  </h2>
                </div>

                {/* Decorative underline */}
                <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-green-500 to-blue-500 animate-in fade-in duration-1000 delay-300" />
              </div>

              {/* Description with better spacing and accent highlights */}
              <p className="text-xl md:text-2xl leading-relaxed text-slate-700 dark:text-slate-300 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                Senior frontend developer from South-West Germany, crafting web
                experiences with{" "}
                <FilterLink
                  topic="react"
                  underlineClassName="bg-gradient-to-r from-blue-500 to-cyan-500"
                >
                  React
                </FilterLink>
                ,{" "}
                <FilterLink
                  topic="typescript"
                  underlineClassName="bg-gradient-to-r from-blue-600 to-blue-400"
                >
                  TypeScript
                </FilterLink>
                , and{" "}
                <FilterLink
                  topic="css"
                  underlineClassName="bg-gradient-to-r from-pink-500 to-purple-500"
                >
                  CSS
                </FilterLink>
                . When I&apos;m not writing code, you&apos;ll find me in the
                garden—I see the same care in{" "}
                <span className="inline-flex items-center gap-1 font-medium text-green-700 dark:text-green-400">
                  growing plants 🌱
                </span>{" "}
                as in growing great software.
              </p>
            </div>
          </div>
        </section>

        <div id="tools">
          <TinyPNGShowcase />
        </div>

        <div id="videos">
          <VideoHighlights videos={youtubeHighlights} />
        </div>

        {/* Content Section - Articles and Notes */}
        <section id="content" className="mt-16 space-y-12">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Latest Articles */}
            <section id="posts">
              <AllPostsList title="Latest Articles" posts={posts} type="post" />
            </section>

            {/* Quick Notes */}
            <section id="notes">
              <AllPostsList title="Quick Notes" posts={notes} type="note" />
            </section>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="mt-16">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                Community
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Let&apos;s connect! Find me on these platforms:
              </p>
            </div>
            <SocialMediaInfluence />
          </div>
        </section>
      </main>
      <footer>
        <Link href="/impressum">Imprint & Privacy statement</Link>
      </footer>
    </>
  );
};

export default Page;
