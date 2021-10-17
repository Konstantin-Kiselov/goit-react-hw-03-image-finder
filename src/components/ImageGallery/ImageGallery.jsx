import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';
// import API from '../../services/api'
import { Component } from 'react';

class ImageGallery extends Component {
  state = {
    gallery: null,
    error: null,
    status: 'idle',
  };

  componentDidMount() {
    const API_KEY = '23027480-c70d45ac3781d0e477b4a7117';
    const url = `https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    fetch(url)
      .then(res => res.json())
      .then(gallery => {
        // console.log(gallery);
        this.setState({ gallery: gallery.hits });
      });
    // .finally(() => this.setState({ loading: false }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      const API_KEY = '23027480-c70d45ac3781d0e477b4a7117';
      const url = `https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

      fetch(url)
        .then(res => res.json())
        .then(gallery => this.setState({ gallery: gallery.hits }))
        .catch(error => this.setState({ error }));
    }
  }

  render() {
    const { onClick } = this.props;
    const { gallery, error, status } = this.state;

    // if (status === 'idle') {
    //   return;
    // }

    if (status === 'pending') {
      return <div>Загружаем...</div>;
    }

    return (
      <>
        {error && <h1>Нет результатов поиска</h1>}
        {gallery && (
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
        )}
      </>
    );
  }
}

export default ImageGallery;
