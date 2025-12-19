/**
 * Holiday Icon Component
 * Replaces the plant emoji with a festive alternative during holidays
 * HOLIDAY: Delete this file after January 5
 */

"use client";

import { useEffect, useState } from "react";
import { isHolidayPeriod } from "@/lib/holiday-utils";

export const HolidayIcon = () => {
  const [isHoliday, setIsHoliday] = useState(false);
  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    setIsHoliday(isHolidayPeriod());
    // During holidays, show festive icon based on date
    // December 20-31: Christmas tree
    // January 1-5: New Year fireworks
    const now = new Date();
    setIsNewYear(now.getMonth() === 0);
  }, []);

  if (!isHoliday) return <span>🌱</span>;

  return (
    <span className="relative inline-block transition-transform group-hover:scale-110">
      {isNewYear ? "🎆" : "🎄"}
    </span>
  );
};
