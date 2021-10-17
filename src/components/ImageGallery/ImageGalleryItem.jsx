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

export default ImageGalleryItem;
