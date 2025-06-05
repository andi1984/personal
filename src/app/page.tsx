"use server";

import AllPostsList from "@/components/list/posts";
import { getAllPosts } from "@/lib/get_all_posts";
import SocialMediaInfluence from "@/components/influence";
import * as Tabs from "@radix-ui/react-tabs";
import MastHead from "@/components/masthead";
import Link from "next/link";
import EasterEgg from "@/components/easter-egg";

const Page = async ({}) => {
  const api = await import("./api/follower/route");
  const response = await api.GET();
  const data = await response.json();

  const posts = getAllPosts(["slug", "title", "date", "description"]);
  const notes = getAllPosts(["slug", "title", "date", "description"], "note");
  return (
    <>
      <a
        href="#posts"
        className="absolute left-[-9999px] focus:left-0 focus:top-0 focus:z-50 focus:p-4 focus:m-4 focus:bg-background focus:text-foreground focus:border focus:border-border"
      >
        Skip to Main Content
      </a>

      <main>
        <MastHead />
        <section>
          <h2>Welcome to My Space: Where Web Development Meets Gardening</h2>
          <p>
            Hello and thanks for visiting! I&apos;m Andi, a dedicated senior
            frontend developer from the beautiful South-West of Germany.
            I&apos;m all about creating smooth and engaging web experiences with
            React, JavaScript, TypeScript, and CSS. But there&apos;s more to me
            than just code – I&apos;m also an avid gardener, finding parallels
            between nurturing plants and developing robust websites.
          </p>
        </section>
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
      <EasterEgg />
    </>
  );
};

export default Page;
