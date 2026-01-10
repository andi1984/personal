import { createFileRoute } from "@tanstack/react-router";
import { getAllPosts } from "@/lib/get_all_posts";
import { Items } from "@/lib/types";

function generateSiteMap(posts: Items[], notes: Items[]) {
  const site_url =
    process.env.NODE_ENV === "production"
      ? "https://andi1984.dev"
      : "https://personal-ten-lac.vercel.app";
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${site_url}/posts/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
     ${notes
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${site_url}/notes/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

export const Route = createFileRoute("/sitemap")({
  server: {
    handlers: {
      GET: async () => {
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
        const feed = generateSiteMap(posts, notes);
        return new Response(feed, {
          status: 200,
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
