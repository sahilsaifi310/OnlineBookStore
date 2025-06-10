import React, { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = ({ cartItemCount, books, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = books.filter((book) =>
      book.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    alert(`✅ "${book.title}" added to cart`);
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">📚 BookStore</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart ({cartItemCount})</Link></li>
      </ul>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((book) => (
              <li key={book.id}>
                <Link
                  to={`/book/${book.id}`}
                  className="book-link"
                  onClick={() => {
                    setSearchTerm("");
                    setSearchResults([]);
                  }}
                >
                  {book.title}
                </Link>
                <button className="add-btn" onClick={() => handleAddToCart(book)}>
                  Add
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
