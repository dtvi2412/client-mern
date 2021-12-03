import React from 'react';
import './AlertMessage.css';
const AlertMessage = ({ info }) => {
  return info === null ? null : (
    <div className="alertFalse">{info.message}</div>
  );
};

export default AlertMessage;
