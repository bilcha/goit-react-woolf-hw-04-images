import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ imageData, showFullImage }) => {
  return (
    <li className={styles.imageGalleryItem}>
      <img
        className={styles.imageGalleryItemImage}
        src={imageData.previewURL}
        alt={imageData.tags}
        onClick={() => showFullImage(imageData)}
      />
    </li>
  );
};
