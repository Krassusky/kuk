import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const StoreDropdown = () => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');
    const navigate = useNavigate(); // useNavigate hook for navigation

    useEffect(() => {
        const fetchStores = async () => {
            const spreadsheetId = '1C9bD1O_qwBgdKajrLApYkRcQqHI-qcel8TfvhwXkNuQ'; // Spreadsheet ID
            const range = 'LojaseEnderecos!A:C'; // Sheet range
            const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

            try {
                console.log('Fetching data from URL:', url); // Logging for debugging
                const response = await axios.get(url);
                console.log('Response data:', response.data); // Logging for debugging

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

    // Function to handle store selection and navigate to options page
    const handleStoreSelection = (selectedStore) => {
        setSelectedStore(selectedStore);

        // Navigate to the options page with route state
        navigate(`/options/${selectedStore.Codigodaloja}`);
    };

    return (
        <div className="form-group">
            <label htmlFor="storeSelect">Loja</label>
            <select
                id="storeSelect"
                className="form-control"
                value={selectedStore}
                onChange={(e) => {
                    const selectedStore = stores.find(store => store.Codigodaloja === e.target.value);
                    handleStoreSelection(selectedStore);
                }} // Call handleStoreSelection on store selection
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