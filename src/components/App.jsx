import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { api } from 'helpers/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    imgItems: [],
    total: 0,
    isLoading: true,
    isModal: false,
    modalData: [],
  };
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return null;
  }
  async componentDidMount() {
    console.log('componentDidMount');
    const { query, page, total } = this.state;
    try {
      setTimeout(() => {
        console.log(2222);
      }, 50000);
      const data = await api(query, page);
      const { hits, totalHits } = data;
      if (total !== totalHits) {
        this.setState({ total: totalHits });
      }
      this.setState({ imgItems: hits });
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { query, page, total } = this.state;

    if (page !== prevState.page || query !== prevState.query) {
      try {
        const data = await api(query, page);
        const { hits, totalHits } = data;
        if (total !== totalHits) {
          this.setState({ total: totalHits });
        }

        page === 1
          ? this.setState({ imgItems: hits })
          : this.setState(prevState => ({
              imgItems: [...prevState.imgItems, ...hits],
            }));
        window.scrollBy({
          top: window.innerHeight - 76,
          behavior: 'smooth',
        });
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        this.setState({ isLoading: false });
        if (page === 1) {
          console.log(page);
          toast.success(`Total found ${total} images`);
        }
      }
    }
  }

  onSubmitHandler = value => {
    if (!value) {
      return toast.info(`Please le me know that are you looking`);
    }
    this.setState({ query: value, page: 1, isLoading: true });
  };

  loadMoreHandler = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  modalHandler = data => {
    this.setState({
      isModal: !this.state.isModal,
      modalData: data,
    });
  };
  render() {
    const { imgItems, isLoading, modalData } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmitHandler={this.onSubmitHandler} />
        {isLoading ? (
          <Loader isLoading={true} />
        ) : (
          <ImageGallery imgItems={imgItems} modalHandler={this.modalHandler} />
        )}
        {imgItems && <Button loadMoreHandler={this.loadMoreHandler} />}
        {this.state.isModal && (
          <Modal
            alt={modalData.alt}
            src={modalData.largeImageURL}
            modalHandler={this.modalHandler}
          />
        )}
        <ToastContainer
          position="center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
      </div>
    );
  }
}
