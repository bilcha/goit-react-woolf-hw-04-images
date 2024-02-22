import { Component } from 'react';
import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount = () => {
    document.addEventListener('keydown', this.handleEscClick);
  };
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscClick);
  }
  handleEscClick = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  handleMouseClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };
  render() {
    const { imageData } = this.props;
    return (
      <div className={styles.overlay} onClick={this.handleMouseClick}>
        <div className={styles.modal}>
          <img src={imageData.largeImageURL} alt={imageData.tags} />
        </div>
      </div>
    );
  }
}
export default Modal;
