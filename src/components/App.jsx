import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getGalleryItemsAPI } from './Helper/api';
import { Grid } from 'react-loader-spinner';
import { LoadMore } from './LoadMore/LoadMore';
import Modal from './Modal/Modal';

const App = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const searchQueryHandler = inputVal => {
    setGalleryItems([]);
    setQuery(inputVal);
    setPage(1);
  };

  useEffect(() => {
    const getGalleryItems = async () => {
      setLoading(true);
      try {
        const data = await getGalleryItemsAPI(query, page);
        setGalleryItems(prev => [...prev, ...data.hits]);
        setLoadMore(page < Math.ceil(data.totalHits / 12));

        if (data.hits.length === 0) {
          setError("Sorry, we didn't find anything for your request.");
        }
      } catch (error) {
        console.log(error);
        setError('Oops... Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      getGalleryItems();
    }
  }, [page, query]);

  const loadMoreHandler = () => {
    setPage(prev => prev + 1);
  };

  const showFullImage = imageData => {
    setSelectedItem(imageData);
  };
  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <Grid
        class="loader"
        visible={loading}
        height="80"
        width="80"
        color="#4354b0"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperClass="grid-wrapper"
      />
      <Searchbar searchQueryHandler={searchQueryHandler} />
      {galleryItems && (
        <ImageGallery data={galleryItems} showFullImage={showFullImage} />
      )}
      {error && <h1 className="errorMessage">{error}</h1>}
      {loadMore && <LoadMore loadMoreHandler={loadMoreHandler} />}
      {selectedItem && (
        <Modal imageData={selectedItem} closeModal={closeModal} />
      )}
    </div>
  );
};

export default App;
