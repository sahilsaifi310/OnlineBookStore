import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookDetail = ({ books, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="book-detail">
      <img src={book.image} alt={book.title} />
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p><b>Description:</b>{book.description}</p>
      <p><b>Price: </b>₹{book.price}</p>
      <p><b>Rating:</b> {book.rating} stars</p>
      <button className="btn1" onClick={() => { addToCart(book); navigate("/cart"); }}>
        Add to Cart
      </button>
    </div>
  );
};

export default BookDetail;
