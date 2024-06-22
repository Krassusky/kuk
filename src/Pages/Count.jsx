
import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductDropdown from '../Components/ProductDropdown';

const Count = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const storeId = queryParams.get('storeId');
    const selectedOption = queryParams.get('selectedOption');

    return (
        <div>
            <ProductDropdown/>
            <h1>Count Page</h1>

            <input type="text" />
            <input type="text" />

            <p>Store ID: {storeId}</p>
            <p>Selected Option: {selectedOption}</p>
            {/* Additional content based on storeId and selectedOption */}
        </div>
    );
};

export default Count;
