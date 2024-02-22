import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

export const ImageGallery = ({ data, showFullImage }) => {
  return (
    <ul className={styles.imageGallery}>
      {data.map(item => (
        <ImageGalleryItem
          showFullImage={showFullImage}
          key={item.id}
          imageData={item}
          // onClick={() => showFullImage(item)}
        />
      ))}
    </ul>
  );
};
