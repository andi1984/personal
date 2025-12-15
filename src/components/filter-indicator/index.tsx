"use client";

import { FC } from "react";
import { FiX } from "react-icons/fi";
import { useFilter, FilterTerm } from "@/hooks/use-filter";

const filterColors: Record<
  Exclude<FilterTerm, null>,
  { bg: string; text: string; border: string }
> = {
  react: {
    bg: "bg-cyan-50 dark:bg-cyan-950",
    text: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-200 dark:border-cyan-800",
  },
  typescript: {
    bg: "bg-blue-50 dark:bg-blue-950",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  css: {
    bg: "bg-purple-50 dark:bg-purple-950",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
  },
};

const FilterIndicator: FC = () => {
  const { filter, clearFilter, isFiltered } = useFilter();

  if (!isFiltered || !filter) return null;

  const colors = filterColors[filter];
  const displayName = filter.charAt(0).toUpperCase() + filter.slice(1);

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${colors.bg} ${colors.border}`}
    >
      <span className={`text-sm font-medium ${colors.text}`}>
        Filtered by: <strong>{displayName}</strong>
      </span>
      <button
        onClick={clearFilter}
        className={`ml-1 rounded-full p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10 ${colors.text}`}
        aria-label={`Clear ${displayName} filter`}
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FilterIndicator;
