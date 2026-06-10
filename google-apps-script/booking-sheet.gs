/**
 * Excel Autocare — Booking to Google Sheets
 * ============================================================
 * Deploy this as a Google Apps Script Web App.
 *
 * COLUMNS IN ORDER:
 *  A  Booking Ref
 *  B  Submitted At
 *  C  Customer Name
 *  D  Phone
 *  E  Email
 *  F  Address
 *  G  City
 *  H  Car Model
 *  I  Manufacturing Year
 *  J  Fuel Type
 *  K  Registration No
 *  L  Kilometers
 *  M  Service Center
 *  N  Services Booked
 *  O  Request Date
 *  P  Appointment Slot
 *  Q  Pickup Required
 *  R  Customer Notes
 *  ── Staff-side columns (hidden from customer) ──────────────
 *  S  Staff Status        ← staff updates this manually
 *  T  Staff Remarks       ← staff fills this manually
 *
 * SETUP:
 *  1. Go to https://script.google.com → New Project
 *  2. Paste this entire file content into the editor
 *  3. Save (Ctrl+S)
 *  4. Click "Deploy" → "New Deployment"
 *     - Type: Web App
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  5. Authorize permissions when prompted
 *  6. Copy the Web App URL
 *  7. Add it to your .env file:
 *       VITE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
 *  8. Restart your dev server (npm run dev)
 */

// ── Change this to your Google Sheet ID ──────────────────────────
// Found in the URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit
var SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE"; // ← Replace this
var SHEET_NAME = "Bookings";                // ← Tab name (create it first)

var HEADERS = [
  "Booking Ref",
  "Submitted At",
  "Customer Name",
  "Phone",
  "Email",
  "Address",
  "City",
  "Car Model",
  "Manufacturing Year",
  "Fuel Type",
  "Registration No",
  "Kilometers",
  "Service Center",
  "Services Booked",
  "Request Date",
  "Appointment Slot",
  "Pickup Required",
  "Customer Notes",
  // ─── Staff-side columns ───────────────────────────────────
  "Staff Status",   // ← Staff marks: Pending / Confirmed / In Progress / Completed / Cancelled
  "Staff Remarks",  // ← Staff fills with any internal notes
];

/**
 * Handles POST requests from the booking form.
 */
function doPost(e) {
  try {
    var params = e.parameter;

    // Open sheet, auto-create headers on first run
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Write headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);

      // Style header row
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground("#0c2340");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(10);

      // Make staff columns visually distinct (light amber)
      sheet.getRange(1, 19, 1, 2).setBackground("#f59e0b"); // S & T columns
      sheet.getRange(1, 19, 1, 2).setFontColor("#1c1917");

      // Freeze header row
      sheet.setFrozenRows(1);

      // Set column widths
      sheet.setColumnWidth(1, 120);   // Booking Ref
      sheet.setColumnWidth(2, 160);   // Submitted At
      sheet.setColumnWidth(3, 180);   // Customer Name
      sheet.setColumnWidth(4, 130);   // Phone
      sheet.setColumnWidth(5, 200);   // Email
      sheet.setColumnWidth(6, 240);   // Address
      sheet.setColumnWidth(7, 110);   // City
      sheet.setColumnWidth(8, 120);   // Car Model
      sheet.setColumnWidth(9, 140);   // Year
      sheet.setColumnWidth(10, 100);  // Fuel
      sheet.setColumnWidth(11, 140);  // Reg No
      sheet.setColumnWidth(12, 110);  // Kms
      sheet.setColumnWidth(13, 280);  // Service Center
      sheet.setColumnWidth(14, 300);  // Services
      sheet.setColumnWidth(15, 130);  // Date
      sheet.setColumnWidth(16, 140);  // Slot
      sheet.setColumnWidth(17, 120);  // Pickup
      sheet.setColumnWidth(18, 300);  // Customer Notes
      sheet.setColumnWidth(19, 140);  // Staff Status ←
      sheet.setColumnWidth(20, 280);  // Staff Remarks ←
    }

    // Build data row
    var row = [
      params.bookingRef      || "",
      params.submittedAt     || new Date().toISOString(),
      params.customerName    || "",
      params.phone           || "",
      params.email           || "",
      params.address         || "",
      params.city            || "",
      params.carModel        || "",
      params.carYear         || "",
      params.fuelType        || "",
      params.registrationNo  || "",
      params.kilometers      || "",
      params.serviceCenter   || "",
      params.serviceNames    || "",
      params.requestDate     || "",
      params.appointmentSlot || "",
      params.pickupRequired  || "",
      params.customerNotes   || "",
      // ─── Staff columns pre-filled ─────────────────────────
      "Pending",  // Staff Status  ← staff will overwrite this
      "",         // Staff Remarks ← staff will fill this
    ];

    sheet.appendRow(row);

    // Color the new data row's staff cells for visibility
    var newRow = sheet.getLastRow();
    sheet.getRange(newRow, 19, 1, 1)
      .setBackground("#fef3c7")   // light amber for "Pending"
      .setFontWeight("bold");
    sheet.getRange(newRow, 20, 1, 1)
      .setBackground("#f8fafc");  // light slate for remarks

    // Add data validation dropdown for Staff Status column
    var statusRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(
        ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
        true
      )
      .setAllowInvalid(false)
      .build();
    sheet.getRange(newRow, 19).setDataValidation(statusRule);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: newRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (for testing the deployment is live).
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "Excel Autocare Booking Webhook is live",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
