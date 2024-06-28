// src/Pages/Options.js
import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DataContext } from '../hooks/DataContext';
import Button from 'react-bootstrap/Button';
import './Options.css';
import BackButton from '../Components/BackButton';

const Options = () => {
    const { storeId } = useParams();
    const { stores } = useContext(DataContext);

    const selectedStore = stores.find(store => store.Codigodaloja === storeId);

    const handleOptionSelect = (option) => {
        console.log(`${option} selecionada`);
    };

    return (
        <div className="elements">
            {selectedStore ? (
                <div>
                    <h3>
                        Loja Selecionada {selectedStore.Codigodaloja}-{selectedStore.Loja} <b>Endereco: {selectedStore.EndLoja}</b>
                    </h3>
                    <div className="optionsInformation">Escolha abaixo onde deseja fazer a contagem:  <b>Gôndola</b> ou <b>Câmara</b></div>
                    <div className='OptionsButtons'>
                        <Link to={`/count?storeId=${storeId}&selectedOption=Câmara`}>
                            <Button  variant="light" onClick={() => handleOptionSelect('Câmara')}>Câmara</Button >
                        </Link>
                        <Link to={`/count?storeId=${storeId}&selectedOption=Gôndola`}>
                            <Button  variant="light" onClick={() => handleOptionSelect('Gôndola')}>Gôndola</Button >
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Loja não encontrada</h1>
                </div>
            )}
            <BackButton className="B"/>
        </div>
    );
};

export default Options;