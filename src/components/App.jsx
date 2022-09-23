import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { api } from 'helpers/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setLoadMore] = useState(true);
  const [isModal, setIsModal] = useState(false);

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const [imgItems, setImgItems] = useState([]);
  const [modalData, setModalData] = useState([]);

  const loadImg = async () => {
    try {
      const response = await api(query, page);
      const { totalHits, hits } = response;

      if (response) {
        if (totalHits === 0) {
          setImgItems([]);
          setLoadMore(false);
          return toast.error('nothing found');
        }

        if (Math.ceil(totalHits / 16) === page) {
          setLoadMore(false);
        }

        if (page === 1) {
          setImgItems(hits);
          toast.success(`Total found ${totalHits} images`);
        } else {
          setImgItems(prevState => [...prevState, ...hits]);
        }

        window.scrollBy({
          top: window.innerHeight - 76,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadImg();
    // eslint-disable-next-line
  }, [page, query]);

  const onSubmitHandler = value => {
    if (!value) {
      return toast.info(`Please le me know that are you looking`);
    }
    setQuery(value);
    setPage(1);
    setIsLoading(true);
    setLoadMore(true);
  };

  const loadMoreHandler = () => {
    setPage(prevState => prevState + 1);
    // this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  const modalHandler = data => {
    setModalData(data);
    setIsModal(prevState => !prevState);
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
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
