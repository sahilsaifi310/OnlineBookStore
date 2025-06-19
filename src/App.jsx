// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import BookDetail from "./Component/BookDetail";
import Cart from "./Component/Cart";
import { getBooks } from "./Component/Books";
import Navbar from "./Component/Navbar";

const App = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBooks();
      setBooks(data);
    };
    fetchData();
  }, []);

  const addToCart = (book) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === book.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  const incrementQuantity = (bookId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === bookId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (bookId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === bookId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating-high":
        return b.rating - a.rating;
      case "rating-low":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <Router>
      <Navbar
        cartItemCount={cartItemCount}
        books={books}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <Routes>
        <Route
          path="/"
          element={<Home books={sortedBooks} addToCart={addToCart} />}
        />
        <Route
          path="/book/:id"
          element={<BookDetail books={books} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              setCart={setCart}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
