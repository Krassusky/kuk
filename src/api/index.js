const express = require('express');
const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001; // Use the PORT environment variable or default to 3001

// Middleware
app.use(bodyParser.json());
app.use(cors(
  {
    origin: 'http://localhost:3000', // Replace with your frontend port
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  }
)); // Enable CORS

// Load client secrets from a local file.
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

// Check if credentials.json is being read correctly
fs.readFile(CREDENTIALS_PATH, (err, data) => {
  if (err) {
    console.error('Error reading credentials.json file:', err);
  } else {
    console.log('credentials.json file content:', data.toString());
  }
});

async function authorize() {
  let authClient = null;
  try {
    authClient = await authenticate({
      keyfilePath: CREDENTIALS_PATH,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log('Authentication successful');
  } catch (error) {
    console.error('Error during authentication:', error);
  }
  if (authClient === null) {
    console.log('Authentication failed');
    return;
  }
  return authClient;
}

async function appendData(auth, sheetData) {
  const sheets = google.sheets({ version: 'v4', auth });

  const resource = {
    values: [
      // Convert sheetData object values to an array
      Object.values(sheetData)
    ],
  };

  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: '1C9bD1O_qwBgdKajrLApYkRcQqHI-qcel8TfvhwXkNuQ', // Replace this with your actual spreadsheet ID
      range: 'Contagemestoque!A5',
      valueInputOption: 'RAW',
      resource,
    });
    console.log(`${result.data.updates.updatedCells} cells appended.`);
  } catch (error) {
    console.error('The API returned an error while appending data:', error);
    throw error; // Rethrow the error to be caught in the POST handler
  }
}

app.use('/static', express.static(path.join(__dirname, 'Data')));

app.get('/api/download', (req, res) => {
  const file = path.join(__dirname, 'Data', 'data.json');
  res.download(file);
});

app.get('/api/submit', async (req, res) => {
  console.log('Received data:', req.body); // Log the received data for debugging
 /* const auth = await authorize();
  if (auth) {
    try {
      await appendData(auth, req.body);
      res.send('Data uploaded to Google Sheets');
    } catch (error) {
      console.error('Error appending data to Google Sheets:', error);
      res.status(500).send('Failed to append data to Google Sheets');
    }
  } else {
    res.status(500).send('Failed to authenticate');
  }*/
 res.status(200).send("OK");
});
