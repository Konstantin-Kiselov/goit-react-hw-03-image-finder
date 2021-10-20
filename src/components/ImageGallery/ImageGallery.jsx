import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import imagesAPI from '../../services/images-api';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    page: 1,
    gallery: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (nextPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending', page: 1 });

      imagesAPI
        .fetchImages(nextQuery, nextPage)
        .then(({ hits }) => {
          if (hits.length > 0) {
            this.setState(() => {
              return {
                gallery: hits,
                status: 'resolved',
              };
            });
          } else {
            alert(`По запросу ${nextQuery} ничего не найдено.`);
            this.setState({ status: 'idle' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevQuery === nextQuery && prevPage !== nextPage) {
      // this.setState({ status: 'pending' });

      imagesAPI
        .fetchImages(nextQuery, nextPage)
        .then(({ hits }) => {
          if (hits.length > 0) {
            this.setState(prevState => {
              return {
                gallery: [...prevState.gallery, ...hits],
                status: 'resolved',
              };
            });
          } else {
            alert(`По запросу ${nextQuery} больше ничего не найдено.`);
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleClickBtn = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  render() {
    const { onClick } = this.props;
    const { gallery, error, status } = this.state;

    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending') {
      return (
        <Loader
          className={s.loader}
          type="Circles"
          color="#00BFFF"
          height={80}
          width={80}
        />
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.imageGallery}>
            {gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  src={webformatURL}
                  dataSrc={largeImageURL}
                  tags={tags}
                  onClick={onClick}
                />
              );
            })}
          </ul>
          <button onClick={this.handleClickBtn} type="button">
            Load more
          </button>
        </>
      );
    }
  }
}

export default ImageGallery;
