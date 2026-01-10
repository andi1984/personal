import { FC } from "react";

const Metadata: FC<{ devto?: string; date?: string | Date }> = ({ devto, date }) => {
  if (!devto && !date) {
    return null;
  }

  return (
    <aside className="flex flex-wrap items-center gap-3">
      {devto && (
        <a
          href={devto}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg border-2 border-slate-900 bg-white px-3 py-1 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-100 dark:border-slate-100 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900"
        >
          Read on Dev.to
        </a>
      )}
      {date && (
        <span className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          Published{" "}
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      )}
    </aside>
  );
};

export default Metadata;
