import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Adjust the import path as necessary

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { currentUser } = useContext(AuthContext);

    return currentUser ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;