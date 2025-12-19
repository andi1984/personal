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
 * Supports both legacy ?filter= and new ?topic= params.
 */
const TopicFilter: FC<TopicFilterProps> = ({ topics }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get currently selected topics from URL (support both legacy and new params)
  const legacyFilter = searchParams.get("filter");
  const topicParams = searchParams.getAll("topic");

  // Combine legacy filter with topic params for display
  const selectedTopics = legacyFilter
    ? [legacyFilter, ...topicParams.filter((t) => t !== legacyFilter)]
    : topicParams;

  const toggleTopic = useCallback(
    (topic: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // Remove old 'filter' param if it exists (migration from old system)
      params.delete("filter");

      // Get current topics without legacy filter
      const currentTopics = legacyFilter
        ? [legacyFilter, ...topicParams.filter((t) => t !== legacyFilter)]
        : topicParams;

      if (currentTopics.includes(topic)) {
        // Remove this topic
        params.delete("topic");
        currentTopics
          .filter((t) => t !== topic)
          .forEach((t) => params.append("topic", t));
      } else {
        // Add this topic (also migrate any legacy filter to topic params)
        params.delete("topic");
        [...currentTopics, topic].forEach((t) => params.append("topic", t));
      }

      const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [searchParams, router, pathname, legacyFilter, topicParams],
  );

  const clearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("topic");
    params.delete("filter");
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.push(newUrl, { scroll: false });
  }, [searchParams, router, pathname]);

  if (topics.length === 0) return null;

  const hasActiveFilters = selectedTopics.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Filter by topic
        </h3>
        {hasActiveFilters && (
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

      {hasActiveFilters && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {selectedTopics.length} topic{selectedTopics.length > 1 ? "s" : ""}{" "}
          selected
        </p>
      )}
    </div>
  );
};

export default TopicFilter;
