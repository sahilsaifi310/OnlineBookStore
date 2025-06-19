import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ cartItemCount, books, sortOption, setSortOption }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

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
    setSearchResults(results.slice(0, 5)); // limit to top 5 results
  };

  const handleSelectBook = (bookId) => {
    setSearchTerm("");
    setSearchResults([]);
    navigate(`/book/${bookId}`);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">📚 BookStore</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart ({cartItemCount})</Link></li>
      </ul>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleSearch}
        />
   {searchResults.length > 0 && (
  <ul className="search-dropdown">
    {searchResults.map((book) => (
      <li key={book.id} className="search-item">
        <Link
          to={`/book/${book.id}`}
          onClick={() => {
            setSearchTerm("");
            setSearchResults([]);
          }}
        >
          {book.title}
        </Link>
      </li>
    ))}
  </ul>
)}



        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating-high">Rating: High to Low</option>
          <option value="rating-low">Rating: Low to High</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
