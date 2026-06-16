/**
 * Excel Autocare — Google Sheets CRM Webhook & Auto-Setup
 * ============================================================
 * Deploy this as a Google Apps Script Web App.
 *
 * COLUMNS IN "Bookings" SHEET:
 *  A  S.No.               ← Auto-calculating serial number
 *  B  Booking Ref         ← EXC-XXXXX Reference ID
 *  C  Submitted At        ← Date & time booking was made
 *  D  Customer Name       
 *  E  Phone               
 *  F  Email               
 *  G  Address             
 *  H  City                ← Dropdown (mumbai, pune, etc.)
 *  I  Car Model           
 *  J  Manufacturing Year  
 *  K  Vehicle Type        ← Dropdown (Hatchback, Sedan, SUV, etc.)
 *  L  Fuel Type           ← Dropdown (Petrol, Diesel, etc.)
 *  M  Registration No     
 *  N  Kilometers          
 *  O  Service Center      
 *  P  Services Booked     
 *  Q  Service Category    ← Dropdown (Periodic Maintenance, AC Care, etc.)
 *  R  Request Date        
 *  S  Appointment Slot    
 *  T  Pickup Required     
 *  U  Customer Notes      
 *  ── Staff CRM Columns (Styled Amber) ───────────────────────
 *  V  Staff Status        ← Dropdown: Pending, Confirmed, Checked-In, In Service, Awaiting Spares, Completed, Cancelled
 *  W  Staff Remarks       
 *  X  Service Advisor     ← Dropdown: Advisor names
 *  Y  Bay Number          ← Dropdown: Bay numbers
 *  Z  Invoice Ref         
 *  AA Final Invoice Amt   ← Currency field (INR)
 *  AB Payment Status      ← Dropdown: Unpaid, Partial Paid, Paid, Claim Pending
 *  AC Follow-up Status    ← Dropdown: Not Contacted, Attempted, Followed Up, Closed - Won, Closed - Lost
 *
 * HOW TO INSTALL:
 *  1. Open your Google Sheet.
 *  2. Go to Extensions → Apps Script.
 *  3. Overwrite the code with this entire script.
 *  4. Click Save (Ctrl+S).
 *  5. Select the function "setupCRM" in the top bar and click "Run".
 *  6. Grant permissions when prompted. The spreadsheet will configure automatically.
 *  7. Click "Deploy" → "New Deployment" → Web App (Execute as "Me", Who has access "Anyone").
 *  8. Copy the Web App URL and add it to your .env file as VITE_SHEETS_WEBHOOK_URL.
 */

// ── Google Sheet ID ──────────────────────────────────────────
var SHEET_ID = "1SGADfS4q3A6nFwBxOnycB_hSocZgq3hYRlyZ-1-oLK0";

var BOOKINGS_HEADERS = [
  "S.No.", "Booking Ref", "Submitted At", "Customer Name", "Phone", "Email", 
  "Address", "City", "Car Model", "Manufacturing Year", "Vehicle Type", "Fuel Type", 
  "Registration No", "Kilometers", "Service Center", "Services Booked", "Service Category",
  "Request Date", "Appointment Slot", "Pickup Required", "Customer Notes", 
  // ── Staff-side CRM & Operations Columns ───────────────────
  "Staff Status", "Staff Remarks", "Service Advisor", "Bay Number", 
  "Invoice Ref", "Final Invoice Amt", "Payment Status", "Follow-up Status"
];

