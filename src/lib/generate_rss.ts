import RSS from "rss";
import { Items } from "./types";
import { getContentAsHTML } from "./get-content-as-html";

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
  const postsWithContent = allPosts.filter(
    (
      post,
    ): post is Items & {
      content: string;
      title: string;
      slug: string;
      date: string | Date;
    } =>
      typeof post.content === "string" &&
      typeof post.title === "string" &&
      typeof post.slug === "string" &&
      (typeof post.date === "string" || post.date instanceof Date),
  );

  for (const post of postsWithContent) {
    const html = await getContentAsHTML(post.content);
    feed.item({
      title: post.title,
      description: html,
      url: `${site_url}/posts/${post.slug}`,
      date: post.date,
    });
  }

  return feed;
}
