export const getLastMonthDate = () => {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return lastMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
};

export const getFormattedLastMonthDate = () => {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const month = lastMonth.toLocaleString('default', { month: 'short' });
  const year = lastMonth.getFullYear();
  const day = 15; // We can use a fixed day like 15th or 20th for consistency
  return `${month} ${day}, ${year}`;
};
