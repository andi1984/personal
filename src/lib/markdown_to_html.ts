import rehypeExternalLinks from "rehype-external-links";
import remarkParse from "remark-parse";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { unified } from "unified";
import { remarkLetter } from "./remark-letter";

export default async function markdownToHtml(markdown: string) {
  const processor = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkLetter)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeHighlight)
    .use(rehypeExternalLinks, { rel: ["nofollow"], target: "_blank" })
    .use(rehypeStringify);

  const html = await processor.process(markdown);

  return String(html);
}
