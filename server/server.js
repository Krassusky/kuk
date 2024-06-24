const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = 5000;

// Use CORS middleware
app.use(cors());

// Directory where files will be saved
//const saveDirectory = 'C:\\Users\\gusta\\OneDrive\\Área de Trabalho';
const saveDirectory =  'C:\\Users\\gusta\\OneDrive\\Documents\\GitHub\\kuk\\server\\Data';

// Ensure the save directory exists
if (!fs.existsSync(saveDirectory)) {
    fs.mkdirSync(saveDirectory, { recursive: true });
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { Codigodaloja, Tipodevenda, Produto, Datadevalidade, Quantidade } = req.body;

    // Example of saving as a JSON file
    const jsonFilePath = path.join(saveDirectory, 'data.json');
    const jsonData = {
        Codigodaloja,
        Tipodevenda,
        Produto,
        Datadevalidade,
        Quantidade
    };
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

    // Example of saving as a CSV file
    const csvFilePath = path.join(saveDirectory, 'data.csv');
    const csvData = `${Codigodaloja},${Tipodevenda},${Produto},${Datadevalidade},${Quantidade}\n`;
    fs.appendFileSync(csvFilePath, csvData);

    // Example of saving as an XML file
    const xmlFilePath = path.join(saveDirectory, 'data.xml');
    const xmlData = `<user><Codigodaloja>${Codigodaloja}</Codigodaloja><Tipodevenda>${Tipodevenda}</Tipodevenda><Produto>${Produto}</Produto><Datadevalidade>${Datadevalidade}</Datadevalidade><Quantidade>${Quantidade}</Quantidade></user>\n`;
    fs.appendFileSync(xmlFilePath, xmlData);

    res.json({ message: 'Data saved successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});