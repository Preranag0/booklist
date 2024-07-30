import React, { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { push, ref, set, get } from 'firebase/database';
import { db, storage } from './firebase';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Modal from './Modal'; // Import the Modal component

const AddPage = () => {
  const Navigate = useNavigate();
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const [price, setPrice] = useState(0);
  const [bookImage, setBookImage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isBookExists, setIsBookExists] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const saveBookData = async (e) => {
    e.preventDefault();
    setIsBookExists(false);
    if (name && language && price) {
      let url = await handleUpload();
      const bookRef = ref(db, `Books/`);
      get(bookRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const books = snapshot.val();
            for (const bookId in books) {
              if (books[bookId].name === name && books[bookId].language === language) {
                setIsBookExists(true);
                return; // Exit the loop if a match is found
              }
            }
            set(push(ref(db, `Books/`)), { name, language, price, url })
              .then(() => {
                console.log('data saved successfully');
                setShowSuccessMessage(true);
                setShowModal(true); // Show the modal
              })
              .catch((error) => {
                console.error('Error saved data: ', error);
              });
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      console.error('check values', { name, language, price });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setBookImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (bookImage) {
      const uploadTask = uploadBytesResumable(storageRef(storage, `images/${bookImage.name}`), bookImage);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Error function
          console.error('Error uploading file:', error);
        });

      await uploadTask;

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      return downloadURL;
    }
  };

  const clearForm = () => {
    setName('');
    setLanguage('');
    setPrice(0);
    setBookImage(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    Navigate('/'); // Navigate back to the home page
  };

  const handleConfirmModal = () => {
    setShowModal(false);
    clearForm(); // Clear the form for adding another book
  };

  return (
    <div className="App">
      <header>
        <h1>Add New Book</h1>
      </header>
      <main>
        <div className="book-list" style={{ height: '72vh' }}>
          <form action="">
            {showSuccessMessage && (
              <div style={{ color: 'green', marginBottom: '10px' }}>Book added successfully!</div>
            )}
            {isBookExists && (
              <div style={{ color: 'red', marginBottom: '10px' }}>Book already exists!</div>
            )}
            <div style={{ marginTop: '10px' }}>
              <label htmlFor="" className='input-label'>Book Name</label>
              <input type="text" value={name} placeholder="Enter Book Name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div style={{ marginTop: '30px' }}>
              <label htmlFor="" className='input-label'>Language</label>
              <input type="text" value={language} placeholder="Enter Book Language" onChange={(e) => setLanguage(e.target.value)} />
            </div>
            <div style={{ marginTop: '30px' }}>
              <label htmlFor="" className='input-label'>Price (₹)</label>
              <input type="number" value={price} placeholder="Enter Book price" onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div style={{ marginTop: '30px' }}>
              <label htmlFor="" className='input-label'>Book Image</label>
              <input type='file' onChange={(e) => handleFileChange(e)} />
            </div>
            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button onClick={() => { Navigate('/') }}>Cancel</button>
              <button style={{ backgroundColor: 'green' }} onClick={(e) => saveBookData(e)}>Save</button>
            </div>
          </form>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Online Ebook Store</p>
      </footer>

      <Modal show={showModal} onClose={handleCloseModal} onConfirm={handleConfirmModal} />
    </div>
  );
};

export default AddPage;
