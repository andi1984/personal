"use server";

import AllPostsList from "@/components/list/posts";
import SocialMediaInfluence from "@/components/influence";
import VideoHighlights from "@/components/video-highlights";
import { getAllPosts } from "@/lib/get_all_posts";
import * as Tabs from "@radix-ui/react-tabs";
import MastHead from "@/components/masthead";
import Link from "next/link";
import IntroAudioPlayer from "@/components/intro-audio-player";

const Page = async ({}) => {
  const api = await import("./api/follower/route");
  const response = await api.GET();
  const data = await response.json();

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
          ? (postA.youtube as { views?: number }).views ?? 0
          : 0;
      const viewsB =
        typeof postB.youtube === "object" && postB.youtube !== null
          ? (postB.youtube as { views?: number }).views ?? 0
          : 0;
      return viewsB - viewsA;
    })
    .slice(0, 3);
  return (
    <>
      <a
        href="#posts"
        className="absolute left-[-9999px] focus:left-0 focus:top-0 focus:z-50 focus:p-4 focus:m-4 focus:bg-background focus:text-foreground focus:border focus:border-border"
      >
        Skip to Main Content
      </a>

      <main className="mx-auto max-w-6xl px-6 py-12 md:px-8 lg:px-12">
        <MastHead />

        {/* Hero Section */}
        <section className="mb-20 mt-12">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
              Hi, I&apos;m Andi
            </h2>
            <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
              Senior frontend developer from South-West Germany, crafting web experiences with React, TypeScript, and CSS. When I&apos;m not writing code, you&apos;ll find me in the garden—I see the same care in growing plants as in growing great software.
            </p>
            <IntroAudioPlayer className="mx-auto w-full max-w-xl" />
          </div>
        </section>

        <VideoHighlights videos={youtubeHighlights} />

        {/* Content Tabs */}
        <section className="mt-20">
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
                <AllPostsList title="Latest Articles" posts={posts} type="post" />
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
                <SocialMediaInfluence count={data} />
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
