// cartContext.jsx
import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [productId, setProductId] = useState(null);

  const onAddToCart = (product) => {
  setCartItems(prevItems => {
    const existingItem = prevItems.find(item => item._id === product._id);
    if (existingItem) {
      return prevItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prevItems, { ...product, quantity: 1 }];
    }
  });

  alert('Added to cart!');
};
  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      onAddToCart, 
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
