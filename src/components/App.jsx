import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import Modal from './Modal'
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import ServiceAPI from './ServiceAPI';
import './App.styled.css'

export default function App() {
  
  const [showModal, setShowModal] = useState(false);
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [imageId, setImageId] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [total, setTotal] = useState(0);
  const per_page = 12;

  useEffect(() => {

    if (imageName === '') {
      return;
    };

    setStatus('pending');

    ServiceAPI(imageName, page)
      .then((response) => response.data)
      .then(image => {
        setStatus('resolved');
        handleItems(image);
      })
      .catch(error => {
        setError(error)
        setStatus('rejected');
      });

  }, [imageName, page]);


  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal)
  };

  const searchSubmitHandler = imageName => {
    setImageName(imageName);
    setPage(1);
    setItems([]);
  };

  const handleItems = image => {
    const { hits, totalHits } = image;
    
    if (!hits.length) {
      toast.error('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    setItems(prevItems => [...prevItems, ...hits])
    setTotal(totalHits);
  };

  const handleId = () => {
    return items.find(img => img.id === imageId);
  };

  const imageClick = (event) => {

    const id = (Number(event.target.dataset.id));

    if (event.target.nodeName === 'IMG') {
      setImageId(id);
      toggleModal();
    };
  };

    return (
      <div className='App'>  

        <Searchbar onSubmit={searchSubmitHandler} />

        {status === 'pending' && <Loader/>}
        
        {status === 'rejected' && toast.error(`${error.message}`)}

        {status === 'resolved' && <ImageGallery imageClick={imageClick} imageList={items} /> }

        {page < Math.ceil(total / per_page) && items.length > 0 && <Button onLoad={loadMore} />}

        {showModal && (
          <Modal onClose={toggleModal}>
          <img src={handleId().largeImageURL} alt={handleId().tags} />
          </Modal>
        )}
          
        <ToastContainer autoClose={3000} />

      </div>
    );
};