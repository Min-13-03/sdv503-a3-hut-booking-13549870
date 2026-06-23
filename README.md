# sdv503-a3-hut-booking-13549870
This application is a standalone command-line tool designed for Department of Conservation (DOC) regional offices to manage backcountry hut bookings. It replaces paper-based tracking with a reliable system that prevents overbooking by enforcing a strict per-night capacity rule across multi-night stays. The system validates all user inputs, manages a persistent data store via a local JSON file, and provides rangers with real-time occupancy summaries and cancellation capabilities.
# Features
Hut Management: Maintains records for Alpine, Forest, and Lake huts with fixed bunk capacities.
Per-Night Capacity Logic: The central rule ensures that any booking which exceeds capacity on even a single night of a multi-night stay is rejected.
Input Validation: Rejects past dates, non-numeric values, and empty names before any data is stored.
Data Persistence: Automatically loads and saves bookings to data/bookings.json after every change, ensuring integrity across restarts.
Occupancy Reports: Generates summaries of total people booked per date.
# Installation & Run Command
This application requires Node.js to be installed on your system.
1.	Clone or unzip the repository into a local folder.
2.	Open your terminal and navigate to the project root.
3.	Run the application using the following command: 
4.	node src/index.js

# Notes
The application uses a per-night iteration approach to calculate capacity. Unlike a simple check of start/end dates, this system iterates through every individual night of a requested stay and sums the party sizes of all overlapping bookings for that specific date. This ensures the "Central Rule" is met: if a hut is full on night two of a three-night stay, the entire request is rejected to prevent overbooking.
# Author
•	Student ID: 13549870
•	Name: [Kata], [Nazmin]
•	Course: SDV503 Software Design and Development
