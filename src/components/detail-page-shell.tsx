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
        "mx-auto w-full max-w-6xl space-y-2 px-3 pb-6 pt-3 sm:space-y-5 sm:px-5 sm:pb-10 sm:pt-5 lg:space-y-7 lg:px-7 lg:pb-14",
        className,
      )}
    >
      {backSlot ? (
        <div className="mx-auto flex w-full max-w-5xl justify-start">{backSlot}</div>
      ) : null}
      {children}
    </div>
  );
};

export default DetailPageShell;
