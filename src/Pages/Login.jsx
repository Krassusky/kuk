
// src/screens/Home.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import StoreDropdown from '../Components/StoreDropdown'; 
import Login from '../Components/Login';


const Loginn = () => {
    return (
        <div className="elements">
             <form>
            <Login />
                {/* Outros campos do formulário */}
            </form>
        </div>
    );
};

export default Loginn;