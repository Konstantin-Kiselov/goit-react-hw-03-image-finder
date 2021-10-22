import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

function ImageGalleryItem({ src, tags, dataSrc, onClick }) {
  return (
    <li className={s.imageGalleryItem} onClick={onClick}>
      <img
        src={src}
        data-src={dataSrc}
        alt={tags}
        className={s.imageGalleryItemImage}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  dataSrc: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
