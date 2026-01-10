import { Link } from "@tanstack/react-router";

interface BackToHomeProps {
  className?: string;
}

const BackToHome = ({ className = "" }: BackToHomeProps) => {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 ${className}`}
      aria-label="Back to homepage"
    >
      ← Back to Home
    </Link>
  );
};

export default BackToHome;
