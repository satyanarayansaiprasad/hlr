/**
 * Calculates a rolling update date according to a 7-day cycle:
 * The displayed update date is ALWAYS 1 day before the start of the current 7-day cycle.
 * For example:
 * - If today is July 14, the current cycle is July 14..20, so it displays July 13.
 * - This date remains July 13 for July 14..20.
 * - On July 21 (start of next 7-day cycle), it updates to display July 20.
 */
export const getRollingUpdateDate = (targetDate = new Date()) => {
  // Anchor date: July 14, 2026 (month index 6 = July)
  const anchor = new Date(2026, 6, 14);
  const msPerDay = 24 * 60 * 60 * 1000;

  const diffDays = Math.floor((targetDate.getTime() - anchor.getTime()) / msPerDay);
  const cycleIndex = Math.floor(diffDays / 7);

  const cycleStartDate = new Date(anchor.getTime() + cycleIndex * 7 * msPerDay);
  const displayDate = new Date(cycleStartDate.getTime() - msPerDay);

  const month = displayDate.toLocaleString('default', { month: 'short' });
  const day = displayDate.getDate();
  const year = displayDate.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const getLastMonthDate = () => {
  return getRollingUpdateDate();
};

export const getFormattedLastMonthDate = () => {
  return getRollingUpdateDate();
};
