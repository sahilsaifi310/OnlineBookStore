import React from "react";
import { Link } from "react-router-dom";

const Home = ({ books, addToCart }) => {
  console.log(books)
  return (
    <div className="home-container">
      <h1>Welcome to the Online Bookstore</h1>
      <div className="book-list">
        {books &&  books.length > 0 && books.map((book) => (
          <div className="book-card" key={book.id}>
            <div className="book-image-wrapper">
              <img src={book.image} alt={book.title} />
            </div>
            <h3>{book.title}</h3>
            <p><b>{book.author}</b></p>
          
            <Link to={`/book/${book.id}`}>See Details</Link>
            <br />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
