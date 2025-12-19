/**
 * Holiday Banner Component
 * Shows a subtle greeting message in the masthead
 * HOLIDAY: Delete this file after January 5
 */

"use client";

import { useEffect, useState } from "react";
import { getHolidayGreeting } from "@/lib/holiday-utils";

export const HolidayBanner = () => {
  const [greeting, setGreeting] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("🎄");

  useEffect(() => {
    const greetingText = getHolidayGreeting();
    setGreeting(greetingText);
    // Set emoji based on month
    const now = new Date();
    setEmoji(now.getMonth() === 0 ? "🎆" : "🎄");
  }, []);

  if (!greeting) return null;

  return (
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
      <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 border border-green-200 dark:border-green-800/50">
        <span className="text-base">✨</span>
        {greeting}
        <span className="text-base">{emoji}</span>
      </span>
    </div>
  );
};
