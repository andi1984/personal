import { FC } from "react";
import { Link } from "@tanstack/react-router";
import { FiHome, FiChevronRight } from "react-icons/fi";

interface BreadcrumbProps {
  current: string;
}

/**
 * Breadcrumb navigation component showing current location.
 * Helps users understand they're on a dedicated page and provides
 * easy navigation back to the home page.
 */
const Breadcrumb: FC<BreadcrumbProps> = ({ current }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
    >
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
      >
        <FiHome className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <FiChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600" />
      <span className="font-medium text-slate-700 dark:text-slate-200">
        {current}
      </span>
    </nav>
  );
};

export default Breadcrumb;
