import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getGalleryItemsAPI } from './Helper/api';
import { Grid } from 'react-loader-spinner';
import { LoadMore } from './LoadMore/LoadMore';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    galleryItems: null,
    query: '',
    page: 1,
    loading: false,
    error: '',
    loadMore: false,
    selectedItem: null,
  };
  searchQueryHandler = inputVal => {
    this.setState({ galleryItems: null, query: inputVal, page: 1 });
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.getGalleryItems();
    }
  };
  loadMoreHandler = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  getGalleryItems = async () => {
    this.setState({ loading: true });
    try {
      const data = await getGalleryItemsAPI(this.state.query, this.state.page);
      this.setState(prev => ({
        galleryItems: prev.galleryItems
          ? [...prev.galleryItems, ...data.hits]
          : data.hits,
        loadMore: this.state.page < Math.ceil(data.totalHits / 12),
        error:
          data.hits.length === 0
            ? "Sorry, we didn't find anything for your request."
            : '',
      }));
    } catch (error) {
      console.log(error);
      this.setState({
        error: 'Oops... Something went wrong. Please try again later.',
      });
    } finally {
      this.setState({ loading: false });
    }
  };
  showFullImage = imageData => {
    this.setState({ selectedItem: imageData });
  };
  closeModal = () => {
    this.setState({ selectedItem: null });
  };

  render() {
    return (
      <div>
        <Grid
          class="loader"
          visible={this.state.loading}
          height="80"
          width="80"
          color="#4354b0"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperClass="grid-wrapper"
        />
        <Searchbar searchQueryHandler={this.searchQueryHandler} />
        {this.state.galleryItems && (
          <ImageGallery
            data={this.state.galleryItems}
            showFullImage={this.showFullImage}
          />
        )}
        {this.state.error && (
          <h1 className="errorMessage">{this.state.error}</h1>
        )}
        {this.state.loadMore && (
          <LoadMore loadMoreHandler={this.loadMoreHandler} />
        )}
        {this.state.selectedItem && (
          <Modal
            imageData={this.state.selectedItem}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
export default App;
