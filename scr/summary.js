export function occupancySummary(bookings) {
  const summary = {};

  bookings.forEach(b => {
    const start = new Date(b.startDate);

    for (let i = 0; i < b.nights; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);

      const key = date.toDateString();

      if (!summary[key]) summary[key] = 0;
      summary[key] += b.partySize;
    }
  });

  return summary;
}
