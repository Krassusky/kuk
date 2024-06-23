import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DataContext } from '../hooks/DataContext'; // Importar o DataContext
import Button from 'react-bootstrap/Button';
import './Options.css';
import BackButton from '../Components/BackButton';

const Options = () => {
    const { storeId } = useParams();
    const { stores } = useContext(DataContext); // Usar o contexto para obter as lojas

    // Encontrar a loja correspondente ao storeId
    const selectedStore = stores.find(store => store.Codigodaloja === storeId);

    const handleOptionSelect = (option) => {
        console.log(`${option} selecionada`); // Log da opção selecionada
    };

    return (
        <container className="elements">
            {selectedStore ? (
                <div>
                    <h3>
                        Loja Selecionada {selectedStore.Codigodaloja}-{selectedStore.Loja} <b>Endereco: {selectedStore.EndLoja}</b>
                    </h3>
                    <div className="optionsInformation">Escolha abaixo onde deseja fazer a contagem:  <b>Gôndola</b> ou <b>Câmara</b></div>
                    <div className='OptionsButtons'>
                        {/* Usar Link para navegar para a página de contagem com parâmetros */}
                        <Link to={`/Count?storeId=${storeId}&selectedOption=Câmara`}>
                            <Button  variant="light" onClick={() => handleOptionSelect('Câmara')}>Câmara</Button >
                        </Link>
                        <Link to={`/Count?storeId=${storeId}&selectedOption=Gôndola`}>
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
        </container>
    );
};

export default Options;
