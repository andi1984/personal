import AllPostsList from "@/components/list/posts";
import SocialMediaInfluence from "@/components/influence";
import TinyPNGShowcase from "@/components/tinypng-showcase";
import VideoHighlights from "@/components/video-highlights";
import SkipToSection from "@/components/skip-to-section";
import { getAllPosts } from "@/lib/get_all_posts";
import * as Tabs from "@radix-ui/react-tabs";
import MastHead from "@/components/masthead";
import Link from "next/link";

const Page = async ({}) => {
  const posts = getAllPosts([
    "slug",
    "title",
    "date",
    "description",
    "youtube",
    "heroImage",
  ]);
  const notes = getAllPosts(["slug", "title", "date", "description"], "note");
  const youtubeHighlights = posts
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
      <SkipToSection targetId="content" label="Skip to Articles" />

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
                <span className="relative inline-block font-semibold text-slate-900 dark:text-slate-50">
                  React
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                </span>
                ,{" "}
                <span className="relative inline-block font-semibold text-slate-900 dark:text-slate-50">
                  TypeScript
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-600 to-blue-400" />
                </span>
                , and{" "}
                <span className="relative inline-block font-semibold text-slate-900 dark:text-slate-50">
                  CSS
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-pink-500 to-purple-500" />
                </span>
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

        {/* Content Tabs */}
        <section id="content" className="mt-16">
          <Tabs.Root className="TabsRoot" defaultValue="posts">
            <Tabs.List className="TabsList">
              <Tabs.Trigger value="posts" className="TabsTrigger">
                Articles
              </Tabs.Trigger>
              <Tabs.Trigger value="notes" className="TabsTrigger">
                Notes
              </Tabs.Trigger>
              <Tabs.Trigger value="community" className="TabsTrigger">
                Community
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="posts" className="TabsContent">
              <section id="posts">
                <AllPostsList
                  title="Latest Articles"
                  posts={posts}
                  type="post"
                />
              </section>
            </Tabs.Content>
            <Tabs.Content value="notes" className="TabsContent">
              <section id="notes">
                <AllPostsList title="Quick Notes" posts={notes} type="note" />
              </section>
            </Tabs.Content>
            <Tabs.Content value="community" className="TabsContent">
              <div className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300">
                  Let&apos;s connect! Find me on these platforms:
                </p>

                <SocialMediaInfluence />
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </section>
      </main>
      <footer>
        <Link href="/impressum">Imprint & Privacy statement</Link>
      </footer>
    </>
  );
};

export default Page;
