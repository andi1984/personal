import { cache } from "react";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { findMarkdownFile } from "./find_md_file";
import { Items, Types } from "./types";

// Reference https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/api.ts
export const getPostBySlug = cache(function (
  slug: string,
  fields: string[] = [],
  type: Types = "post"
) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = findMarkdownFile(slug, type);
  if (!fullPath) {
    throw new Error(`Could not find markdown for ${slug}`);
  }
  const fileContents = readFileSync(fullPath, "utf8");
  const matterData = matter(fileContents);
  const { data, content } = matterData;

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
});
