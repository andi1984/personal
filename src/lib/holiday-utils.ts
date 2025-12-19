/**
 * Holiday utilities for date-based feature detection
 * HOLIDAY: Delete this file after January 5
 */

/**
 * Checks if the current date is within the holiday period (Dec 20 - Jan 5)
 * @returns true if currently in holiday period
 */
export const isHolidayPeriod = (): boolean => {
  // TESTING: Temporarily return true to test the holiday features
  // TODO: Remove this line after testing
  return true;

  // const now = new Date();
  // const month = now.getMonth(); // 0-indexed (0 = January, 11 = December)
  // const day = now.getDate();

  // // December 20 onwards
  // if (month === 11 && day >= 20) return true;

  // // January 1-5
  // if (month === 0 && day <= 5) return true;

  // return false;
};

/**
 * Gets the appropriate holiday greeting based on current date
 * @returns Holiday greeting string or empty string if not holiday period
 */
export const getHolidayGreeting = (): string => {
  const now = new Date();
  const month = now.getMonth();

  if (month === 11) return "Happy Holidays!";
  if (month === 0) return "Happy New Year!";
  return "";
};
