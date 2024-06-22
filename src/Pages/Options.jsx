import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Options = () => {
    const { storeId } = useParams();

    const handleOptionSelect = (option) => {
        console.log(`${option} selecionada`); // Log to console the selected option
    };

    return (
        <div>
            <h1>Loja {storeId}</h1> {/* Display the store ID in the title */}
            <div>
                {/* Use Link to navigate to Count page with parameters */}
                <Link to={`/Count?storeId=${storeId}&selectedOption=Câmara`}>
                    <button onClick={() => handleOptionSelect('Câmara')}>Câmara</button>
                </Link>
                <Link to={`/Count?storeId=${storeId}&selectedOption=Gôndola`}>
                    <button onClick={() => handleOptionSelect('Gôndola')}>Gôndola</button>
                </Link>
            </div>
        </div>
    );
};

export default Options;