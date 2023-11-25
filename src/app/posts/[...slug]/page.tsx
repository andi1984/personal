import BackButton from "@/components/back-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WebmentionsList from "@/components/webmentions.tsx";
import { getPostBySlug } from "@/lib/get_post_by_slug";
import markdownToHtml from "@/lib/markdown_to_html";
import Link from "next/link";

type Params = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};
type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
};

export async function getContentAsHTML(content: string) {
  return await markdownToHtml(content);
}

export default async function Page({ params, searchParams }: Params) {
  const post = getPostBySlug(params.slug.join("/"), [
    "title",
    "slug",
    "content",
    "date",
    "devto",
  ]);
  const content = await getContentAsHTML(post.content);
  return (
    <>
      <BackButton />
      <article className="blog-post">
        <h1>{post.title}</h1>
        <aside className="sm:flex sm:flex-row gap-3 md:bg-stone-200 px-3 py-3 rounded-md">
          {post?.devto && (
            <Badge className="block my-2 text-center">
              <Link href={post.devto} target="_blank">
                Read on DevTo
              </Link>
            </Badge>
          )}
          {post?.date && (
            <Badge variant="secondary" className="block my-2 text-center">
              Published on {new Date(post.date).toDateString()}
            </Badge>
          )}
        </aside>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <WebmentionsList />
      </article>
    </>
  );
}
