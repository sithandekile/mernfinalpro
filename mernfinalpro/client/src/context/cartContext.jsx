// cartContext.jsx
import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [productId, setProductId] = useState(null);

  // Add to cart directly from an API
  const fetchAndAddToCart = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
      const product = res.data;

      // same logic as your local add
      const existingItem = cartItems.find(item => item._id === product._id);
      if (existingItem) {
        setCartItems(cartItems.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCartItems([
          ...cartItems,
          { 
            _id: product._id,
            title: product.title,
            price: product.price,
            quantity: 1,
            images: product.images,
            condition: product.condition
          }
        ]);
      }
      alert('Added to cart!');
    } catch (err) {
      console.error("Failed to fetch product:", err);
      alert("Could not add product to cart. Please try again.");
    }
  };

  const onAddToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { _id: product._id, title: product.title, price: product.price, quantity: 1, images: product.images, condition: product.condition }]);
    }
    alert('Added to cart!');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      onAddToCart, 
      fetchAndAddToCart,
      currentPage,
      setCurrentPage,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      productId,
      setProductId,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
