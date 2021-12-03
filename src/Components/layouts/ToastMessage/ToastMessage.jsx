import React from 'react';
import './ToastMessage.css';
const ToastMessage = ({ display, message, style }) => {
  return (
    display && (
      <div className="toastMessage" style={style}>
        {message}
      </div>
    )
  );
};

export default ToastMessage;
