// Checks if a booking would exceed hut capacity on any night
export function canBook(hut, bookings, startDate, nights, partySize) {
  const start = new Date(startDate);
  for (let i = 0; i < nights; i++) {
    const currentNight = new Date(start);
    currentNight.setDate(start.getDate() + i);

    // Sum existing bookings for this hut and night
    const totalBooked = bookings
      .filter(b => b.hut === hut)
      .reduce((sum, b) => {
        const bStart = new Date(b.startDate);
        const bEnd = new Date(b.startDate);
    
        // Check if booking overlaps this night
        if (currentNight >= bStart && currentNight < bEnd) {
          return sum + b.partySize;
        }
        return sum;
      }, 0);

    // Capacity decision (selection)
    if (totalBooked + partySize > HUT_CAPACITY[hut]) {
      return {
        allowed: false,
        message: `Booking exceeds capacity on ${currentNight.toDateString()}`
      };
    }
  }
  
  return { allowed: true };
}  bEnd.setDate(bStart.getDate() + b.nights);  
