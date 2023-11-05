import { existsSync, statSync } from "fs";
import path from "path";
import posts_dir from "./posts_dir";
import notes_dir from "./notes_dir";
import { Types } from "./types";

export function findMarkdownFile(slug: string, type: Types): string | null {
  // Normalize the slug to ensure it's a valid path
  const normalizedSlug = path.normalize(slug);

  // Construct the path to the folder based on the slug

  const folderPath = path.join(
    type === "post" ? posts_dir : notes_dir,
    normalizedSlug
  );

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
