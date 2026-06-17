export function validateBookingInput({ name, hut, startDate, nights, partySize }, huts) {
// Name validation
  if (!name || name.trim() === "") {
    return "Name cannot be empty";
  }

  // Hut exists
  if (!huts.includes(hut)) {
    return "Hut does not exist";
  }

  // Numeric + integer checks
  if (!Number.isInteger(nights) || !Number.isInteger(partySize)) {
    return "Nights and party size must be integers";
  }

  if (nights <= 0 || partySize <= 0) {
    return "Nights and party size must be greater than zero";
  }

  // Date validation (no past bookings)
  const today = new Date();
  today.setHours(0,0,0,0);
  const start = new Date(startDate);

  if (start < today) {
    return "Arrival date cannot be in the past";
  }

  return null; // valid
}
