import rehypeExternalLinks from "rehype-external-links";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { unified } from "unified";

export default async function markdownToHtml(markdown: string) {
  const processor = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeExternalLinks, { rel: ["nofollow"], target: "_blank" })
    .use(rehypeStringify);

  const html = await processor.process(markdown);

  return String(html);
}
