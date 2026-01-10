import { createFileRoute } from "@tanstack/react-router";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

export const Route = createFileRoute("/api/audio-tracks")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const audioDir = join(process.cwd(), "public", "audio");
          const files = await readdir(audioDir);
          const mp3Files = files.filter((file) => file.toLowerCase().endsWith(".mp3"));

          return new Response(JSON.stringify({ tracks: mp3Files }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch {
          // Return empty array if directory doesn't exist
          return new Response(JSON.stringify({ tracks: [] }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
