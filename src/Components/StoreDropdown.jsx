import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreDropdown = () => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');

    useEffect(() => {
        const fetchStores = async () => {
            const spreadsheetId = '1C9bD1O_qwBgdKajrLApYkRcQqHI-qcel8TfvhwXkNuQ'; // ID da planilha
            const range = 'LojaseEnderecos!A:C'; // Range da planilha
            const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

            try {
                console.log('Fetching data from URL:', url); // Adicione este log
                const response = await axios.get(url);
                console.log('Response data:', response.data); // Adicione este log

                const rows = response.data.values;
                if (rows.length > 0) {
                    const headers = rows[0];
                    const storesData = rows.slice(1).map((row) => {
                        let store = {};
                        headers.forEach((header, index) => {
                            store[header] = row[index];
                        });
                        return store;
                    });
                    setStores(storesData);
                }
            } catch (error) {
                console.error('Error fetching data from Google Sheets:', error);
            }
        };

        fetchStores();
    }, []);

    return (
        <div className="form-group">
            <label htmlFor="storeSelect">Loja</label>
            <select
                id="storeSelect"
                className="form-control"
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
            >
                <option value="">Selecione uma loja</option>
                {stores.map((store, index) => (
                    <option key={index} value={store.Codigodaloja}>
                        {store.Loja} - {store.EndLoja}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StoreDropdown;