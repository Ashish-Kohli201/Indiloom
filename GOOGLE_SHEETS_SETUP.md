# Google Sheets Integration Setup Guide

## Complete Step-by-Step Instructions

### What You'll Need

- A Google Account
- The Indiloom website files
- 10 minutes of setup time

---

## Part 1: Create Google Sheet

### Step 1.1: Create New Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Create new spreadsheet**
3. Name it: **"Indiloom Contacts"**
4. Click **Create**

### Step 1.2: Set Up Headers

1. You're now in a blank sheet called "Sheet1"
2. Right-click on "Sheet1" tab at the bottom
3. Select **Rename**
4. Type: **Responses**
5. Press Enter

### Step 1.3: Add Column Headers

In row 1, enter these headers (one in each column):

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Company | Requirement | Quantity |

**Just type the values in the cells. Don't worry about formatting yet.**

### Step 1.4: Get Your Sheet ID

1. Look at the URL in your browser:
   ```
   https://docs.google.com/spreadsheets/d/1rGaGWfYG0iXLZdKfKXwKcKlZnN5rN3kJ5v5t5u5/edit#gid=0
   ```

2. Copy the long ID between `/d/` and `/edit`:
   ```
   1rGaGWfYG0iXLZdKfKXwKcKlZnN5rN3kJ5v5t5u5
   ```

3. **Save this ID** – you'll need it next.

---

## Part 2: Deploy Google Apps Script

### Step 2.1: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** (top menu)
2. Select **Apps Script**
3. A new tab will open with the Apps Script editor

### Step 2.2: Replace the Code

1. You should see some default code like:
   ```javascript
   function myFunction() {
     
   }
   ```

2. **Select ALL the code** (Ctrl+A or Cmd+A)
3. **Delete it**
4. Open the file `IndiloomContactForm.gs` from your computer
5. Copy ALL the content
6. Paste it into the Apps Script editor

### Step 2.3: Update Your Sheet ID

1. On **line 6**, find:
   ```javascript
   const SHEET_ID = '1rGaGWfYG0iXLZdKfKXwKcKlZnN5rN3kJ5v5t5u5';
   ```

2. Replace the ID inside the quotes with **YOUR Sheet ID** from Part 1.4

3. Example:
   ```javascript
   const SHEET_ID = '1rGaGWfYG0iXLZdKfKXwKcKlZnN5rN3kJ5v5t5u5'; // Your actual ID
   ```

4. Click **Save** (Ctrl+S or Cmd+S)

### Step 2.4: Create Project Name

1. A dialog will appear asking for a project name
2. Type: **Indiloom Contact Form**
3. Click **Create**

### Step 2.5: Deploy as Web App

1. Click **Deploy** (top right, blue button)
2. Select **New Deployment**
3. Click the **gear icon** next to "Select type"
4. Choose **Web app**
5. For "Execute as", select **your email address**
6. For "Allow access to", select **Anyone**
7. Click **Deploy**

### Step 2.6: Copy Deployment URL

1. A dialog shows: "New deployment created"
2. You'll see a long URL starting with:
   ```
   https://script.google.com/macros/d/...
   ```
3. Click the **copy icon** next to the URL
4. **Save this URL** – you need it in Part 3

---

## Part 3: Connect Website Form

### Step 3.1: Update form-handler.js

1. Open `form-handler.js` in a text editor
2. Find line 20 (around there). Look for:
   ```javascript
   const GAS_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercopy=true';
   ```

3. Replace it with your actual deployment URL.
   **Important:** Add `/usercopy=true` at the end if not present.

   Example (with a real URL):
   ```javascript
   const GAS_URL = 'https://script.google.com/macros/d/AKfycbxAbC123DeFgHiJkLmNoPqRsTuVwXyZ/usercopy=true';
   ```

4. Save the file

---

## Part 4: Test Everything

### Step 4.1: Open Website Locally

1. Open `contact.html` in your web browser
2. You should see the contact form

### Step 4.2: Submit Test Data

1. Fill in all required fields:
   - Name: Test Name
   - Email: test@example.com
   - Phone: +91 98765 43210
   - Company: Test Company
   - Requirement: Test bedding sets
   - Quantity: 1000 units

2. Click **Send Request** button

### Step 4.3: Check Google Sheet

1. Go back to your Google Sheet
2. Refresh the page (F5)
3. **Your data should appear in row 2** of the "Responses" sheet
4. Timestamp, Name, Email, Phone, Company, Requirement, and Quantity should all be filled in

If you see the data → **✅ It works!**

---

## Troubleshooting

### Problem: Form says "Error submitting form"

**Solution 1: Check the URL**
- Copy-paste your deployment URL again
- Make sure it ends with `/usercopy=true`
- No typos!

**Solution 2: Check Google Sheet permissions**
1. Go to your Google Sheet
2. Click **Share** (top right)
3. Make sure it shows "Anyone with the link" can access
4. If not, change it

**Solution 3: Give Apps Script permission**
1. The first time you deploy, Google may ask for permission
2. Click "Review permissions"
3. Select your Google account
4. Scroll down and click "Allow"

### Problem: Data not appearing in Sheet

**Check these:**
1. Are you on the "Responses" sheet? (Not "Sheet1")
2. Is the SHEET_ID correct in the GAS file?
3. Did you save the GAS file after updating it?
4. Open browser console (F12) and look for error messages

### Problem: Form loads but says success but no data appears

**This usually means:**
1. Form is submitting but GAS isn't catching it
2. Check the GAS_URL in form-handler.js again
3. Make sure you deployed as a "Web app" not just saved
4. Try redeploying in Google Apps Script

### Problem: Can't find Extensions > Apps Script

**Solution:**
- You must be in a Google Sheet
- Make sure you're logged into Google
- Try refreshing the page

---

## Making It Production-Ready

### After Testing Works

1. ✅ Update phone numbers in all HTML files to your real numbers
2. ✅ Update email addresses (`info@indiloom.com` → your email)
3. ✅ Upload website to your server or GitHub Pages
4. ✅ Share the live website URL

### Monitor Form Submissions

Every time someone fills the form:
1. Data automatically appears in your Google Sheet
2. You can export data to CSV anytime
3. Google Sheets keeps all data safely backed up

---

## Additional Customization

### Add More Fields to Form

To add a new field like "Budget":

**In `contact.html`, add:**
```html
<div class="form-group">
    <label for="budget">Budget Range</label>
    <input type="text" id="budget" name="budget">
</div>
```

**In `form-handler.js`, update this part:**
```javascript
const data = {
    name: document.getElementById('name').value,
    company: document.getElementById('company').value,
    requirement: document.getElementById('requirement').value,
    quantity: document.getElementById('quantity').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    budget: document.getElementById('budget').value,  // Add this line
    timestamp: new Date().toLocaleString()
};
```

**In Google Sheet:**
- Add a new column header "Budget" in column H

---

## Security Notes

✅ **Safe for production:**
- No sensitive data exposed in frontend
- Google Sheets API handles authentication
- Data encrypted by Google

⚠️ **Best practices:**
- Don't share your deployment URL publicly
- The `/usercopy=true` flag prevents unauthorized copying
- Google Sheets permissions ensure only "Anyone" can submit (can't view data)

---

## Support Resources

- [Google Sheets Help](https://support.google.com/sheets)
- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [JavaScript Form Basics](https://developer.mozilla.org/en-US/docs/Learn/Forms)

---

**You're all set!** 🎉 Your contact form is now connected to Google Sheets.

Questions? Check if your GAS_URL is correct – that fixes 99% of issues.
