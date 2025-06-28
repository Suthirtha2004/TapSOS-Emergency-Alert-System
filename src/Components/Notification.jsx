import React, { useEffect } from 'react';
import './UI/Notification.css';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={22} color="#10b981" />,
  error: <XCircle size={22} color="#ef4444" />,
  info: <Info size={22} color="#3b82f6" />,
};

const Notification = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification-toast ${type}`}>
      <div className="icon">{icons[type]}</div>
      <div className="message">{message}</div>
      <button className="close-btn" onClick={onClose} aria-label="Close notification">
        <X size={18} />
      </button>
    </div>
  );
};

export default Notification; 