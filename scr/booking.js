// Checks if a booking would exceed hut capacity on any night
export function canBook(hut, bookings, startDate, nights, partySize) {
  const start = new Date(startDate);