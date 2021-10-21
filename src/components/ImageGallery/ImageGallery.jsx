import { Component } from 'react';
import PropTypes from 'prop-types';
import imagesAPI from '../../services/images-api';
import ImageGalleryItem from './ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    gallery: [],
    error: null,
    status: 'idle',
  };

  static propTypes = {
    onClickImg: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    handleClickBtn: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (nextPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevQuery !== nextQuery) {
      this.setState({ gallery: [], status: 'pending' });
    }

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
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
            alert(`По запросу ${nextQuery} ничего не найдено.`);
            this.setState({ status: 'idle' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { onClickImg, handleClickBtn } = this.props;
    const { gallery, error, status } = this.state;

    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending') {
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
                  onClick={onClickImg}
                />
              );
            })}
          </ul>
          <Loader
            className={s.loader}
            type="Circles"
            color="#00BFFF"
            height={80}
            width={80}
          />
        </>
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
                  onClick={onClickImg}
                />
              );
            })}
          </ul>
          <Button
            handleClickBtn={() => {
              this.setState({ status: 'pending' });
              handleClickBtn();
            }}
          />
        </>
      );
    }
  }
}

export default ImageGallery;
