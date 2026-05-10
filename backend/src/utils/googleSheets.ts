import { google } from 'googleapis';
import path from 'path';

// This function initializes the Google Sheets API client
export const getSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../credentials.json'), // Requires credentials.json from Google Cloud
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client as any });
  
  return sheets;
};

// Example function to append attendance data to a Google Sheet
export const syncAttendanceToSheet = async (data: any[]) => {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    if (!spreadsheetId) {
      console.warn("No GOOGLE_SPREADSHEET_ID provided in .env");
      return;
    }

    // data array should map to rows, e.g. [[studentName, date, status]]
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Asistencias!A:C', // Ensure a sheet named "Asistencias" exists
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: data,
      },
    });

    console.log('Sincronización con Google Sheets completada exitosamente.');
  } catch (error) {
    console.error('Error sincronizando con Google Sheets:', error);
  }
};
