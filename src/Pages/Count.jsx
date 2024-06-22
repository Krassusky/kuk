import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductDropdown from '../Components/ProductDropdown';

const Count = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const storeId = queryParams.get('storeId');
    const selectedOption = queryParams.get('selectedOption');

    const [formData, setFormData] = useState({
        Date: '',
        Qtd: '',
        Produto: '' // Added Produto field
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('Form submitted with:', formData); // Log form data

        const sheetData = {
            Codigodaloja: storeId,
            Tipodevenda: selectedOption,
            Produto: formData.Produto,
            Datadevalidade: formData.Date,
            Quantidade: formData.Qtd
        };

        console.log('Sheet data:', sheetData); // Log data to be sent to Google Sheets

        try {
            const response = await axios.post(
                `https://sheets.googleapis.com/v4/spreadsheets/1C9bD1O_qwBgdKajrLApYkRcQqHI-qcel8TfvhwXkNuQ/values/Contagemestoque!A:E:append?valueInputOption=USER_ENTERED&key=${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}`,
                {
                    range: "Contagemestoque!A:E",
                    majorDimension: "ROWS",
                    values: [
                        [
                            sheetData.Codigodaloja,
                            sheetData.Tipodevenda,
                            sheetData.Produto,
                            sheetData.Datadevalidade,
                            sheetData.Quantidade
                        ]
                    ]
                }
            );

            console.log('Data saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            <p>Store ID: {storeId}</p>
            <p>Selected Option: {selectedOption}</p>
            <ProductDropdown
                value={formData.Produto}
                onChange={(value) => setFormData({ ...formData, Produto: value })}
            />

            <h1>Count Page</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Date:
                    <input
                        type="text"
                        name="Date"
                        value={formData.Date}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Quantity:
                    <input
                        type="text"
                        name="Qtd"
                        value={formData.Qtd}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Count;
