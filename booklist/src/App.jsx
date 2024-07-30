import { useState, useEffect } from 'react';
import {ref,get} from "firebase/database";
import { db } from './firebase';
import './App.css';
import { useNavigate } from 'react-router-dom';


function App() {
  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const Navigate=useNavigate()
 

  useEffect(() => {
      fetchBooks()
  }, []);
  const fetchBooks=()=>{
    get(ref(db, `Books`)).then((snapshot) => {
      if(snapshot.exists()){
        let data=[];
        Object.keys(snapshot.val()).map(bookElement=>{
        data.push( {...snapshot.val()[bookElement],id:bookElement})
       })
       setBooks(data)
      }
      else{
        setBooks([])
      }
    })
    .catch((error) => {
    console.error('Error updating data: ', error);
  });

  }
  

  const sortBooks = (books, order) => {
    return [...books].sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    
  };

  return (
    <div className="App" >
      <header>
        <h1>Online Ebook Store</h1>
        <div className="sort-controls">
          <button onClick={handleSort}>
            Sort by Price: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
        <div>
          <button onClick={()=>{Navigate('/add-book')}}>
            Add New Book
          </button>
        </div>
      </header>
      <main>
        <div className="book-list">
          {sortBooks(books, sortOrder).map((book, index) => (
            <div key={index} className="book-item">
              <img src={book.url} alt={book.name} />
              <h2>{book.name}</h2>
              <p> ₹ {book.price}</p>
              <button className="buy-button" title='will available soon'>Buy Now</button>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Online Ebook Store</p>
      </footer>
    </div>
  );
}

export default App;
