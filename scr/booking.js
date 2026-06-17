import { validateBookingInput } from "./validation.js";
import { saveBookings } from "./data.js";

// Example hut capacities (adjust if needed)
const HUT_CAPACITY = {
  Alpine: 10,
  Forest: 8,
  Lake: 6
};

// Capacity check (T1, T2)
export function canBook(hut, bookings, startDate, nights, partySize) {
  const start = new Date(startDate);

  for (let i = 0; i < nights; i++) {
    const currentNight = new Date(start);
    currentNight.setDate(start.getDate() + i);

    // Calculate total occupancy for that night
    let total = 0;

    for (const b of bookings) {
      if (b.hut !== hut) continue;

      const bStart = new Date(b.startDate);
      const bEnd = new Date(b.startDate);
      bEnd.setDate(bStart.getDate() + b.nights);

      // check if overlaps this night
      if (currentNight >= bStart && currentNight < bEnd) {
        total += b.partySize;
      }
    }

    // exceeds capacity
    if (total + partySize > HUT_CAPACITY[hut]) {
      return {
        allowed: false,
        message: `Booking exceeds capacity on ${currentNight.toDateString()}`
      };
    }
  }

  return { allowed: true };
}

// Create booking
export function createBooking(input, bookings, huts) {
  // Validate input first (T3–T7)
  const error = validateBookingInput(input, huts);
  if (error) return error;

// Capacity check
  const check = canBook(
    input.hut,
    bookings,
    input.startDate,
    input.nights,
    input.partySize
  );

  if (!check.allowed) return check.message;

  // Create booking object
  const newBooking = {
    id: Date.now().toString(),
    ...input
  };

  bookings.push(newBooking);
  saveBookings(bookings);

  return `Booking confirmed (ID: ${newBooking.id})`;
}

// Cancel booking (T8)
export function cancelBooking(id, bookings) {
  const index = bookings.findIndex(b => b.id === id);

  if (index === -1) {
    return " Booking ID not found";
  }

  bookings.splice(index, 1);
  saveBookings(bookings);

  return "Booking cancelled successfully";
}
