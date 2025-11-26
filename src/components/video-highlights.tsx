import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { Items } from "@/lib/types";

type VideoHighlight = Items & {
  heroImage?: string;
  youtube?: {
    videoId?: string;
    url?: string;
    views?: number;
    viewsText?: string;
    published?: string;
  };
};

const formatPublishedDate = (value?: string) => {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const VideoHighlights: FC<{ videos: VideoHighlight[] }> = ({ videos }) => {
  if (!videos.length) {
    return null;
  }

  // Show only top 2 videos for more compact layout
  const displayVideos = videos.slice(0, 2);

  return (
    <section className="mb-12 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Video Highlights
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Top videos with full transcripts for quick reference
          </p>
        </div>

        {/* Channel promotion links */}
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="https://www.youtube.com/@andi1984dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-gradient-to-r from-red-50 to-pink-50 px-3 py-1.5 font-medium text-red-700 transition-all hover:border-red-300 hover:shadow-md dark:border-red-900 dark:from-red-950 dark:to-pink-950 dark:text-red-400 dark:hover:border-red-800"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="hidden sm:inline">YouTube</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="https://www.twitch.tv/andi1984"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 px-3 py-1.5 font-medium text-purple-700 transition-all hover:border-purple-300 hover:shadow-md dark:border-purple-900 dark:from-purple-950 dark:to-indigo-950 dark:text-purple-400 dark:hover:border-purple-800"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
            </svg>
            <span className="hidden sm:inline">Twitch</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {displayVideos.map((video) => {
          const slug = typeof video.slug === "string" ? video.slug : "";
          const title = typeof video.title === "string" ? video.title : "";
          const description =
            typeof video.description === "string"
              ? video.description
              : undefined;
          const heroImage =
            typeof video.heroImage === "string" ? video.heroImage : undefined;
          const youtubeMeta =
            typeof video.youtube === "object" && video.youtube !== null
              ? (video.youtube as VideoHighlight["youtube"])
              : undefined;
          const youtubeUrl = youtubeMeta?.url ?? (youtubeMeta?.videoId
            ? `https://www.youtube.com/watch?v=${youtubeMeta.videoId}`
            : undefined);
          const viewsLabel = youtubeMeta?.viewsText
            ? `${youtubeMeta.viewsText} views`
            : youtubeMeta?.views
            ? `${youtubeMeta.views.toLocaleString()} views`
            : undefined;
          const publishedLabel = formatPublishedDate(youtubeMeta?.published);

          return (
            <article
              key={slug || title}
              className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-200 hover:shadow-lg sm:flex-row dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative w-full overflow-hidden bg-slate-100 sm:w-48 sm:flex-shrink-0 dark:bg-slate-900">
                <div className="aspect-video sm:h-full sm:aspect-auto">
                  {heroImage ? (
                    <Image
                      src={heroImage}
                      alt={title || "YouTube video thumbnail"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 640px) 192px, 100vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-slate-600 dark:text-slate-400">
                      No thumbnail
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-slate-50">
                    {title}
                  </h3>
                  {(viewsLabel || publishedLabel) && (
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {[viewsLabel, publishedLabel].filter(Boolean).join(" • ")}
                    </p>
                  )}
                  {description && (
                    <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {description}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 text-xs">
                  <Link
                    href={`/posts/${slug}`}
                    className="inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                  >
                    Read transcript
                  </Link>
                  {youtubeUrl && (
                    <Link
                      href={youtubeUrl}
                      className="inline-flex items-center justify-center rounded-md border border-slate-200 px-3 py-1.5 font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch
                    </Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default VideoHighlights;