function setupCRM() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  
  // ==========================================
  // 1. CONFIGURE "BOOKINGS" SHEET
  // ==========================================
  var bookingSheet = ss.getSheetByName("Bookings");
  if (!bookingSheet) {
    bookingSheet = ss.insertSheet("Bookings");
  }
  
  // Set all headers
  for (var i = 0; i < BOOKINGS_HEADERS.length; i++) {
    bookingSheet.getRange(1, i + 1).setValue(BOOKINGS_HEADERS[i]);
  }
  
  // Format Headers: Columns A-U (Navy Blue), Columns V-AC (Amber)
  var customerRange = bookingSheet.getRange(1, 1, 1, 21);
  customerRange.setBackground("#0c2340")
               .setFontColor("#ffffff")
               .setFontWeight("bold")
               .setFontSize(10)
               .setHorizontalAlignment("center");
                 
  var staffRange = bookingSheet.getRange(1, 22, 1, 8);
  staffRange.setBackground("#f59e0b")
            .setFontColor("#000000")
            .setFontWeight("bold")
            .setFontSize(10)
            .setHorizontalAlignment("center");
              
  bookingSheet.setFrozenRows(1);
  bookingSheet.setFrozenColumns(2); // Freeze S.No. and Booking Ref for clean horizontal scrolling (mobile optimization)
  
  // Column sizes for visual hierarchy (29 columns)
  var widths = [60, 110, 150, 150, 110, 180, 200, 90, 110, 130, 110, 90, 120, 100, 250, 250, 160, 110, 120, 110, 250, 120, 250, 140, 100, 110, 125, 120, 130];
  for (var c = 0; c < widths.length; c++) {
    bookingSheet.setColumnWidth(c + 1, widths[c]);
  }
  
  // Alignments for clean scanning
  var alignments = [
    { range: "A2:C", align: "center" }, // S.No, Ref, Submitted
    { range: "D2:D", align: "left" },   // Customer Name
    { range: "E2:E", align: "center" }, // Phone
    { range: "F2:G", align: "left" },   // Email, Address
    { range: "H2:M", align: "center" }, // City, Model, Year, Vehicle Type, Fuel, Reg
    { range: "N2:N", align: "right" },  // Odometer (Kms)
    { range: "O2:P", align: "left" },   // Service Center, Services Booked
    { range: "Q2:T", align: "center" }, // Category, Request Date, Slot, Pickup
    { range: "U2:U", align: "left" },   // Customer Notes
    { range: "V2:V", align: "center" }, // Staff Status
    { range: "W2:W", align: "left" },   // Staff Remarks
    { range: "X2:X", align: "left" },   // Service Advisor
    { range: "Y2:Z", align: "center" }, // Bay Number, Invoice Ref
    { range: "AA2:AA", align: "right" },// Final Invoice Amt
    { range: "AB2:AC", align: "center" }// Payment Status, Follow-up Status
  ];
  for (var a = 0; a < alignments.length; a++) {
    bookingSheet.getRange(alignments[a].range).setHorizontalAlignment(alignments[a].align);
  }
  
  // Format numbers & currencies
  bookingSheet.getRange("N2:N").setNumberFormat("#,##0");
  bookingSheet.getRange("AA2:AA").setNumberFormat("₹#,##0");
  bookingSheet.getRange("R2:R").setNumberFormat("yyyy-mm-dd");

  // Setup Validations
  // City Dropdown
  var cityRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["mumbai", "pune", "delhi", "bangalore", "chennai", "kolkata", "hyderabad"], true)
    .setAllowInvalid(true)
    .build();
  bookingSheet.getRange("H2:H").setDataValidation(cityRule);
  
  // Vehicle Type Dropdown
  var vehicleTypeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Hatchback", "Sedan", "SUV", "MUV", "Luxury"], true)
    .setAllowInvalid(true)
    .build();
  bookingSheet.getRange("K2:K").setDataValidation(vehicleTypeRule);
  
  // Fuel Type Dropdown
  var fuelRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["petrol", "diesel", "cng", "hybrid", "electric"], true)
    .setAllowInvalid(true)
    .build();
  bookingSheet.getRange("L2:L").setDataValidation(fuelRule);
  
  // Service Category Dropdown
  var serviceCatRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Periodic Maintenance", "Brake & Suspension Care", "AC & Cabin Comfort", "Engine & Transmission", "Wheel Alignment & Tires", "Electrical & Diagnostics", "Detailing & Car Care"], true)
    .setAllowInvalid(true)
    .build();
  bookingSheet.getRange("Q2:Q").setDataValidation(serviceCatRule);
  
  // Pickup Dropdown
  var pickupRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Yes", "No"], true)
    .setAllowInvalid(true)
    .build();
  bookingSheet.getRange("T2:T").setDataValidation(pickupRule);
  
  // Staff Status Dropdown
  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Pending", "Confirmed", "Checked-In", "In Service", "Awaiting Spares", "Completed", "Cancelled"], true)
    .setAllowInvalid(false)
    .build();
  bookingSheet.getRange("V2:V").setDataValidation(statusRule);
  
  // Service Advisor Dropdown
  var advisorRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Sanjay Joshi", "Amit Sharma", "Rahul Verma", "Karan Malhotra"], true)
    .setAllowInvalid(true)
    .build();
  bookingSheet.getRange("X2:X").setDataValidation(advisorRule);
  
  // Bay Number Dropdown
  var bayRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Bay-01", "Bay-02", "Bay-03", "Bay-04", "Bay-05"], true)
    .setAllowInvalid(true)
    .build();
  bookingSheet.getRange("Y2:Y").setDataValidation(bayRule);
  
  // Payment Status Dropdown
  var paymentRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Unpaid", "Partial Paid", "Paid", "Claim Pending"], true)
    .setAllowInvalid(true)
    .build();
  bookingSheet.getRange("AB2:AB").setDataValidation(paymentRule);
  
  // Follow-up Status Dropdown
  var followupRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Not Contacted", "Attempted", "Followed Up", "Closed - Won", "Closed - Lost"], true)
    .setAllowInvalid(true)
    .build();
  bookingSheet.getRange("AC2:AC").setDataValidation(followupRule);
  
  // Set Alternating Rows Rules & Status Styling
  bookingSheet.clearConditionalFormatRules();
  var rules = [];
  var statusRange = bookingSheet.getRange("V2:V");
  
  // Status Colors (Column V)
  var statusConfig = [
    { value: "Pending", bg: "#FEF3C7", text: "#92400E" },
    { value: "Confirmed", bg: "#DBEAFE", text: "#1E40AF" },
    { value: "Checked-In", bg: "#F3E8FF", text: "#6B21A8" },
    { value: "In Service", bg: "#FFEDD5", text: "#9A3412" },
    { value: "Awaiting Spares", bg: "#FEE2E2", text: "#991B1B" },
    { value: "Completed", bg: "#D1FAE5", text: "#065F46" },
    { value: "Cancelled", bg: "#F3F4F6", text: "#374151" }
  ];
  for (var s = 0; s < statusConfig.length; s++) {
    var rule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(statusConfig[s].value)
      .setBackground(statusConfig[s].bg)
      .setFontColor(statusConfig[s].text)
      .setBold(true)
      .setRanges([statusRange])
      .build();
    rules.push(rule);
  }
  
  // Alternating Row Color rule: Color even rows with soft light-gray `#f8fafc` if there is a booking reference
  var alternateRowRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied("=AND(MOD(ROW(),2)=0, NOT(ISBLANK($B2)))")
    .setBackground("#f8fafc")
    .setRanges([bookingSheet.getRange("A2:AC")])
    .build();
  rules.push(alternateRowRule);
  
  bookingSheet.setConditionalFormatRules(rules);

  // ==========================================
  // 2. CONFIGURE "CUSTOMERS" SHEET
  // ==========================================
  var customerSheet = ss.getSheetByName("Customers");
  if (customerSheet) {
    ss.deleteSheet(customerSheet);
  }
  customerSheet = ss.insertSheet("Customers");
  
  var custHeaders = ["Phone (PK)", "Customer Name", "Email", "Total Visits", "Lifetime Spend", "First Booking", "Last Booking", "NPS Rating"];
  customerSheet.getRange(1, 1, 1, custHeaders.length).setValues([custHeaders]);
  customerSheet.getRange(1, 1, 1, custHeaders.length)
               .setBackground("#0c2340")
               .setFontColor("#ffffff")
               .setFontWeight("bold")
               .setFontSize(10)
               .setHorizontalAlignment("center");
  customerSheet.setFrozenRows(1);
  
  // Apply formulas dynamically expanding through columns
  customerSheet.getRange("A2").setFormula('=UNIQUE(FILTER(Bookings!E2:E, Bookings!E2:E <> ""))'); // Bookings Phone (Col E)
  customerSheet.getRange("B2").setFormula('=ARRAYFORMULA(IF(ISBLANK(A2:A), "", IFERROR(XLOOKUP(A2:A, Bookings!E:E, Bookings!D:D, "Unknown"), "")))'); // Name (Col D)
  customerSheet.getRange("C2").setFormula('=ARRAYFORMULA(IF(ISBLANK(A2:A), "", IFERROR(XLOOKUP(A2:A, Bookings!E:E, Bookings!F:F, ""), "")))'); // Email (Col F)
  customerSheet.getRange("D2").setFormula('=ARRAYFORMULA(IF(ISBLANK(A2:A), "", BYROW(A2:A, LAMBDA(phone, IF(ISBLANK(phone), "", COUNTIF(Bookings!E:E, phone))))))');
  customerSheet.getRange("E2").setFormula('=ARRAYFORMULA(IF(ISBLANK(A2:A), "", BYROW(A2:A, LAMBDA(phone, IF(ISBLANK(phone), "", SUMIF(Bookings!E:E, phone, Bookings!AA:AA))))))'); // Invoice (Col AA)
  customerSheet.getRange("F2").setFormula('=ARRAYFORMULA(IF(ISBLANK(A2:A), "", BYROW(A2:A, LAMBDA(phone, IF(ISBLANK(phone), "", MINIFS(Bookings!R:R, Bookings!E:E, phone))))))'); // Date (Col R)
  customerSheet.getRange("G2").setFormula('=ARRAYFORMULA(IF(ISBLANK(A2:A), "", BYROW(A2:A, LAMBDA(phone, IF(ISBLANK(phone), "", MAXIFS(Bookings!R:R, Bookings!E:E, phone))))))');

  // Customer Sheet Alignments & Widths
  customerSheet.getRange("A2:A").setHorizontalAlignment("center");
  customerSheet.getRange("D2:G").setHorizontalAlignment("center");
  customerSheet.getRange("E2:E").setHorizontalAlignment("right").setNumberFormat("₹#,##0");
  customerSheet.getRange("F2:G").setNumberFormat("yyyy-mm-dd");
  for (var c = 0; c < custHeaders.length; c++) {
    customerSheet.setColumnWidth(c + 1, 140);
  }

  // ==========================================
  // 3. CONFIGURE "VEHICLES" SHEET
  // ==========================================
  var vehicleSheet = ss.getSheetByName("Vehicles");
  if (vehicleSheet) {
    ss.deleteSheet(vehicleSheet);
  }
  vehicleSheet = ss.insertSheet("Vehicles");
  
  var vehHeaders = ["Reg Number (PK)", "Owner Phone (FK)", "Car Model", "Mfg Year", "Fuel Type", "Last Odometer", "Last Visit Date"];
  vehicleSheet.getRange(1, 1, 1, vehHeaders.length).setValues([vehHeaders]);
  vehicleSheet.getRange(1, 1, 1, vehHeaders.length)
              .setBackground("#0c2340")
              .setFontColor("#ffffff")
              .setFontWeight("bold")
              .setFontSize(10)
              .setHorizontalAlignment("center");
  vehicleSheet.setFrozenRows(1);
  
  // Apply vehicle tracking formulas
  vehicleSheet.getRange("A2").setFormula('=UNIQUE(FILTER(Bookings!M2:M, Bookings!M2:M <> ""))'); // Reg (Col M)
  vehicleSheet.getRange("B2").setFormula('=ARRAYFORMULA(IF(ISBLANK(A2:A), "", IFERROR(XLOOKUP(A2:A, Bookings!M:M, Bookings!E:E, ""), "")))'); // Owner (Col E)
  vehicleSheet.getRange("C2").setFormula('=ARRAYFORMULA(IF(ISBLANK(A2:A), "", IFERROR(XLOOKUP(A2:A, Bookings!M:M, Bookings!I:I, ""), "")))'); // Model (Col I)
  vehicleSheet.getRange("D2").setFormula('=ARRAYFORMULA(IF(ISBLANK(A2:A), "", IFERROR(XLOOKUP(A2:A, Bookings!M:M, Bookings!J:J, ""), "")))'); // Year (Col J)
  vehicleSheet.getRange("E2").setFormula('=ARRAYFORMULA(IF(ISBLANK(A2:A), "", IFERROR(XLOOKUP(A2:A, Bookings!M:M, Bookings!L:L, ""), "")))'); // Fuel (Col L)
  vehicleSheet.getRange("F2").setFormula('=ARRAYFORMULA(IF(ISBLANK(A2:A), "", BYROW(A2:A, LAMBDA(reg, IF(ISBLANK(reg), "", MAXIFS(Bookings!N:N, Bookings!M:M, reg))))))'); // Kms (Col N)
  vehicleSheet.getRange("G2").setFormula('=ARRAYFORMULA(IF(ISBLANK(A2:A), "", BYROW(A2:A, LAMBDA(reg, IF(ISBLANK(reg), "", MAXIFS(Bookings!R:R, Bookings!M:M, reg))))))'); // Date (Col R)
  
  // Vehicle Sheet Alignments & Widths
  vehicleSheet.getRange("A2:B").setHorizontalAlignment("center");
  vehicleSheet.getRange("D2:E").setHorizontalAlignment("center");
  vehicleSheet.getRange("F2:F").setHorizontalAlignment("right").setNumberFormat("#,##0");
  vehicleSheet.getRange("G2:G").setHorizontalAlignment("center").setNumberFormat("yyyy-mm-dd");
  for (var c = 0; c < vehHeaders.length; c++) {
    vehicleSheet.setColumnWidth(c + 1, 140);
  }

  // ==========================================
  // 4. CONFIGURE "DASHBOARD" SHEET
  // ==========================================
  var dashboardSheet = ss.getSheetByName("Dashboard");
  if (dashboardSheet) {
    ss.deleteSheet(dashboardSheet);
  }
  dashboardSheet = ss.insertSheet("Dashboard");
  
  // Title Card
  dashboardSheet.getRange("A1:F1").merge();
  dashboardSheet.getRange("A1").setValue("EXCEL AUTOCARE — WORKSHOP CRM DASHBOARD")
                 .setBackground("#0c2340")
                 .setFontColor("#ffffff")
                 .setFontWeight("bold")
                 .setFontSize(12)
                 .setHorizontalAlignment("center");
  
  // KPI Headers
  dashboardSheet.getRange("A3").setValue("Total CRM Revenue").setFontWeight("bold");
  dashboardSheet.getRange("B3").setValue("Active Cars In Shop").setFontWeight("bold");
  dashboardSheet.getRange("C3").setValue("Completed Jobs").setFontWeight("bold");
  dashboardSheet.getRange("D3").setValue("Pending Requests").setFontWeight("bold");
  
  // KPI Values
  dashboardSheet.getRange("A4").setFormula("=SUM(Bookings!AA2:AA)").setNumberFormat("₹#,##0");
  dashboardSheet.getRange("B4").setFormula('=COUNTIFS(Bookings!V2:V, "<>Completed", Bookings!V2:V, "<>Cancelled", Bookings!V2:V, "<>Pending", Bookings!V2:V, "<>")');
  dashboardSheet.getRange("C4").setFormula('=COUNTIF(Bookings!V2:V, "Completed")');
  dashboardSheet.getRange("D4").setFormula('=COUNTIF(Bookings!V2:V, "Pending")');
  
  // Style KPI Block
  var kpiRange = dashboardSheet.getRange("A3:D4");
  kpiRange.setBorder(true, true, true, true, true, true)
          .setFontFamily("Inter")
          .setHorizontalAlignment("center");
  dashboardSheet.getRange("A3:D3").setBackground("#f1f5f9").setFontSize(9);
  dashboardSheet.getRange("A4:D4").setFontSize(14).setFontWeight("bold");
  
  // Active Advisor Billing Summary
  dashboardSheet.getRange("A7").setValue("Service Advisor Performance").setFontWeight("bold").setFontSize(11);
  dashboardSheet.getRange("A8").setFormula("=QUERY(Bookings!A:AC, \"select X, sum(AA) where X is not null group by X label X 'Service Advisor', sum(AA) 'Total Billing (INR)'\", 1)");
  
  dashboardSheet.setColumnWidth(1, 180);
  dashboardSheet.setColumnWidth(2, 180);
  dashboardSheet.setColumnWidth(3, 180);
  dashboardSheet.setColumnWidth(4, 180);

  // Clean up default tabs
  var defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet) {
    ss.deleteSheet(defaultSheet);
  }
}

