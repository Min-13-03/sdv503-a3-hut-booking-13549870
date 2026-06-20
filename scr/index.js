import { loadBookings } from "./data.js";
import { createBooking, cancelBooking } from "./booking.js";
import { occupancySummary } from "./summary.js";
import { ask } from "./capacity.js";
// Available huts (must match your capacity config)
const huts = ["Alpine", "Forest", "Lake"];

// Load existing data on start
let bookings = loadBookings();

// Main program loop
async function main() {
  console.log("=== Hut Booking System ===");

  while (true) {
    console.log("\nMenu:");
    console.log("1. Add Booking");
    console.log("2. Cancel Booking");
    console.log("3. View Occupancy Summary");
    console.log("4. Exit");

    const choice = await ask("Choose an option: ");

    // Add booking
    if (choice === "1") {
      const name = await ask("Enter name: ");
      const hut = await ask("Enter hut (Alpine/Forest/Lake): ");
      const startDate = await ask("Enter start date (YYYY-MM-DD): ");
      const nights = parseInt(await ask("Enter number of nights: "));
      const partySize = parseInt(await ask("Enter party size: "));

      const result = createBooking(
        { name, hut, startDate, nights, partySize },
        bookings,
        huts
      );

      console.log(result);
    }

    // Cancel booking
    else if (choice === "2") {
      const id = await ask("Enter booking ID: ");
      const result = cancelBooking(id, bookings);
      console.log(result);
    }

    // Show summary
    else if (choice === "3") {
      const summary = occupancySummary(bookings);

      console.log("\nOccupancy Summary:");
      for (const date in summary) {
        console.log(`${date}: ${summary[date]} people`);
      }
    }

    // Exit program
    else if (choice === "4") {
      console.log("Goodbye!");
      process.exit(0);
    }

    // Invalid input handling
    else {
      console.log("Invalid option, please try again.");
    }
  }
}

// Start app
main();
