import generateRssFeed from "@/lib/generate_rss";
import { getAllPosts } from "@/lib/get_all_posts";

export async function GET() {
  const posts = getAllPosts([
    "slug",
    "title",
    "date",
    "description",
    "content",
  ]);
  const notes = getAllPosts(
    ["slug", "title", "date", "description", "content"],
    "note"
  );
  const feed = await generateRssFeed([...posts, ...notes]);
  return new Response(feed.xml(), {
    status: 200,
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
