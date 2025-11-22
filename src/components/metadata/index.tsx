import { FC } from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";

const Metadata: FC<{ devto?: string; date?: string }> = ({ devto, date }) => {
  if (!devto && !date) {
    return null;
  }

  return (
    <aside className="flex flex-wrap items-center gap-3 py-4">
      {devto && (
        <Link
          href={devto}
          target="_blank"
          className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          Read on Dev.to
        </Link>
      )}
      {date && (
        <span className="inline-flex items-center rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          Published {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      )}
    </aside>
  );
};

export default Metadata;
