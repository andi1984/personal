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
    <section className="space-y-6">
      <div className="mx-auto max-w-3xl text-center sm:max-w-4xl">
        <h2 className="bg-gradient-to-r from-indigo-500 via-emerald-400 to-emerald-600 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
          YouTube Highlights
        </h2>
        <p className="mt-2 text-sm text-slate-700 dark:text-emerald-50">
          Dive into the three most-watched videos from my channel. Each recap links to a full transcript so you can skim or read at your own pace before jumping to YouTube.
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
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-200/70 bg-white/95 shadow-lg shadow-emerald-500/10 transition hover:-translate-y-1 hover:shadow-xl dark:border-emerald-800/60 dark:bg-emerald-950/70"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-emerald-100 dark:bg-emerald-900">
                {heroImage ? (
                  <Image
                    src={heroImage}
                    alt={title || "YouTube video thumbnail"}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-emerald-800 dark:text-emerald-200">
                    Thumbnail unavailable
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-emerald-900 transition duration-200 group-hover:text-emerald-700 dark:text-emerald-100 dark:group-hover:text-emerald-50">
                    {title}
                  </h3>
                  {(viewsLabel || publishedLabel) && (
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-200">
                      {[viewsLabel, publishedLabel].filter(Boolean).join(" • ")}
                    </p>
                  )}
                  {description && (
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-emerald-100">
                      {description}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex flex-col gap-2 text-sm font-medium">
                  <Link
                    href={`/posts/${slug}`}
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-white transition duration-200 hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                  >
                    Read the transcript
                  </Link>
                  {youtubeUrl && (
                    <Link
                      href={youtubeUrl}
                      className="inline-flex items-center justify-center rounded-full border border-emerald-600 px-4 py-2 text-emerald-700 transition duration-200 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-emerald-300 dark:text-emerald-100 dark:hover:bg-emerald-900"
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
