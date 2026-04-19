# Indiloom - Multi-Page Textile Sourcing Website

## Project Structure

```
Indiloom/
├── index.html              # Home page
├── for-buyers.html         # Landing page for buyers
├── for-suppliers.html      # Landing page for suppliers
├── products.html           # Product categories page
├── contact.html            # Contact form page
├── styles.css              # Shared CSS stylesheet
├── script.js               # Main JavaScript (navigation, menu toggle)
├── form-handler.js         # Form submission & Google Sheets integration
├── IndiloomContactForm.gs  # Google Apps Script for backend
└── README.md               # This file
```

## Key Features

✅ **Multi-page responsive design** with separate HTML pages  
✅ **Stock photos** from Unsplash (free, production-ready)  
✅ **Enhanced colors & gradients** for modern look  
✅ **Separated HTML, CSS & JS files** for clean architecture  
✅ **Google Sheets integration** via Google Apps Script API  
✅ **Mobile responsive** with hamburger menu  
✅ **Form validation** with error messages  
✅ **WhatsApp integration** for direct contact  

## Setup Instructions

### 1. Local Setup

All files are ready to use. Simply open `index.html` in your browser.

### 2. Google Sheets Integration (For Form Submissions)

#### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet (name it "Indiloom Contacts")
3. Create a sheet named "Responses"
4. Add these column headers in row 1:
   - Timestamp
   - Name
   - Email
   - Phone
   - Company
   - Requirement
   - Quantity

5. Copy your Google Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
   - Copy the `{SHEET_ID}` part

#### Step 2: Deploy Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any default code
3. Copy the entire content from `IndiloomContactForm.gs` into the editor
4. On line 6, replace the SHEET_ID:
   ```javascript
   const SHEET_ID = 'YOUR_SHEET_ID_HERE'; // Paste your Sheet ID
   ```
5. Click **Save** (project name: "Indiloom Contact Form")
6. Click **Deploy > New Deployment**
7. Select Type: **Web app**
8. Execute as: **[Your Email]**
9. Allow access to: **Anyone**
10. Click **Deploy**
11. Copy the provided URL (looks like: `https://script.google.com/macros/d/...`)

#### Step 3: Connect Form to Google Sheets

1. Open `form-handler.js`
2. Find this line (around line 20):
   ```javascript
   const GAS_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercopy=true';
   ```
3. Replace `YOUR_DEPLOYMENT_ID` with your deployment URL from Step 2
4. Save the file

#### Step 4: Test

1. Open `contact.html` in your browser
2. Fill out and submit the form
3. Check your Google Sheet—new submissions should appear in the "Responses" sheet

### 3. Deployment

#### Option A: GitHub Pages (Free)

1. Create GitHub repo named `indiloom`
2. Push all files to `main` branch
3. Go to **Settings > Pages**
4. Set source to `main` branch
5. Site will be live at `https://[username].github.io/indiloom/`

#### Option B: Netlify (Free)

1. Go to [Netlify](https://netlify.com)
2. Connect your GitHub repo
3. Deploy in one click

#### Option C: Custom Domain

1. Host files on any web server
2. Update links in navbar to match your domain
3. Ensure Google Apps Script deployment remains accessible

## File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Home page with full overview |
| `for-buyers.html` | Dedicated landing page for buyers |
| `for-suppliers.html` | Dedicated landing page for suppliers |
| `products.html` | Product categories with detailed descriptions |
| `contact.html` | Contact form with Google Sheets backend |
| `styles.css` | All styles with modern gradients and responsive design |
| `script.js` | Global navigation, mobile menu, smooth scroll |
| `form-handler.js` | Form validation and Google Sheets API submission |
| `IndiloomContactForm.gs` | Google Apps Script backend for handling form data |

## Customization

### Change Colors
Edit `styles.css`:
- Primary blue: `#0088cc` → change to your color
- Secondary blue: `#00a8e8` → lighter variant
- Dark text: `#111` → darker/lighter as needed

### Change Contact Info
Find and update:
- Email: `info@indiloom.com`
- Phone: `+91 98765 43210`
- WhatsApp: `919876543210`

### Update Images
All images use Unsplash URLs. Replace image URLs in HTML:
```html
<img src="https://images.unsplash.com/[YOUR_IMAGE]" alt="Description">
```

### Modify Logo
In navbar, change:
```html
<a href="index.html" class="navbar-logo">Indiloom</a>
```

## Browser Support

✅ Chrome (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Edge (latest)  
✅ Mobile browsers  

## Performance

- Lightweight CSS (no external dependencies)
- No JavaScript frameworks
- Fast load times
- Google Sheets for free backend storage
- Production-ready images from Unsplash

## Troubleshooting

**Form not submitting?**
- Check Google Apps Script deployment URL is correct in `form-handler.js`
- Ensure Google Sheet is set to "Anyone" can access
- Check browser console for errors (F12)

**Images not loading?**
- Unsplash URLs are public and free
- If unavailable, replace with your own images

**Mobile menu not working?**
- Clear browser cache
- Check `script.js` is loaded properly

**Google Sheets integration failing?**
- Verify SHEET_ID is correct
- Ensure deployment URL is current
- Redeploy Google Apps Script if needed

## Next Steps

1. ✅ Test form locally
2. ✅ Deploy to web server
3. ✅ Update contact information
4. ✅ Add your own company branding
5. ✅ Monitor Google Sheet for new submissions
6. ✅ Customize content for your market

## License

This website is ready for production use. All code is original and production-grade.

## Support

For questions or customization needs, refer to the code comments or standard web development practices.

---

**Last Updated:** April 2026  
**Version:** 1.0 (Production Ready)
