import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDropdown = () => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');

    useEffect(() => {
        const fetchStores = async () => {
            const spreadsheetId = '1C9bD1O_qwBgdKajrLApYkRcQqHI-qcel8TfvhwXkNuQ'; // ID da Planilha
            const range = 'Produto!A:D'; // Intervalo da Planilha
            const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

            try {
                console.log('Buscando dados da URL:', url); // Log para depuração
                const response = await axios.get(url);
                console.log('Dados da resposta:', response.data); // Log para depuração

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
                console.error('Erro ao buscar dados do Google Sheets:', error);
            }
        };

        fetchStores();
    }, []);

    // Função para lidar com a seleção do produto
    const handleStoreSelection = (selectedStore) => {
        setSelectedStore(selectedStore);
        // Produto selecionado armazenado em 'selectedStore' para uso posterior
        console.log('Produto selecionado:', selectedStore);
    };

    return (
        <div className="form-group">
            <label htmlFor="storeSelect">Selecione o Produto</label>
            <select
                id="storeSelect"
                className="form-control"
                value={selectedStore.CodigoProduto || ''}
                onChange={(e) => {
                    const selectedStore = stores.find(store => store.CodigoProduto === e.target.value);
                    handleStoreSelection(selectedStore);
                }} // Chama handleStoreSelection na seleção de produto
            >
                <option value="" label=''></option>
                {stores.map((store, index) => (
                    <option key={index} value={store.CodigoProduto}>
                        {store.CodigoProduto} - {store.NomeProduto}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ProductDropdown;
