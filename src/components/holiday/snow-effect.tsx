/**
 * Snow Effect Component
 * Renders subtle falling snowflakes
 * HOLIDAY: Delete this file after January 5
 */

"use client";

import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

export const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Generate only 6 subtle snowflakes for a gentle effect
    const flakes: Snowflake[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="holiday-snow text-sm"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
};
