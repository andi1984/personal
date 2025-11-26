import { FC } from "react";

interface SkipToSectionProps {
  targetId: string;
  label: string;
}

const SkipToSection: FC<SkipToSectionProps> = ({ targetId, label }) => {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:bg-slate-100 dark:focus:text-slate-900"
      aria-label={label}
    >
      {label}
    </a>
  );
};

export default SkipToSection;
