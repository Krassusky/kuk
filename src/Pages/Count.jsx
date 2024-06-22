import React from 'react';
import ProductDropdown from '../Components/ProductDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { useParams } from 'react-router-dom';

const Count = () => {
    const { storeId } = useParams();

    return (
        <div className="container elements">
            <h1 className='Header'>Loja {storeId}</h1>
            <form>
                <ProductDropdown />
                {/* Outros campos do formulário */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Count;