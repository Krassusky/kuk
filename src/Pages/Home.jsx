// src/screens/Home.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import StoreDropdown from '../Components/StoreDropdown'; 
import Login from '../Components/Login';


const Home = () => {
    return (
        <div className="elements">
            <h1 className='Header'>Indique a loja em que você fará a contagem. TESTE </h1>
            <form>
                <StoreDropdown />
                
                {/* Outros campos do formulário */}
            </form>
        </div>
    );
};

export default Home;