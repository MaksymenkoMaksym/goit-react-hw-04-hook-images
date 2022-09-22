import PropTypes from 'prop-types'; // ES6

import { Component } from 'react';
import { DivModal, DivOverlay } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalKeyHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalKeyHandler);
  }
  closeModalKeyHandler = e => {
    if (e.code === 'Escape') {
      this.props.modalHandler({});
    }
  };
  render() {
    const { alt, src, modalHandler } = this.props;
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
  }
}
Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  modalHandler: PropTypes.func.isRequired,
};
export default Modal;
