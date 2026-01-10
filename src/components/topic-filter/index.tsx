import { FC, useCallback } from "react";
import { useSearch, useNavigate, useLocation } from "@tanstack/react-router";
import { FiCheck, FiX } from "react-icons/fi";
import { formatTopicName } from "@/lib/get_topics";

interface TopicFilterProps {
  topics: { topic: string; count: number }[];
}

type SearchParams = {
  topic?: string | string[];
};

/**
 * Multi-select topic filter component.
 * Allows users to filter posts/notes by one or more topics.
 * Uses ?topic= URL param which supports multiple values.
 */
const TopicFilter: FC<TopicFilterProps> = ({ topics: availableTopics }) => {
  const search = useSearch({ strict: false }) as SearchParams;
  const navigate = useNavigate();
  const location = useLocation();

  // Normalize topic to always be an array
  const selectedTopics = Array.isArray(search.topic)
    ? search.topic
    : search.topic
      ? [search.topic]
      : [];

  const toggleTopic = useCallback(
    (topic: string) => {
      let newTopics: string[];

      if (selectedTopics.includes(topic)) {
        // Remove this topic
        newTopics = selectedTopics.filter((t) => t !== topic);
      } else {
        // Add this topic
        newTopics = [...selectedTopics, topic];
      }

      navigate({
        to: location.pathname,
        search: newTopics.length > 0 ? { topic: newTopics } : {},
        replace: true,
      });
    },
    [selectedTopics, navigate, location.pathname]
  );

  const clearAll = useCallback(() => {
    navigate({
      to: location.pathname,
      search: {},
      replace: true,
    });
  }, [navigate, location.pathname]);

  if (availableTopics.length === 0) return null;

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
        {availableTopics.map(({ topic, count }) => {
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
