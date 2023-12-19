import React from 'react';
import './Alert.css';

const Alert = ({ message }) => {
    return (
        <div className="alert">
            {message}
        </div>
    );
};

export default Alert;