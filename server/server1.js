const express = require('express');
const app = express();
const path = require('path');

const dataFilePath = path.join(__dirname, 'server', 'Data', 'data.json'); // Path to your data.json file

// Define a route to serve your data.json file
app.get('/data.json', (req, res) => {
  res.sendFile(dataFilePath);
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});