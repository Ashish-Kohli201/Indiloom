/**
 * Google Apps Script for Indiloom Contact Form
 * This script receives form submissions and appends them to a Google Sheet
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets and create a new spreadsheet
 * 2. Create a sheet named "Responses" with these headers:
 *    - Timestamp
 *    - Name
 *    - Company
 *    - Email
 *    - Phone
 *    - Requirement
 *    - Quantity
 * 3. Go to Apps Script editor (Extensions > Apps Script)
 * 4. Copy this entire script into the editor
 * 5. Save the project with a name (e.g., "Indiloom Contact Form")
 * 6. Click "Deploy" > New Deployment > Select type "Web app"
 * 7. Execute as: [Your Email]
 * 8. Allow access to: Anyone
 * 9. Copy the deployment URL and paste it in form-handler.js (GAS_URL variable)
 * 10. Test the form and verify data appears in Google Sheet
 */

// Replace this with your actual Google Sheet ID
const SHEET_ID = '1rGaGWfYG0iXLZdKfKXwKcKlZnN5rN3kJ5v5t5u5'; // Update this
const SHEET_NAME = 'Responses';

/**
 * Main function to handle POST requests from forms
 */
function doPost(e) {
    try {
        // Parse the JSON data from the request
        const data = JSON.parse(e.postData.contents);

        // Get or create the sheet
        const sheet = getOrCreateSheet();

        // Append the data to the sheet
        appendDataToSheet(sheet, data);

        // Return success response
        return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            message: 'Form submitted successfully'
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        Logger.log('Error: ' + error);
        return ContentService.createTextOutput(JSON.stringify({
            status: 'error',
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
    return ContentService.createTextOutput(JSON.stringify({
        status: 'ready',
        message: 'Indiloom Contact Form API is ready to receive submissions'
    })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get existing sheet or create new one
 */
function getOrCreateSheet() {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME);
        // Add headers
        const headers = ['Timestamp', 'Name', 'Company', 'Email', 'Phone', 'Requirement', 'Quantity'];
        sheet.appendRow(headers);

        // Format header row
        const headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setFontWeight('bold');
        headerRange.setBackground('#0088cc');
        headerRange.setFontColor('white');
    }

    return sheet;
}

/**
 * Append form data to sheet
 */
function appendDataToSheet(sheet, data) {
    const row = [
        data.timestamp || new Date().toLocaleString(),
        data.name || '',
        data.company || '',
        data.email || '',
        data.phone || '',
        data.requirement || '',
        data.quantity || ''
    ];

    sheet.appendRow(row);

    // Auto-fit columns
    sheet.autoResizeColumns(1, row.length);
}

/**
 * Optional: Function to export data to CSV
 * URL: https://[deployment-url]?action=export
 */
function doGet(e) {
    if (e.parameter.action === 'export') {
        return exportToCSV();
    }

    return ContentService.createTextOutput(JSON.stringify({
        status: 'ready',
        message: 'Indiloom Contact Form API is ready'
    })).setMimeType(ContentService.MimeType.JSON);
}

function exportToCSV() {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();

    let csv = '';
    for (let i = 0; i < data.length; i++) {
        csv += data[i].join(',') + '\n';
    }

    return ContentService.createTextOutput(csv).setMimeType(ContentService.MimeType.CSV);
}
