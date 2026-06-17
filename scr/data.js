import fs from "fs";

const FILE = "./bookings.json";

// Load bookings safely
export function loadBookings() {
  try {
    if (!fs.existsSync(FILE)) {
      return [];
    }

    const data = fs.readFileSync(FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Warning: Data file is corrupt. Starting fresh.");
    return []; // fallback (T9)
  }
}

// Save bookings after every change
export function saveBookings(bookings) {
  try {
    fs.writeFileSync(FILE, JSON.stringify(bookings, null, 2));
  } catch (err) {
    console.error("Error saving bookings:", err.message);
  }
}
