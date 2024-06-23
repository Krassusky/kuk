import React from 'react';
import StoreDropdown from '../Components/StoreDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
    return (
        <container className="elements">
            <h1 className='Header'>Indique a loja em que você fará a contagem.</h1>
            <form>
                <StoreDropdown />
                {/* Outros campos do formulário */}
        </form>
        </container>
    );
};

export default Home;