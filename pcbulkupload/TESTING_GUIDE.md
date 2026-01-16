# Testing Guide - Excel Upload Feature

## How to Test the Application

### 1. Start the Application

Run one of these commands in the terminal:

```powershell
# Standard start (connects to backend)
npm run start

# OR start with mock data
npm run start-mock

# OR start without FLP
npm run start-noflp
```

### 2. What to Look For

Once the application loads, you should see **TWO new buttons** in the toolbar:

1. **Download Template** button (download icon)
2. **Excel Upload** button (upload icon)

### 3. Testing the Download Template

1. Click the **"Download Template"** button
2. An Excel file named `PaymentCertificate_Upload_Template.xlsx` should download
3. Open the file - it should have 80 columns with proper headers

### 4. Testing the Excel Upload

1. Fill in the downloaded template with sample data
2. Click the **"Excel Upload"** button
3. A dialog should open
4. Click "Browse" and select your filled Excel file
5. File information should display
6. Click "Upload" to process the file

## Troubleshooting

### If Buttons Don't Appear:

**Check 1: Clear Browser Cache**
- Press `Ctrl + Shift + Delete`
- Clear cached images and files
- Refresh the page (`Ctrl + F5`)

**Check 2: Check Console for Errors**
- Press `F12` to open Developer Tools
- Go to Console tab
- Look for any red errors
- Share the error messages

**Check 3: Verify Controller Extension Loading**
In the browser console, type:
```javascript
sap.ui.require("com/atg/ppm/pcbulkupload/ext/controller/ListReportExt")
```
If it returns undefined, the controller isn't loaded.

**Check 4: Verify SmartTable**
In console, type:
```javascript
sap.ui.getCore().byId("__xmlview0--listReport")
```
This should return the SmartTable control.

### If Template Doesn't Download:

Check the browser console for the error: `XLSX library not loaded`
- Verify that `index.html` includes the SheetJS library
- Check your internet connection (CDN link)

### If Upload Fails:

1. Check that the Excel file has the correct column headers
2. Verify the OData service is accessible
3. Check console for detailed error messages

## Expected Behavior

### Download Template
- ✅ File downloads immediately
- ✅ File name: `PaymentCertificate_Upload_Template.xlsx`
- ✅ Contains 80 columns with proper headers
- ✅ Success message appears

### Excel Upload
- ✅ Dialog opens
- ✅ File can be selected
- ✅ File info displays (name, size)
- ✅ Upload button becomes enabled
- ✅ Processing shows busy indicator
- ✅ Success/error message displays
- ✅ List refreshes after upload

## Sample Data for Testing

Create a simple test with minimal required fields:

| Project | WBS Element | Purchase Order | Purchase Order Item | Supplier |
|---------|-------------|----------------|---------------------|----------|
| PRJ001  | WBS001      | PO001         | 00010              | SUP001   |
| PRJ002  | WBS002      | PO002         | 00020              | SUP002   |

Fill in other columns as needed or leave empty (defaults will be applied).

## Next Steps

After confirming the buttons appear and work:

1. Test with real backend data
2. Validate data mapping
3. Test error scenarios
4. Deploy to SAP system using: `npm run deploy`
