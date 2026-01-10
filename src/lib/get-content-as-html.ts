import markdownToHtml from "./markdown_to_html";

export async function getContentAsHTML(content: string): Promise<string> {
  return await markdownToHtml(content);
}
