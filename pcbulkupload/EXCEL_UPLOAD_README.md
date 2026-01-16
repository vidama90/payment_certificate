# Excel Upload Feature for Payment Certificate Bulk Upload

## Overview
This implementation adds Excel upload functionality to the Payment Certificate application, allowing users to bulk upload payment certificates using an Excel template.

## Features

### 1. **Excel Upload Button**
- Located in the List Report toolbar
- Icon: Excel attachment icon
- Opens an upload dialog when clicked

### 2. **Download Template Button**
- Downloads a pre-configured Excel template with all required columns
- Template is stored as a base64 string (no file storage needed)
- Template includes 78 columns matching the OData entity structure

### 3. **Upload Dialog**
- File picker supporting .xlsx and .xls formats
- Maximum file size: 10MB
- File information panel showing selected file details
- Upload and Cancel buttons

## Excel Template Columns

The template includes the following columns (with appropriate spacing in headers):

1. Project
2. WBS Element
3. Purchase Order
4. Purchase Order Item
5. Supplier
6. Payment Certificate Notes
7. Project Name
8. WBS Description
9. Short Text
10. Payment Certificate Month Year
11. Payment Certificate Type
12. PO Original Contract Value
13. PO Variation Addition
14. PO Variation Omission
15. Final Contract Value
16. Work In Progress
17. Variation Addition
18. Variation Omission
19. Material Onsite
20. Materials Recovered
21. Total Work Completed
22. Advance Payment
23. Adv Payment Recovery
24. Less Retention
25. Retention Reversal
26. Contra Deductions
27. Net Amount Certified
28. Tax
29. Total Payable
30. Variation Order Number
31. Payment Terms
32. Contractors All Risks And TPL
33. Workmens Compensation
34. Advance Payment Security
35. Cheque
36. Bank Guarantee
37. Project QS
38. Bank Guarantee Amount
39. Percentage Of Completion
40. Payment Certificate Status
41. Creation Date
42. Amended Payment Terms
43. Payment Terms Back To Back
44. Payment Terms Urgent
45. Orig Contract WIP
46. Orig Contract Variation Addition
47. Orig Contract Variation Omission
48. Orig Contract Material Onsite
49. Orig Contract Material Recovered
50. Orig Contract Advance Payment
51. Orig Contract Advance Pay Recovery
52. Text Win Progress
53. Text Variation Addition
54. Text Variation Omission
55. Text Material Onsite
56. Text Material Recovered
57. Text Advance Payment
58. Text Advance Payment Recovery
59. Contract Insurances
60. Advance Payment Security Date
61. Adv Payment Bank Guarantee Date
62. Cum To Date Work In Progress Amount
63. Cum To Date Variation Addition
64. Cum To Date Variation Omission
65. Cum To Date Material Onsite
66. Cum To Date Materials Recovered
67. Cum To Date Total Work Completed
68. Cum To Date Advance Payment
69. Cum To Date Adv Payment Recovery
70. Cum To Date Less Retention
71. Cum To Date Retention Reversal
72. Cum To Date Contract Deduction
73. Cum To Date Net Amount Certified
74. Cum To Date Tax
75. Cum To Date Total Payable
76. Address
77. Currency
78. Remarks
79. Performance Period Start Date
80. Performance Period End Date

## File Structure

```
webapp/
├── ext/
│   ├── controller/
│   │   └── ListReportExt.controller.js    # Controller extension with upload logic
│   └── fragment/
│       └── UploadDialog.fragment.xml       # Upload dialog UI
├── utils/
│   └── ExcelTemplateUtil.js                # Template utility with base64 template
├── i18n/
│   └── i18n.properties                     # Internationalization texts
├── index.html                               # Updated with SheetJS library
├── manifest.json                            # Updated with controller extensions
└── annotations/
    └── annotation.xml                       # Updated to hide Create/Delete buttons
```

## Dependencies

- **SheetJS (xlsx)**: v0.20.1
  - CDN: https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js
  - Used for parsing Excel files

## Usage

### For End Users

1. **Download Template**:
   - Click the "Download Template" button in the toolbar
   - An Excel file named "PaymentCertificate_Upload_Template.xlsx" will be downloaded
   - Fill in the template with payment certificate data

2. **Upload Data**:
   - Click the "Excel Upload" button
   - Select your filled Excel file
   - Review the file information
   - Click "Upload" to process the file
   - View success/error messages

### For Developers

#### Controller Extension
The `ListReportExt.controller.js` extends the SAP Fiori Elements List Report controller and provides:
- `onExcelUpload()`: Opens the upload dialog
- `onDownloadTemplate()`: Downloads the Excel template
- `onFileChange()`: Handles file selection
- `onUploadConfirm()`: Processes and uploads the Excel data
- `_processExcelData()`: Parses Excel data
- `_mapExcelRowToOData()`: Maps Excel columns to OData properties
- `_createBatchRequest()`: Creates batch requests for multiple records

#### Template Utility
The `ExcelTemplateUtil.js` provides:
- `getTemplateBase64()`: Returns base64 encoded Excel template
- `getTemplateColumns()`: Returns array of column definitions

## Error Handling

The implementation includes comprehensive error handling for:
- Missing or invalid files
- File reading errors
- Excel parsing errors
- OData creation errors
- Batch processing errors

Errors are displayed with:
- Row numbers for easy identification
- Detailed error messages from the backend
- Summary of successful vs failed uploads

## Batch Processing

- Uses OData batch requests for optimal performance
- Each row creates a separate change set
- All records are processed in a single HTTP request
- Continues processing even if individual records fail

## Limitations

- Maximum file size: 10MB
- Supported formats: .xlsx, .xls
- Requires SheetJS library to be loaded
- Browser must support FileReader API

## Future Enhancements

Potential improvements:
1. Add data validation before upload
2. Support for progress indicators during processing
3. Downloadable error log for failed records
4. Template with sample data
5. Field-level validation against backend constraints
6. Duplicate detection
7. Dry-run mode to preview changes

## Notes

- The template is stored as a base64 string to avoid file storage requirements
- Column headers in the Excel file must match exactly (case-sensitive)
- Numeric fields default to "0" if empty
- Date fields default to null if empty
- The Create and Delete buttons have been hidden using OData capabilities annotations
