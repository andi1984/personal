import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ReadingPaneProps = {
  children: ReactNode;
  className?: string;
};

const ReadingPane = ({ children, className }: ReadingPaneProps) => {
  return (
    <section
      className={cn(
        "relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-emerald-200/80 bg-white/95 p-3 shadow-lg shadow-emerald-500/10 backdrop-blur-sm transition-colors dark:border-emerald-800/70 dark:bg-emerald-950/70 sm:rounded-3xl sm:p-5 md:p-7 lg:p-9",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_60%),linear-gradient(140deg,rgba(59,130,246,0.12),rgba(16,185,129,0.08),transparent)] sm:rounded-3xl"
      />
      <div className="relative z-10 flex flex-col gap-5 sm:gap-6 md:gap-7">{children}</div>
    </section>
  );
};

export default ReadingPane;
