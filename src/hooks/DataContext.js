import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Criação do contexto
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStores = async () => {
            const spreadsheetId = '1C9bD1O_qwBgdKajrLApYkRcQqHI-qcel8TfvhwXkNuQ';
            const range = 'LojaseEnderecos!A:E';
            const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

            try {
                console.log('Fetching stores from URL:', url);
                const response = await axios.get(url);
                console.log('Stores response data:', response.data);

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
                console.error('Error fetching stores:', error);
                setError(error);
            }
        };

        const fetchProducts = async () => {
            const spreadsheetId = '1C9bD1O_qwBgdKajrLApYkRcQqHI-qcel8TfvhwXkNuQ';
            const range = 'Produto!A:D';
            const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

            try {
                console.log('Fetching products from URL:', url);
                const response = await axios.get(url);
                console.log('Products response data:', response.data);

                const rows = response.data.values;
                if (rows.length > 0) {
                    const headers = rows[0];
                    const productsData = rows.slice(1).map((row) => {
                        let product = {};
                        headers.forEach((header, index) => {
                            product[header] = row[index];
                        });
                        return product;
                    });
                    setProducts(productsData);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchStores(), fetchProducts()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ stores, products, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};
