import rehypeExternalLinks from "rehype-external-links";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";

export default async function markdownToHtml(markdown: string) {
  const processor = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeExternalLinks, { rel: ["nofollow"], target: "_blank" })
    .use(rehypeStringify);

  const html = await processor.process(markdown);

  return String(html);
}
