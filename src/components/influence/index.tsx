import { FC } from "react";
import Link from "next/link";
import { cacheTag } from "next/cache";
import { FaMastodon, FaYoutube, FaDev, FaGithub } from "react-icons/fa";
import { HiSparkles, HiHeart } from "react-icons/hi2";
import Number from "./number.client";

interface SocialPlatform {
  name: string;
  url: string;
  icon: typeof FaMastodon;
  gradient: string;
  shadowColor: string;
  description: string;
  ariaLabel: string;
}

const platforms: SocialPlatform[] = [
  {
    name: "Dev.to",
    url: "https://dev.to/andi1984",
    icon: FaDev,
    gradient: "from-slate-800 to-slate-600 dark:from-slate-300 dark:to-slate-100",
    shadowColor: "hover:shadow-slate-500/25 dark:hover:shadow-slate-400/20",
    description: "Technical articles & tutorials",
    ariaLabel: "Follow me on Dev.to for technical articles and tutorials",
  },
  {
    name: "Mastodon",
    url: "https://toot.cafe/@andi1984",
    icon: FaMastodon,
    gradient: "from-purple-600 to-purple-400",
    shadowColor: "hover:shadow-purple-500/25",
    description: "Thoughts & discussions",
    ariaLabel: "Follow me on Mastodon for thoughts and discussions",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@andi1984dev",
    icon: FaYoutube,
    gradient: "from-red-600 to-red-400",
    shadowColor: "hover:shadow-red-500/25",
    description: "Video tutorials & talks",
    ariaLabel: "Subscribe on YouTube for video tutorials and talks",
  },
  {
    name: "GitHub",
    url: "https://github.com/andi1984",
    icon: FaGithub,
    gradient: "from-slate-900 to-slate-700 dark:from-slate-200 dark:to-slate-400",
    shadowColor: "hover:shadow-slate-500/25 dark:hover:shadow-slate-400/20",
    description: "Open source projects",
    ariaLabel: "Follow me on GitHub for open source projects",
  },
];

const SocialMediaInfluence: FC = async () => {
  "use cache";
  cacheTag("socialcount");

  async function getFollowerCount() {
    const api = await import("../../app/api/follower/route");
    return api.GET();
  }

  const countResponse = await getFollowerCount();
  const count = await countResponse.json();

  const getCount = (platform: string): number => {
    switch (platform.toLowerCase()) {
      case "dev.to":
        return count.devto;
      case "mastodon":
        return count.mastodon;
      case "youtube":
        return count.youtube;
      case "github":
        return count.github;
      default:
        return 0;
    }
  };

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andi",
    url: "https://andremotzu.com",
    sameAs: platforms.map((p) => p.url),
    knowsAbout: ["Web Development", "React", "TypeScript", "CSS", "Frontend Development"],
  };

  return (
    <div className="relative">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
        <div className="absolute -left-4 -top-4 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl" />
        <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-2xl" />
      </div>

      <div className="relative rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/80 sm:p-8">
        {/* Header with sparkle */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-1.5 text-sm font-medium text-purple-700 dark:from-purple-500/20 dark:to-pink-500/20 dark:text-purple-300">
            <HiSparkles className="h-4 w-4" />
            <span>Join the community</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Let&apos;s Connect & Grow Together
          </h3>
          <p className="mx-auto mt-3 max-w-md text-slate-600 dark:text-slate-400">
            Follow along for web development insights, tutorials, and open source projects.
            I&apos;d love to have you as part of the journey!
          </p>
        </div>

        {/* Social platform cards */}
        <nav
          aria-label="Social media profiles"
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const platformCount = getCount(platform.name);
            return (
              <Link
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={platform.ariaLabel}
                className={`group relative flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 dark:hover:border-slate-600 ${platform.shadowColor}`}
              >
                {/* Icon with gradient background */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${platform.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-7 w-7 text-white dark:text-slate-900" />
                </div>

                {/* Count and platform name */}
                <div className="text-center">
                  <div className="text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
                    <Number n={platformCount} />
                  </div>
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {platform.name}
                  </div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                    {platform.description}
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-3 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-12" />
              </Link>
            );
          })}
        </nav>

        {/* Total followers section with CTA */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/25">
              <HiHeart className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
                <Number n={count.total} />
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                amazing followers across the web
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 sm:text-right">
            Thank you for being part of this community!
            <br />
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Your support means everything.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaInfluence;
