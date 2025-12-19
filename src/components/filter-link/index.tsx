import { FC, ReactNode } from "react";
import Link from "next/link";

interface FilterLinkProps {
  topic: string;
  children: ReactNode;
  className?: string;
  underlineClassName?: string;
}

/**
 * A link component that navigates to /posts with a topic filter applied.
 * Used in the hero section to make technology names clickable.
 */
const FilterLink: FC<FilterLinkProps> = ({
  topic,
  children,
  className = "",
  underlineClassName = "",
}) => {
  return (
    <Link
      href={`/posts?topic=${topic}`}
      className={`relative inline-block font-semibold text-slate-900 dark:text-slate-50 transition-opacity hover:opacity-80 cursor-pointer group ${className}`}
      title={`View ${topic} articles`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-[2px] w-full transition-all group-hover:h-[3px] ${underlineClassName}`}
      />
    </Link>
  );
};

export default FilterLink;
