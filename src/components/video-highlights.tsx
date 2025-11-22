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

  return (
    <section className="mb-20 space-y-8">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          YouTube Highlights
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400">
          My most-watched videos with full transcripts for quick reference.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {videos.map((video) => {
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
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                {heroImage ? (
                  <Image
                    src={heroImage}
                    alt={title || "YouTube video thumbnail"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-600 dark:text-slate-400">
                    Thumbnail unavailable
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                    {title}
                  </h3>
                  {(viewsLabel || publishedLabel) && (
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {[viewsLabel, publishedLabel].filter(Boolean).join(" • ")}
                    </p>
                  )}
                  {description && (
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {description}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex flex-col gap-2 text-sm">
                  <Link
                    href={`/posts/${slug}`}
                    className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                  >
                    Read transcript
                  </Link>
                  {youtubeUrl && (
                    <Link
                      href={youtubeUrl}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2.5 font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      target="_blank"
                    >
                      Watch on YouTube
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
