import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const audioDir = join(process.cwd(), "public", "audio");
    const files = await readdir(audioDir);
    const mp3Files = files.filter((file) => file.toLowerCase().endsWith(".mp3"));

    return NextResponse.json({ tracks: mp3Files });
  } catch (error) {
    // Return empty array if directory doesn't exist
    return NextResponse.json({ tracks: [] });
  }
}
