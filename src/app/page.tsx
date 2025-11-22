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

      <main className="max-w-5xl mx-auto px-4 space-y-8">
        <MastHead />
        <section className="rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 p-8">
          <div className="space-y-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">Hi, I&apos;m Andi</h2>
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Senior frontend developer from South-West Germany, crafting web experiences with React, TypeScript, and CSS. When I&apos;m not writing code, you&apos;ll find me in the garden—I see the same care in growing plants as in growing great software.
            </p>
            <IntroAudioPlayer className="mx-auto w-full max-w-xl" />
          </div>
        </section>
        <VideoHighlights videos={youtubeHighlights} />
        <Tabs.Root className="TabsRoot" defaultValue="posts">
          <Tabs.List className="TabsList">
            <Tabs.Trigger value="posts" className="TabsTrigger">
              Blogposts
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
              <AllPostsList title="All posts" posts={posts} type="post" />
            </section>
          </Tabs.Content>
          <Tabs.Content value="notes" className="TabsContent">
            <section id="notes">
              <AllPostsList title="All notes" posts={notes} type="note" />
            </section>
          </Tabs.Content>
          <Tabs.Content value="community" className="TabsContent">
            <p>Please contact me on one of those platforms listed below:</p>
            <SocialMediaInfluence count={data} />
          </Tabs.Content>
        </Tabs.Root>
      </main>
      <footer>
        <Link href="/impressum">Imprint & Privacy statement</Link>
      </footer>
    </>
  );
};

export default Page;
