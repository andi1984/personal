import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * A remark plugin that transforms :::letter container directives
 * into HTML div elements with the "letter" class.
 *
 * Usage in markdown:
 * ```
 * :::letter
 * Dear Reader,
 *
 * Your letter content here...
 *
 * Sincerely,
 * Author
 * :::
 * ```
 */
export function remarkLetter() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" &&
        (node as { name?: string }).name === "letter"
      ) {
        const data = (node.data ||= {});
        data.hName = "div";
        data.hProperties = {
          className: ["letter"],
        };
      }
    });
  };
}
