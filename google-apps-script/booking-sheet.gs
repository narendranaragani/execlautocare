/**
 * Excel Autocare — Booking to Google Sheets Webhook
 * ============================================================
 * Deploy this as a Google Apps Script Web App.
 *
 * COLUMNS IN ORDER (15 active columns matching website booking form):
 *  A  Booking Ref         ← EXC-XXXXX Reference ID
 *  B  Submitted At        ← Date & time booking was made
 *  C  Customer Name       
 *  D  Phone               
 *  E  Email               
 *  F  Car Model           
 *  G  Manufacturing Year  
 *  H  Fuel Type           ← Dropdown (petrol, diesel, cng, hybrid, electric)
 *  I  Services Booked     
 *  J  Request Date        
 *  K  Appointment Slot    
 *  L  Pickup Required     ← Dropdown (Yes, No)
 *  M  Customer Notes      
 *  ── Staff Operating CRM Columns (Styled Amber) ─────────────
 *  N  Staff Status        ← Dropdown: Pending, Confirmed, In Progress, Completed, Cancelled
 *  O  Staff Remarks       
 *
 * SETUP INSTRUCTIONS:
 *  1. Open your Google Spreadsheet:
 *     https://docs.google.com/spreadsheets/d/1SGADfS4q3A6nFwBxOnycB_hSocZgq3hYRlyZ-1-oLK0/edit
 *  2. Go to Extensions -> Apps Script.
 *  3. Delete any existing code and paste this entire script.
 *  4. Click the Save icon (Ctrl+S).
 *  5. Select the "runFormatOnce" function in the top toolbar dropdown and click "Run".
 *     - Grant permissions when prompted. The spreadsheet will configure automatically.
 *  6. Select the "clearAllDataButKeepHeaders" function in the dropdown and click "Run"
 *     - This will clear out the shifted dummy data rows and leave only the perfect headers.
 *  7. Click "Deploy" -> "New Deployment" (top right).
 *     - Select Type: Web App (gear icon next to Select type).
 *     - Description: "Excel Autocare Webhook v4 (15 Columns)"
 *     - Execute as: Me
 *     - Who has access: Anyone
 *     - Click "Deploy".
 *  8. Copy the new Web App URL (ends with "/exec") and paste it in your frontend config.
 */

// ── Configuration ───────────────────────────────────────────────
var SHEET_ID = "1SGADfS4q3A6nFwBxOnycB_hSocZgq3hYRlyZ-1-oLK0";
var SHEET_NAME = "Bookings";

var HEADERS = [
  "Booking Ref",
  "Submitted At",
  "Customer Name",
  "Phone",
  "Email",
  "Car Model",
  "Manufacturing Year",
  "Fuel Type",
  "Services Booked",
  "Request Date",
  "Appointment Slot",
  "Pickup Required",
  "Customer Notes",
  "Staff Status",
  "Staff Remarks"
];

/**
 * Handles POST requests from the booking form.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); 

    var params = {};
    
    // Support both URL-encoded form parameters and JSON body payloads
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      params = e.parameter;
    } else if (e.postData && e.postData.contents) {
      try {
        params = JSON.parse(e.postData.contents);
      } catch (err) {
        // Fallback if parsing fails
      }
    }

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Initialize headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    // Build data row matching the 15 active columns exactly
    var row = [
      params.bookingRef      || "",
      params.submittedAt     || new Date().toISOString(),
      params.customerName    || "",
      params.phone           || "",
      params.email           || "",
      params.carModel        || "",
      params.carYear         || params.manufacturingYear || "",
      params.fuelType        || "",
      params.serviceNames    || params.servicesBooked   || "",
      params.requestDate     || "",
      params.appointmentSlot || "",
      params.pickupRequired  || "",
      params.customerNotes   || "",
      "Pending",  // Staff Status
      ""          // Staff Remarks
    ];

    sheet.appendRow(row);

    // Apply formatting to keep the sheet layout clean and styled
    formatEntireSheet(sheet);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handles GET requests to verify connection.
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "Excel Autocare Booking Webhook is live and optimized (15 columns)",
      timestamp: new Date().toISOString(),
      columnsCount: HEADERS.length
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run this function manually in the Google Apps Script editor once
 * to style all current data to look exactly like the reference image.
 */
function runFormatOnce() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  // Set headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  } else {
    // If headers exist, update row 1 to have the correct headers in case of drift
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
  }
  
  formatEntireSheet(sheet);
}

/**
 * Run this function manually in the Google Apps Script editor to clear 
 * all dummy booking rows, keeping only the styled headers.
 */
function clearAllDataButKeepHeaders() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return;
  
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }
  
  // Re-format to ensure header is perfect
  formatEntireSheet(sheet);
}

/**
 * Formats the entire spreadsheet with the premium style layout.
 */
