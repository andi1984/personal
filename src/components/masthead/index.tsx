import React from "react";
import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaSquareRss } from "react-icons/fa6";
import DarkModeToggle from "../dark-mode-toggle";
import { HolidayIcon, HolidayBanner } from "../holiday"; // HOLIDAY: Remove this import after Jan 5

const MastHead: FC = () => {
  return (
    <header className="relative mb-8 flex items-center justify-between py-6">
      <HolidayBanner /> {/* HOLIDAY: Remove this line after Jan 5 */}
      <Link href="/" className="group flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-2xl transition-transform group-hover:scale-105 dark:bg-slate-100">
          <HolidayIcon /> {/* HOLIDAY: Replace with 🌱 after Jan 5 */}
        </div>
        <div className="hidden md:block">
          <div className="text-lg font-bold text-slate-900 dark:text-slate-50">
            Gardening WebDev
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Code & Plants
          </div>
        </div>
      </Link>

      <nav className="flex items-center gap-3">
        <Link href="/rss.xml">
          <Button className="rss-button flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-100 dark:bg-orange-950 dark:text-orange-300 dark:hover:bg-orange-900">
            <FaSquareRss className="h-4 w-4" />
            <span className="hidden sm:inline">RSS</span>
          </Button>
        </Link>
        <Link target="_blank" href="/about">
          <Button className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
            About
          </Button>
        </Link>
        <DarkModeToggle />
      </nav>
    </header>
  );
};

export default MastHead;
