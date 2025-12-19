/**
 * Holiday Wrapper Component
 * Conditionally applies holiday features based on date
 * HOLIDAY: Delete this file after January 5
 */

"use client";

import { useEffect, useState } from "react";
import { isHolidayPeriod } from "@/lib/holiday-utils";
import { SnowEffect } from "./snow-effect";

interface HolidayWrapperProps {
  children: React.ReactNode;
}

export const HolidayWrapper = ({ children }: HolidayWrapperProps) => {
  const [isHoliday, setIsHoliday] = useState(false);

  useEffect(() => {
    const active = isHolidayPeriod();
    setIsHoliday(active);

    // Add holiday class to html element for CSS theming
    if (active) {
      document.documentElement.classList.add("holiday-active");
    }

    return () => {
      document.documentElement.classList.remove("holiday-active");
    };
  }, []);

  return (
    <>
      {children}
      {isHoliday && <SnowEffect />}
    </>
  );
};
