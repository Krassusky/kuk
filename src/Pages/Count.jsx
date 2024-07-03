// src/Pages/Count.js
import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../hooks/DataContext';
import ProductDropdown from '../Components/ProductDropdown';
import axios from 'axios';
import BackButton from '../Components/BackButton';
import Modal from '../Components/Modal';

const Count = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const storeId = queryParams.get('storeId');
    const selectedOption = queryParams.get('selectedOption');

    const [formData, setFormData] = useState({
        Date: '',
        Qtd: '',
        Produto: ''
    });

    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const { stores } = useContext(DataContext);
    const selectedStore = stores.find(store => store.Codigodaloja === storeId);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        console.log('Form submitted with:', formData);

        const sheetData = {
            Codigodaloja: storeId,
            Tipodevenda: selectedOption,
            Produto: formData.Produto,
            Datadevalidade: formData.Date,
            Quantidade: formData.Qtd
        };

        console.log('Sheet data:', sheetData);

        try {
            const response = await axios.post('/submit', JSON.stringify(sheetData), {
                headers: { 'Content-Type': 'application/json' }
              });
            console.log('Data saved successfully:', response.data);

            setModalMessage('Data sent successfully!');
            setModalShow(true);
        } catch (error) {
            console.error('Error saving data:', error);
            setModalMessage('Error sending data. Please try again.');
            setModalShow(true);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCloseModal = () => {
        setModalShow(false);
    };

    return (
        <div className="elements">
            {selectedStore ? (
                <h3>
                    Loja Selecionada {selectedStore.Codigodaloja}-{selectedStore.Loja} <b>Endereço: {selectedStore.EndLoja}</b>
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

            <BackButton className="B" />

            <Modal show={modalShow} onClose={handleCloseModal} message={modalMessage} />
        </div>
    );
};

export default Count;