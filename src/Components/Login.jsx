import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate('/home');
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login with Google</h2>
            <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
        </div>
    );
};

export default Login;