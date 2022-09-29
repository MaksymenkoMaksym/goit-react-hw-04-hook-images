import PropTypes from 'prop-types'; // ES6
import { useEffect } from 'react';
import { DivModal, DivOverlay } from './Modal.styled';

const Modal = ({ alt, src, modalHandler }) => {
  const closeModalKeyHandler = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      console.log(e.target, e.currentTarget);
      modalHandler({});
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModalKeyHandler);
    return () => window.removeEventListener('keydown', closeModalKeyHandler);
    // eslint-disable-next-line
  }, []);

  return (
    <DivOverlay onClick={closeModalKeyHandler}>
      <DivModal>
        <img src={src} alt={alt} />
      </DivModal>
    </DivOverlay>
  );
};

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  modalHandler: PropTypes.func.isRequired,
};
export default Modal;
