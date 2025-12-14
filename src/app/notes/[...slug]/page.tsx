"use server";
import BackToHome from "@/components/back-button";
import DetailPageShell from "@/components/detail-page-shell";
import Metadata from "@/components/metadata";
import PostTitle from "@/components/post-title";
import ReadingPane from "@/components/reading-pane";
import WebmentionsList from "@/components/webmentions.tsx";
import { getContentAsHTML } from "@/lib/get-content-as-html";
import { getPostBySlug } from "@/lib/get_post_by_slug";
import { getNoteSlugs } from "@/lib/get_post_slugs";

type Params = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const slugs = getNoteSlugs();
  return slugs.map((slug) => ({
    slug: slug.split("/"),
  }));
}
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
  const { content: rawContent } = post;
  if (typeof rawContent !== "string") {
    throw new Error("Note content is missing");
  }
  const content = await getContentAsHTML(rawContent);
  return (
    <DetailPageShell backSlot={<BackToHome />}>
      <ReadingPane>
        <article className="blog-post">
          <PostTitle
            title={post.title as string}
            slug={params.slug.join("/")}
            type="note"
          />
          <Metadata {...post} />
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <WebmentionsList slug={`notes/${params.slug.join("/")}`} />
        </article>
      </ReadingPane>
    </DetailPageShell>
  );
}
