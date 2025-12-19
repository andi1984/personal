import { FC } from "react";
import Link from "next/link";
import { cacheTag } from "next/cache";
import { FaMastodon, FaYoutube, FaDev, FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Number from "./number.client";

interface SocialPlatform {
  name: string;
  url: string;
  icon: typeof FaMastodon;
  color: string;
  hoverColor: string;
}

const platforms: SocialPlatform[] = [
  {
    name: "Dev.to",
    url: "https://dev.to/andi1984",
    icon: FaDev,
    color: "text-slate-700 dark:text-slate-300",
    hoverColor: "group-hover:text-slate-900 dark:group-hover:text-white",
  },
  {
    name: "Mastodon",
    url: "https://toot.cafe/@andi1984",
    icon: FaMastodon,
    color: "text-purple-600 dark:text-purple-400",
    hoverColor: "group-hover:text-purple-700 dark:group-hover:text-purple-300",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@andi1984dev",
    icon: FaYoutube,
    color: "text-red-600 dark:text-red-400",
    hoverColor: "group-hover:text-red-700 dark:group-hover:text-red-300",
  },
  {
    name: "GitHub",
    url: "https://github.com/andi1984",
    icon: FaGithub,
    color: "text-slate-800 dark:text-slate-200",
    hoverColor: "group-hover:text-slate-900 dark:group-hover:text-white",
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const platformCount = getCount(platform.name);
          return (
            <Link
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm"
            >
              <Icon
                className={`h-6 w-6 transition-colors ${platform.color} ${platform.hoverColor}`}
              />
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                  <Number n={platformCount} />
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  {platform.name}
                  <FiExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <span className="font-medium text-slate-700 dark:text-slate-300 tabular-nums">
          <Number n={count.total} />
        </span>
        <span>followers across the web</span>
      </div>
    </div>
  );
};

export default SocialMediaInfluence;
