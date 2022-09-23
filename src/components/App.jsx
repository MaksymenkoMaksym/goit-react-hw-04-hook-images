import { useState, useEffect, Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { api } from 'helpers/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback } from 'react';
import { useIsExist } from 'hooks/apiHook';
export class App1 extends Component {
  state = {
    query: '',
    page: 1,
    imgItems: [],
    total: 0,
    isLoading: true,
    isModal: false,
    modalData: [],
  };

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

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imgItems, setImgItems] = useState(null);
  const [modalData, setModalData] = useState([]);

  const {
    isModal,
    setIsModal,
    isLoadMore,
    setLoadMore,
    isLoading,
    setIsLoading,
  } = useIsExist();
  // const [isLoading, setIsLoading] = useState(true);
  // const [isLoadMore, setLoadMore] = useState(true);
  // const [isModal, setIsModal] = useState(false);

  const loadImg = useCallback(async () => {
    try {
      const response = await api(query, page);
      const { totalHits, hits } = response;

      if (!+totalHits) {
        setImgItems([]);
        return toast.error('nothing found');
      }
      if (Math.ceil(totalHits / 16) === +page) {
        setLoadMore(false);
      }
      if (page === 1) {
        setImgItems(hits);
        setLoadMore(true);
        toast.success(`Total found ${totalHits} images`);
      } else {
        setImgItems(prevState => [...prevState, ...hits]);
      }
      window.scrollBy({
        top: window.innerHeight - 76,
        behavior: 'smooth',
      });
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [query, page]);

  useEffect(() => {
    loadImg();
  }, [page, query, loadImg]);

  const onSubmitHandler = value => {
    if (!value) {
      return toast.info(`Please le me know that are you looking`);
    }
    setQuery(value);
    setPage(1);
    setIsLoading(true);
  };

  const loadMoreHandler = () => {
    setPage(prevState => prevState + 1);
    // this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  const modalHandler = data => {
    setIsModal(prevState => !prevState);
    setModalData(data);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmitHandler={onSubmitHandler} />
      {isLoading ? (
        <Loader isLoading={true} />
      ) : (
        <ImageGallery imgItems={imgItems} modalHandler={modalHandler} />
      )}
      {isLoadMore && <Button loadMoreHandler={loadMoreHandler} />}
      {isModal && (
        <Modal
          alt={modalData.alt}
          src={modalData.largeImageURL}
          modalHandler={modalHandler}
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
};
