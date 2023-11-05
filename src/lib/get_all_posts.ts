import { getPostBySlug } from "./get_post_by_slug";
import { getNoteSlugs, getPostSlugs } from "./get_post_slugs";
import { Types } from "./types";

export function getAllPosts(fields: string[] = [], type: Types = "post") {
  const slugs = type === "post" ? getPostSlugs() : getNoteSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, type))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
