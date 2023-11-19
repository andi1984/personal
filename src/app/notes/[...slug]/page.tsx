import { getContentAsHTML } from "@/app/posts/[...slug]/page";
import WebmentionsList from "@/components/webmentions.tsx";
import { getPostBySlug } from "@/lib/get_post_by_slug";

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

export default async function Page({ params, searchParams }: Params) {
  const post = getPostBySlug(
    params.slug.join("/"),
    ["title", "slug", "content"],
    "note"
  );
  const content = await getContentAsHTML(post.content);
  return (
    <section className="blog-post">
      <h1>My Page, {params.slug}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <WebmentionsList />
    </section>
  );
}
