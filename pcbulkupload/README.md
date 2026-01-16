## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Thu Oct 09 2025 00:37:05 GMT+0530 (India Standard Time)|
|**App Generator**<br>SAP Fiori Application Generator|
|**App Generator Version**<br>1.18.6|
|**Generation Platform**<br>Visual Studio Code|
|**Template Used**<br>List Report Page V2|
|**Service Type**<br>SAP System (ABAP On-Premise)|
|**Service URL**<br>https://vhltvds4ci.sap.atg.altayer.com:44300/sap/opu/odata/sap/Z_UI_PPM_PAY_CERT_O2|
|**Module Name**<br>pcbulkupload|
|**Application Title**<br>Bulk Upload|
|**Namespace**<br>com.atg.ppm|
|**UI5 Theme**<br>sap_horizon|
|**UI5 Version**<br>1.120.14|
|**Enable Code Assist Libraries**<br>False|
|**Enable TypeScript**<br>False|
|**Add Eslint configuration**<br>False|
|**Main Entity**<br>SAP__Currencies|

## pcbulkupload

An SAP Fiori application.

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  To launch the generated application, run the following from the generated application root folder:

```
    npm start
```

- It is also possible to run the application using mock data that reflects the OData Service URL supplied during application generation.  In order to run the application with Mock Data, run the following from the generated app root folder:

```
    npm run start-mock
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)

### Bulk upload workflow

- Use the **Download Template** toolbar action inside the list report to retrieve the latest CSV layout with all mandatory headers.
- The **CSV Upload** action opens a dialog where you can pick a completed template; the upload now streams the file to the backend `Z_UI_CA_FILEUPLOAD_O2` service, which registers the file under RICEF ID `PPM-E0007`.
- After a successful upload the list report automatically refreshes so that new payment certificate entries appear once backend processing completes.


