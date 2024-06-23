import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate para navegação
import { DataContext } from '../hooks/DataContext'; // Importar o DataContext

const StoreDropdown = () => {
    const [selectedStore, setSelectedStore] = useState('');
    const navigate = useNavigate(); // useNavigate hook para navegação

    // Usar contexto para obter as lojas
    const { stores } = useContext(DataContext);

    // Função para lidar com a seleção da loja e navegar para a página de opções
    const handleStoreSelection = (selectedStore) => {
        setSelectedStore(selectedStore);

        // Navegar para a página de opções com o ID da loja
        navigate(`/options/${selectedStore.Codigodaloja}`);
    };

    return (
        <div className="form-group">
            <label htmlFor="storeSelect"></label>
            <select
                id="storeSelect"
                className="form-control"
                value={selectedStore}
                onChange={(e) => {
                    const selectedStore = stores.find(store => store.Codigodaloja === e.target.value);
                    handleStoreSelection(selectedStore);
                }} // Chama handleStoreSelection ao selecionar uma loja
            >
                <option value="">Selecione uma loja no menu</option>
                {stores.map((store, index) => (
                    <option key={index} value={store.Codigodaloja}>
                        {store.Loja} - {store.EndLoja} -  {store.Marca}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StoreDropdown;
