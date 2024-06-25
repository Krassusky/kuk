const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

app.use('/static', express.static(path.join(__dirname, 'Data')));

app.get('/download', (req, res) => {
  const file = path.join(__dirname, 'Data', 'data.json');
  res.download(file);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});