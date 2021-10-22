import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({ gallery, onClickImg }) {
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
    </>
  );
}
ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),
  onClickImg: PropTypes.func,
};

export default ImageGallery;
