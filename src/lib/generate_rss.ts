import RSS from "rss";
import { Items } from "./types";
import { getContentAsHTML } from "@/app/posts/[...slug]/page";

export default async function generateRssFeed(allPosts: Items[]) {
  const site_url =
    process.env.NODE_ENV === "production"
      ? "https://andi1984.dev"
      : "https://personal-ten-lac.vercel.app";

  const feedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to this blog posts!",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.jpeg`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  // Add each individual post to the feed.
  return Promise.all(
    allPosts.map((post) => {
      getContentAsHTML(post.content).then((html) => {
        return feed.item({
          title: post.title,
          description: html,
          url: `${site_url}/posts/${post.slug}`,
          date: post.date,
        });
      });
    })
  ).then(() => feed);
}
