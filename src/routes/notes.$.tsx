import { Suspense } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import BackToHome from "@/components/back-button";
import DetailPageShell from "@/components/detail-page-shell";
import Metadata from "@/components/metadata";
import PostTitle from "@/components/post-title";
import ReadingPane from "@/components/reading-pane";
import WebmentionsList from "@/components/webmentions.tsx";
import { getContentAsHTML } from "@/lib/get-content-as-html";
import { getPostBySlug } from "@/lib/get_post_by_slug";
import { Items } from "@/lib/types";

const getNoteData = createServerFn()
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const post = getPostBySlug(
      data.slug,
      ["title", "slug", "content", "date", "devto"],
      "note",
    );

    if (!post.title) {
      return null;
    }

    const { content: rawContent } = post;
    if (typeof rawContent !== "string") {
      throw new Error("Note content is missing");
    }
    const content = await getContentAsHTML(rawContent);
    return { post: post as Items & Record<string, {}>, content } as {
      post: Items & Record<string, {}>;
      content: string;
    };
  });

export const Route = createFileRoute("/notes/$")({
  loader: async ({ params }) => {
    const slug = params["_splat"] || "";
    const data = await getNoteData({ data: { slug } });
    if (!data) {
      throw notFound();
    }
    return data;
  },
  component: NotePage,
  notFoundComponent: () => <div>Note not found</div>,
});

function NotePage() {
  const { post, content } = Route.useLoaderData();
  const params = Route.useParams();
  const slug = params["_splat"] || "";

  return (
    <DetailPageShell backSlot={<BackToHome />}>
      <ReadingPane>
        <article className="blog-post">
          <PostTitle title={post.title as string} slug={slug} type="note" />
          <Metadata {...post} />
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <Suspense fallback={null}>
            <WebmentionsList slug={`notes/${slug}`} />
          </Suspense>
        </article>
      </ReadingPane>
    </DetailPageShell>
  );
}
