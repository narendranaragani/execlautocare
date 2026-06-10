/**
 * sheets.ts — Google Sheets integration via Google Apps Script Web App
 *
 * HOW IT WORKS:
 *  1. A Google Apps Script Web App acts as a free serverless endpoint.
 *  2. When a customer submits a booking, we POST all form data + a "Staff Status"
 *     column (pre-filled "Pending") to the Apps Script URL.
 *  3. The Apps Script appends one row to the connected Google Sheet.
 *  4. Staff open the sheet and manually update the "Staff Status" column
 *     (Pending → Confirmed → In Progress → Completed / Cancelled).
 *
 * SETUP INSTRUCTIONS (one-time, ~5 minutes):
 *  1. Go to https://script.google.com → New Project
 *  2. Paste the Apps Script code from /google-apps-script/booking-sheet.gs
 *  3. Click Deploy → New Deployment → Web App
 *     - Execute as: Me (your Google account)
 *     - Who has access: Anyone
 *  4. Copy the deployment URL and paste it below as SHEETS_WEBHOOK_URL
 *  5. Open the linked Google Sheet — it will auto-create headers on first submission.
 */

// ──────────────────────────────────────────────────────────────────
// 🔧 PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE:
// ──────────────────────────────────────────────────────────────────
const SHEETS_WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || "";

export interface BookingSheetPayload {
  bookingRef: string;
  submittedAt: string;       // ISO timestamp

  // ── Customer Details ──────────────────────────────────────────
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;

  // ── Vehicle Details ───────────────────────────────────────────
  carModel: string;
  carYear: string;
  fuelType: string;
  registrationNo: string;
  kilometers: string;

  // ── Service Details ───────────────────────────────────────────
  serviceCenter: string;
  serviceNames: string;      // comma-separated list
  requestDate: string;       // YYYY-MM-DD
  appointmentSlot: string;   // e.g. "10:00 AM"
  pickupRequired: string;    // Yes / No

  // ── Notes ─────────────────────────────────────────────────────
  customerNotes: string;

  // ── Staff-side column (NOT shown to customer) ─────────────────
  staffStatus: string;       // Always starts as "Pending"
  staffRemarks: string;      // Always starts as "" – staff fills this
}

/**
 * Sends booking data to Google Sheets.
 * Fires asynchronously — never blocks the booking confirmation UI.
 * Silently fails if the webhook URL is not configured (dev environments).
 */
export async function sendBookingToSheets(payload: BookingSheetPayload): Promise<void> {
  if (!SHEETS_WEBHOOK_URL) {
    console.warn(
      "[Sheets] VITE_SHEETS_WEBHOOK_URL is not set. Booking data was NOT sent to Google Sheets.\n" +
      "See src/lib/sheets.ts for setup instructions."
    );
    return;
  }

  try {
    // Google Apps Script requires form-encoded POST (not JSON) for simple no-auth calls
    const formBody = new URLSearchParams(payload as unknown as Record<string, string>).toString();

    await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",           // Apps Script doesn't return CORS headers on success
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
    });

    console.info("[Sheets] Booking data dispatched:", payload.bookingRef);
  } catch (err) {
    // Never let sheet errors crash the booking confirmation
    console.error("[Sheets] Failed to send booking data:", err);
  }
}
