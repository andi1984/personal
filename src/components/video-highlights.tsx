import { Link } from "@tanstack/react-router";
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

const VideoHighlights: FC<{ videos: VideoHighlight[] }> = ({ videos }) => {
  if (!videos.length) {
    return null;
  }

  const displayVideos = videos.slice(0, 2);

  return (
    <section className="mb-12">
      {/* Simple header */}
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
          Video Highlights
        </h2>
        <div className="flex items-center gap-4">
          <a
            href="https://www.youtube.com/@andi1984dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
          >
            YouTube →
          </a>
          <a
            href="https://www.twitch.tv/andi1984"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
          >
            Twitch →
          </a>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {displayVideos.map((video) => {
          const slug = typeof video.slug === "string" ? video.slug : "";
          const title = typeof video.title === "string" ? video.title : "";
          const heroImage =
            typeof video.heroImage === "string" ? video.heroImage : undefined;
          const youtubeMeta =
            typeof video.youtube === "object" && video.youtube !== null
              ? (video.youtube as VideoHighlight["youtube"])
              : undefined;
          const viewsLabel = youtubeMeta?.viewsText
            ? `${youtubeMeta.viewsText} views`
            : youtubeMeta?.views
              ? `${youtubeMeta.views.toLocaleString()} views`
              : undefined;

          return (
            <article
              key={slug || title}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Thumbnail */}
              <Link
                to={`/posts/${slug}`}
                className="relative block aspect-video overflow-hidden"
              >
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    aria-hidden="true"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800" />
                )}
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    <svg
                      className="ml-0.5 h-5 w-5 text-slate-900"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="p-4">
                <Link to={`/posts/${slug}`}>
                  <h3 className="font-semibold leading-snug text-slate-900 transition-colors hover:text-slate-600 dark:text-slate-50 dark:hover:text-slate-300">
                    {title}
                  </h3>
                </Link>
                {viewsLabel && (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {viewsLabel}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default VideoHighlights;
