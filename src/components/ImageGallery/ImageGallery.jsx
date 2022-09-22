import PropTypes from 'prop-types'; // ES6

import ImageGalleryItem from 'components/ImageGalleryItem';

import Ul from './ImageGallery.styled';
const ImageGallery = ({ imgItems, modalHandler }) => (
  <Ul className="gallery">
    {imgItems.map((img, i) => (
      <ImageGalleryItem
        key={`${img.id}` + i}
        alt={img.tags}
        webformatURL={img.webformatURL}
        largeImageURL={img.largeImageURL}
        modalHandler={modalHandler}
      />
    ))}
  </Ul>
);

ImageGallery.propTypes = {
  imgItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  modalHandler: PropTypes.func.isRequired,
};
export default ImageGallery;
