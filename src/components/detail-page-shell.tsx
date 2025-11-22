import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type DetailPageShellProps = {
  backSlot?: ReactNode;
  children: ReactNode;
  className?: string;
};

const DetailPageShell = ({ backSlot, children, className }: DetailPageShellProps) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl space-y-8 px-6 pb-16 pt-8 md:px-8 lg:px-12",
        className,
      )}
    >
      {backSlot ? (
        <div className="mx-auto flex w-full max-w-4xl justify-start">{backSlot}</div>
      ) : null}
      {children}
    </div>
  );
};

export default DetailPageShell;