/**
 * Handle incoming booking post payloads.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); 

    var params = e.parameter;
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName("Bookings");
    if (!sheet) {
      sheet = ss.insertSheet("Bookings");
    }

    if (sheet.getLastRow() === 0) {
      setupCRM();
    }

    // Build row containing auto-incrementing serial, payload entries, and empty staff parameters
    var row = [
      "=ROW()-1",            // Column A: S.No. (Dynamic Formula)
      params.bookingRef      || "",
      params.submittedAt     || new Date().toISOString(),
      params.customerName    || "",
      params.phone           || "",
      params.email           || "",
      params.address         || "",
      params.city            || "",
      params.carModel        || "",
      params.carYear         || "",
      params.vehicleType     || "", // Column K: Vehicle Type (Default empty, can be added to payload later)
      params.fuelType        || "",
      params.registrationNo  || "",
      params.kilometers      || "",
      params.serviceCenter   || "",
      params.serviceNames    || "",
      params.serviceCategory || "", // Column Q: Service Category (Default empty)
      params.requestDate     || "",
      params.appointmentSlot || "",
      params.pickupRequired  || "",
      params.customerNotes   || "",
      // ─── Staff columns (pre-filled) ─────────────────────────
      "Pending",             // Staff Status (Col V)
      "",                    // Staff Remarks (Col W)
      "",                    // Service Advisor (Col X)
      "",                    // Bay Number (Col Y)
      "",                    // Invoice Ref (Col Z)
      "",                    // Final Invoice Amt (Col AA)
      "Unpaid",              // Payment Status (Col AB)
      "Not Contacted"        // Follow-up Status (Col AC)
    ];

    sheet.appendRow(row);

    var newRow = sheet.getLastRow();
    
    // Re-apply drop-down configurations to target cells
    var statusRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Pending", "Confirmed", "Checked-In", "In Service", "Awaiting Spares", "Completed", "Cancelled"], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(newRow, 22).setDataValidation(statusRule); // Status validation in Column 22 (V)
    
    var advisorRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Sanjay Joshi", "Amit Sharma", "Rahul Verma", "Karan Malhotra"], true)
      .setAllowInvalid(true)
      .build();
    sheet.getRange(newRow, 24).setDataValidation(advisorRule); // Advisor in Column 24 (X)
    
    var bayRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Bay-01", "Bay-02", "Bay-03", "Bay-04", "Bay-05"], true)
      .setAllowInvalid(true)
      .build();
    sheet.getRange(newRow, 25).setDataValidation(bayRule); // Bay in Column 25 (Y)

    var paymentRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Unpaid", "Partial Paid", "Paid", "Claim Pending"], true)
      .setAllowInvalid(true)
      .build();
    sheet.getRange(newRow, 28).setDataValidation(paymentRule); // Payment Status in Column 28 (AB)

    var followupRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Not Contacted", "Attempted", "Followed Up", "Closed - Won", "Closed - Lost"], true)
      .setAllowInvalid(true)
      .build();
    sheet.getRange(newRow, 29).setDataValidation(followupRule); // Follow-up Status in Column 29 (AC)

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: newRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "Excel Autocare Premium CRM is online",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
