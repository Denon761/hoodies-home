const DAY_MS = 86400000;

function addDays(date, days) {
  return new Date(date.getTime() + days * DAY_MS);
}

function formatShort(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getEstimatedDelivery({ minDays = 4, maxDays = 7 } = {}) {
  const now = new Date();
  const start = addDays(now, minDays);
  const end = addDays(now, maxDays);
  const sameMonth = start.getMonth() === end.getMonth();
  return sameMonth
    ? `${start.toLocaleDateString("en-US", { month: "short" })} ${start.getDate()} – ${end.getDate()}`
    : `${formatShort(start)} – ${formatShort(end)}`;
}
