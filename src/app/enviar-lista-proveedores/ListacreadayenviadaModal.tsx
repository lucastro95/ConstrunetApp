import React from 'react';
import styles from './listacreadayenviadaModal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ListacreadayenviadaModal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <p>{message}</p>
          <button className={styles.modalButton} onClick={onClose}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListacreadayenviadaModal;