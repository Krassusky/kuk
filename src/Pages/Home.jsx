import React from 'react';
import StoreDropdown from '../Components/StoreDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
    return (
        <div className="container elements">
            <h1 className='Header'>Selecione a loja que voce fara a contagem</h1>
            <form>
                <StoreDropdown />
                {/* Outros campos do formulário */}
        </form>
        </div>
    );
};

export default Home;