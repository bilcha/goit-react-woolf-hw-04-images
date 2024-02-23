import { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ closeModal, imageData }) => {
  useEffect(() => {
    const handleEscClick = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscClick);
    return () => {
      document.removeEventListener('keydown', handleEscClick);
    };
  }, [closeModal]);

  const handleMouseClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div className={styles.overlay} onClick={handleMouseClick}>
      <div className={styles.modal}>
        <img src={imageData.largeImageURL} alt={imageData.tags} />
      </div>
    </div>
  );
};
export default Modal;