function formatEntireSheet(sheet) {
  var maxRows = sheet.getMaxRows();
  var lastRow = sheet.getLastRow();
  
  // 1. Ensure gridlines are active
  sheet.setHiddenGridlines(false);
  
  // 2. Set Frozen Header
  sheet.setFrozenRows(1);
  
  // 3. Set Row Heights (Header = 42px, Data Rows = 32px)
  sheet.setRowHeight(1, 42);
  if (lastRow > 1) {
    sheet.setRowHeights(2, lastRow - 1, 32);
  }

  // 4. Style Header Row (Dark Navy background for customer data, Amber for staff data)
  // Customer Columns (Col A to M / 13 columns)
  var customerHeader = sheet.getRange(1, 1, 1, 13);
  customerHeader.setBackground("#0c2340")
                .setFontColor("#ffffff")
                .setFontFamily("Inter")
                .setFontSize(11)
                .setFontWeight("bold")
                .setHorizontalAlignment("center")
                .setVerticalAlignment("middle")
                .setWrap(true);
  
  // Staff Operating Columns (Col N and O / 2 columns)
  var staffHeader = sheet.getRange(1, 14, 1, 2);
  staffHeader.setBackground("#f59e0b")
             .setFontColor("#1e1b4b")
             .setFontFamily("Inter")
             .setFontSize(11)
             .setFontWeight("bold")
             .setHorizontalAlignment("center")
             .setVerticalAlignment("middle")
             .setWrap(true);
             
  // Draw thick borders under the header
  sheet.getRange(1, 1, 1, HEADERS.length).setBorder(null, null, true, null, null, null, "#1e293b", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  if (lastRow > 1) {
    var dataRange = sheet.getRange(2, 1, lastRow - 1, HEADERS.length);
    
    // 5. Apply default text properties to data rows (Inter font, 10pt size, vertically centered, text wrapping)
    dataRange.setFontFamily("Inter")
             .setFontSize(10)
             .setFontColor("#1e293b")
             .setVerticalAlignment("middle")
             .setWrap(true);
             
    // Draw thin light-gray gridline borders inside data cells
    dataRange.setBorder(true, true, true, true, true, true, "#e2e8f0", SpreadsheetApp.BorderStyle.SOLID);
    
    // 6. Set column alignments
    // Center Align columns (1-based: 1=Ref, 2=Time, 4=Phone, 7=Year, 8=Fuel, 10=Date, 11=Slot, 12=Pickup, 14=Status)
    var centerCols = [1, 2, 4, 7, 8, 10, 11, 12, 14];
    centerCols.forEach(function(col) {
      sheet.getRange(2, col, lastRow - 1, 1).setHorizontalAlignment("center");
    });
    
    // Left Align columns (1-based: 3=Name, 5=Email, 6=Model, 9=Services, 13=Notes, 15=Remarks)
    var leftCols = [3, 5, 6, 9, 13, 15];
    leftCols.forEach(function(col) {
      sheet.getRange(2, col, lastRow - 1, 1).setHorizontalAlignment("left");
    });
    
    // 7. Apply Conditional Formatting for Status and Fuel Type (wrapped in try-catch for Tables compatibility)
    try {
      sheet.clearConditionalFormatRules();
      var rules = [];
      
      var fuelRange = sheet.getRange(2, 8, lastRow - 1, 1);
      var statusRange = sheet.getRange(2, 14, lastRow - 1, 1);

      // --- Fuel Type Chip Colors ---
      rules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("diesel")
        .setBackground("#dcfce7") // Light green
        .setFontColor("#15803d")
        .setBold(true)
        .setRanges([fuelRange])
        .build());
        
      rules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("hybrid")
        .setBackground("#e0f2fe") // Light blue
        .setFontColor("#0369a1")
        .setBold(true)
        .setRanges([fuelRange])
        .build());

      rules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("petrol")
        .setBackground("#f1f5f9") // Light slate
        .setFontColor("#475569")
        .setBold(true)
        .setRanges([fuelRange])
        .build());

      rules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("cng")
        .setBackground("#fef3c7") // Light amber
        .setFontColor("#b45309")
        .setBold(true)
        .setRanges([fuelRange])
        .build());

      rules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("electric")
        .setBackground("#fae8ff") // Light purple
        .setFontColor("#a21caf")
        .setBold(true)
        .setRanges([fuelRange])
        .build());
      
      // --- Staff Status Chip Colors ---
      // "Pending" -> Light Amber
      rules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("Pending")
        .setBackground("#fef3c7")
        .setFontColor("#b45309")
        .setBold(true)
        .setRanges([statusRange])
        .build());
        
      // "Confirmed" -> Light Blue
      rules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("Confirmed")
        .setBackground("#e0f2fe")
        .setFontColor("#0369a1")
        .setBold(true)
        .setRanges([statusRange])
        .build());
        
      // "In Progress" -> Light Purple
      rules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("In Progress")
        .setBackground("#f3e8ff")
        .setFontColor("#7e22ce")
        .setBold(true)
        .setRanges([statusRange])
        .build());
        
      // "Completed" -> Light Green
      rules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("Completed")
        .setBackground("#dcfce7")
        .setFontColor("#15803d")
        .setBold(true)
        .setRanges([statusRange])
        .build());
        
      // "Cancelled" -> Light Red
      rules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("Cancelled")
        .setBackground("#fee2e2")
        .setFontColor("#b91c1c")
        .setBold(true)
        .setRanges([statusRange])
        .build());
        
      sheet.setConditionalFormatRules(rules);
    } catch (cfErr) {
      console.warn("Could not apply conditional formatting rules: " + cfErr.message);
    }
  }
  
  // 9. Set optimal column widths with styling margins
  var colWidths = {
    1: 110,  // Booking Ref
    2: 195,  // Submitted At
    3: 160,  // Customer Name
    4: 120,  // Phone
    5: 210,  // Email
    6: 120,  // Car Model
    7: 130,  // Manufacturing Year
    8: 100,  // Fuel Type
    9: 320,  // Services Booked
    10: 110, // Request Date
    11: 130, // Appointment Slot
    12: 110, // Pickup Required
    13: 300, // Customer Notes
    14: 140, // Staff Status
    15: 280  // Staff Remarks
  };
  
  for (var colIndex in colWidths) {
    sheet.setColumnWidth(parseInt(colIndex), colWidths[colIndex]);
  }
}
