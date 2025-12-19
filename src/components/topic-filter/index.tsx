"use client";

import { FC, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FiCheck, FiX } from "react-icons/fi";
import { formatTopicName } from "@/lib/get_topics";

interface TopicFilterProps {
  topics: { topic: string; count: number }[];
}

/**
 * Multi-select topic filter component.
 * Allows users to filter posts/notes by one or more topics.
 * Filter state is stored in URL search params for shareability.
 */
const TopicFilter: FC<TopicFilterProps> = ({ topics }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get currently selected topics from URL
  const selectedTopics = searchParams.getAll("topic");

  const toggleTopic = useCallback(
    (topic: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // Remove old 'filter' param if it exists (migration from old system)
      params.delete("filter");

      if (selectedTopics.includes(topic)) {
        // Remove this topic
        params.delete("topic");
        selectedTopics
          .filter((t) => t !== topic)
          .forEach((t) => params.append("topic", t));
      } else {
        // Add this topic
        params.append("topic", topic);
      }

      const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [searchParams, router, pathname, selectedTopics],
  );

  const clearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("topic");
    params.delete("filter");
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.push(newUrl, { scroll: false });
  }, [searchParams, router, pathname]);

  if (topics.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Filter by topic
        </h3>
        {selectedTopics.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <FiX className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {topics.map(({ topic, count }) => {
          const isSelected = selectedTopics.includes(topic);
          return (
            <button
              key={topic}
              onClick={() => toggleTopic(topic)}
              className={`
                inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all
                ${
                  isSelected
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }
              `}
              aria-pressed={isSelected}
            >
              {isSelected && <FiCheck className="h-3 w-3" />}
              {formatTopicName(topic)}
              <span
                className={`text-xs ${isSelected ? "text-slate-300 dark:text-slate-600" : "text-slate-400 dark:text-slate-500"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {selectedTopics.length > 0 && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {selectedTopics.length} topic{selectedTopics.length > 1 ? "s" : ""}{" "}
          selected
        </p>
      )}
    </div>
  );
};

export default TopicFilter;
