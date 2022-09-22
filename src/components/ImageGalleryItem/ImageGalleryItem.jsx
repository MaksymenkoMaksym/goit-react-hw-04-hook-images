import PropTypes from 'prop-types'; // ES6

import { Li, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  alt,
  modalHandler,
}) => (
  <Li className="gallery-item">
    <Img
      src={webformatURL}
      alt={alt}
      onClick={() => {
        modalHandler({ largeImageURL, alt });
      }}
    />
  </Li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
  modalHandler: PropTypes.func,
};
export default ImageGalleryItem;
