// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { DataProvider }from './hooks/DataContext';

ReactDOM.render(
    <React.StrictMode>
        <DataProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
        </DataProvider>
    </React.StrictMode>,
    document.getElementById('root')
);