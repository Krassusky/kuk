import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../hooks/DataContext'; // Importar o DataContext
import ProductDropdown from '../Components/ProductDropdown';
import axios from 'axios';
import BackButton from '../Components/BackButton';


const Count = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const storeId = queryParams.get('storeId');
    const selectedOption = queryParams.get('selectedOption');

    const [formData, setFormData] = useState({
        Date: '',
        Qtd: '',
        Produto: '' // Campo Produto
    });

    const { stores } = useContext(DataContext); // Usar o contexto para obter as lojas
    const selectedStore = stores.find(store => store.Codigodaloja === storeId);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('Form submitted with:', formData); // Log dos dados do formulário

        const sheetData = {
            Codigodaloja: storeId,
            Tipodevenda: selectedOption,
            Produto: formData.Produto,
            Datadevalidade: formData.Date,
            Quantidade: formData.Qtd
        };

        console.log('Sheet data:', sheetData); // Log dos dados a serem enviados ao Google Sheets

        try {
            const response = await axios.post(
                // `https://sheets.googleapis.com/v4/spreadsheets/1C9bD1O_qwBgdKajrLApYkRcQqHI-qcel8TfvhwXkNuQ/values/Contagemestoque!A:E:append?valueInputOption=USER_ENTERED&key=${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}`,
                'https://sheets.googleapis.com/v4/spreadsheets/1C9bD1O_qwBgdKajrLApYkRcQqHI-qcel8TfvhwXkNuQ/values/Contagemestoque!A:E:append',
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
        <container className="elements">
            {selectedStore ? (
               
               <h3>
               Loja Selecionada {selectedStore.Codigodaloja}-{selectedStore.Loja} <b>Endereco: {selectedStore.EndLoja}</b>
               </h3>
            ) : (
                <p>Store ID: {storeId}</p>
            )
            }
            <h4>Voce escolheu: <b>{selectedOption}</b></h4>
            <ProductDropdown
                value={formData.Produto}
                onChange={(value) => setFormData({ ...formData, Produto: value })}
            />

            <form onSubmit={handleSubmit}>
                <label>
                    Date:
                    <input
                        type="date"
                        name="Date"
                        value={formData.Date}
                        onChange={handleInputChange}
                        placeholder="ExampleDomain"
                        required='true'
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
                        required='true'
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <BackButton className="B"/>
        </container>
    );
};

export default Count;

