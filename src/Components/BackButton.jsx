import React from 'react';
import { useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './BackButton.css'

const BackButton = () => {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <Button variant="dark" className='BackButton' onClick={handleClick}>
            Voltar
        </Button>
    );
};

export default BackButton;
