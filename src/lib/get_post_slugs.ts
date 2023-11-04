import * as fs from "fs";
import * as path from "path";
import posts_dir from "./posts_dir";

function generateSlugs(directory: string, currentPath: string = ""): string[] {
  // Ensure the directory path is absolute
  const absoluteDirectory = path.resolve(directory);

  // List all items in the current directory
  const items = fs.readdirSync(absoluteDirectory);

  // Initialize an array to hold the slugs
  let slugs: string[] = [];

  for (const item of items) {
    // Construct the absolute path to the current item
    const itemPath = path.join(absoluteDirectory, item);

    // Check if the current item is a directory
    if (fs.statSync(itemPath).isDirectory()) {
      // Recursively call generateSlugs on the subdirectory
      const subdirectorySlugs = generateSlugs(
        itemPath,
        path.join(currentPath, item)
      );
      slugs = slugs.concat(subdirectorySlugs);
    }
  }

  // If the current directory contains an index.md file, add the current path to the slugs array
  if (fs.existsSync(path.join(absoluteDirectory, "index.md"))) {
    slugs.push(currentPath);
  }

  return slugs;
}

export function getPostSlugs() {
  return generateSlugs(posts_dir);
}
