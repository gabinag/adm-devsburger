import React, { useRef, useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null; 

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={modalRef}>
        <h3>{message}</h3>
        <div className={styles.modalButtons}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
