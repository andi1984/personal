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
        "mx-auto w-full max-w-4xl",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default ReadingPane;
