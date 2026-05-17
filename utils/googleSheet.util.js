const { google } = require('googleapis');
const path = require('path');

async function getSheet() {

    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, '../crenditals.json'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client});

    const spreadsheetId = '1daoAOIx1vMS1T08jRt64RbMmP5-MsOrqgy-bAbY-WLs';

    const response = await googleSheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Лист1!A1:Z100',
    });

    return response.data.values;
    
}

module.exports = { getSheet };