import { cache } from "react";
import markdownToHtml from "./markdown_to_html";

export const getContentAsHTML = cache(async function (content: string) {
  return await markdownToHtml(content);
});
