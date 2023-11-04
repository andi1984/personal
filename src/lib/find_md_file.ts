import { existsSync, statSync } from "fs";
import path from "path";
import posts_dir from "./posts_dir";

export function findMarkdownFile(slug: string): string | null {
  // Normalize the slug to ensure it's a valid path
  const normalizedSlug = path.normalize(slug);

  // Construct the path to the folder based on the slug
  const folderPath = path.join(posts_dir, normalizedSlug);

  // Verify the folder exists
  if (!existsSync(folderPath) || !statSync(folderPath).isDirectory()) {
    return null;
  }

  // Construct the path to the index.md file within the folder
  const markdownFilePath = path.join(folderPath, "index.md");

  // Verify the markdown file exists
  if (!existsSync(markdownFilePath) || !statSync(markdownFilePath).isFile()) {
    return null;
  }

  return markdownFilePath;
}
