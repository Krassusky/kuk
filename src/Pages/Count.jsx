import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../hooks/DataContext'; // Import DataContext
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

    const [loading, setLoading] = useState(false); // Loading state

    const { stores } = useContext(DataContext); // Usar o contexto para obter as lojas
    const selectedStore = stores.find(store => store.Codigodaloja === storeId);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading state to true

        console.log('Form submitted with:', formData); // Log dos dados do formulário

        const sheetData = {
            Codigodaloja: storeId,
            Tipodevenda: selectedOption,
            Produto: formData.Produto,
            Datadevalidade: formData.Date,
            Quantidade: formData.Qtd
        };

        console.log('Sheet data:', sheetData); // Log dos dados a serem enviados ao servidor

        try {
            const response = await axios.post('http://localhost:5000/submit', sheetData);
            console.log('Data saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving data:', error);
        } finally {
            setLoading(false); // Reset loading state to false
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
        <div className="elements">
            {selectedStore ? (
                <h3>
                    Loja Selecionada {selectedStore.Codigodaloja}-{selectedStore.Loja} <b>Endereco: {selectedStore.EndLoja}</b>
                </h3>
            ) : (
                <p>Store ID: {storeId}</p>
            )}
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
                        required
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
                        required
                    />
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            <BackButton className="B"/>
        </div>
    );
};

export default Count;