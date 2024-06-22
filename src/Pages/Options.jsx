import React from 'react';
import { useParams } from 'react-router-dom';

const Options = () => {
    const { storeId } = useParams();

    // Replace this with actual logic to fetch data based on storeId if needed

    const handleOptionSelect = (option) => {
        console.log(`${option} selecionada`); // Log to console the selected option
        // Add logic here for further actions based on selected option
    };

    return (
        <div>
            <h1>Loja {storeId}</h1> {/* Display the store ID in the title */}
            <div>
                <button onClick={() => handleOptionSelect('Câmara')}>Câmara</button>
                <button onClick={() => handleOptionSelect('Gôndola')}>Gôndola</button>
            </div>
        </div>
    );
};

export default Options;