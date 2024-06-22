import React from 'react';
import StoreDropdown from '../Components/StoreDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <div className="container">
            <h1>Formulário de Lojas</h1>
            <form>
                <StoreDropdown />
                {/* Outros campos do formulário */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Home;