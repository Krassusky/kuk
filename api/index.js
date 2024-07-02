// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/App';
import { AuthProvider } from '../src/context/AuthContext';
import { DataProvider }from '../src/hooks/DataContext';

ReactDOM.render(
    <React.StrictMode>
        
        <AuthProvider>
        <DataProvider>
            <App />
        </DataProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);