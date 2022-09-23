import PropTypes from 'prop-types'; // ES6
import { useEffect } from 'react';
import { DivModal, DivOverlay } from './Modal.styled';

const Modal = ({ alt, src, modalHandler }) => {
  const closeModalKeyHandler = e => {
    if (e.code === 'Escape') {
      console.log('ESC');
      modalHandler({});
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', e => {
      closeModalKeyHandler(e);
    });
    return () => window.removeEventListener('keydown', closeModalKeyHandler);
    // eslint-disable-next-line
  }, []);

  return (
    <DivOverlay
      onClick={e => {
        if (e.target === e.currentTarget) {
          modalHandler({});
        }
      }}
    >
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
