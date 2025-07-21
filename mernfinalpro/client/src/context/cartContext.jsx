// cartContext.jsx
import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [productId, setProductId] = useState(null);

  const onAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    alert('Added to cart!');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      onAddToCart, // 👈 renamed to match usage
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
