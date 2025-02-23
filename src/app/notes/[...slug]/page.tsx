import BackButton from "@/components/back-button";
import Metadata from "@/components/metadata";
import WebmentionsList from "@/components/webmentions.tsx";
import { getContentAsHTML } from "@/lib/get-content-as-html";
import { getPostBySlug } from "@/lib/get_post_by_slug";

type Params = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

export default async function Page(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(
    params.slug.join("/"),
    ["title", "slug", "content", "date", "devto"],
    "note",
  );
  const content = await getContentAsHTML(post.content);
  return (
    <article>
      <BackButton />
      <section className="blog-post">
        <h1>{post.title}</h1>
        <Metadata {...post} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <WebmentionsList />
      </section>
    </article>
  );
}
