import { FC, ReactNode } from "react";
import Link from "next/link";
import { FilterTerm } from "@/hooks/use-filter";

interface FilterLinkProps {
  filter: Exclude<FilterTerm, null>;
  children: ReactNode;
  className?: string;
  underlineClassName?: string;
}

/**
 * A link component that navigates to /posts with a filter applied.
 * Used in the hero section to make technology names clickable.
 */
const FilterLink: FC<FilterLinkProps> = ({
  filter,
  children,
  className = "",
  underlineClassName = "",
}) => {
  return (
    <Link
      href={`/posts?filter=${filter}`}
      className={`relative inline-block font-semibold text-slate-900 dark:text-slate-50 transition-opacity hover:opacity-80 cursor-pointer group ${className}`}
      title={`View ${filter} articles`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-[2px] w-full transition-all group-hover:h-[3px] ${underlineClassName}`}
      />
    </Link>
  );
};

export default FilterLink;
