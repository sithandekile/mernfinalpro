import { useEffect, useState } from 'react';
import { ShoppingCart, Package, User, Search } from 'lucide-react';
import { useCart } from '../context/cartContext';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

export const MobileBottomNav = () => {
  const { cartItems, fetchAndAddToCart} = useCart();
  const navigate = useNavigate();
   const [userName, setUserName] = useState('');
useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await apiService.getProfile();
      setUserName(res.firstName || 'User');
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  fetchProfile();
}, []);


  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 h-16">
        <button
          onClick={() => navigate('/shop')}
          className="flex flex-col items-center justify-center space-y-1 text-gray-500"
        >
          <Search size={20} />
          <span className="text-xs">Browse</span>
        </button>
        <button
          onClick={() => navigate('/cart')}
          className="flex flex-col items-center justify-center space-y-1 relative text-gray-500"
        >
          <ShoppingCart size={20} />
          {cartItems.length > 0 && (
            <span className="absolute top-1 right-4 bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
          )}
          <span className="text-xs">Cart</span>
        </button>
        <button
          onClick={() => navigate('/orders')}
          className="flex flex-col items-center justify-center space-y-1 text-gray-500"
        >
          <Package size={20} />
          <span onClick={() => fetchAndAddToCart(product._id)}className="text-xs">Orders</span>
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="flex flex-col items-center justify-center space-y-1 text-gray-500"
        >
          <User size={20} />
          <span className="text-xs">Profile</span>
          {/*lets show user's name below icon */}
           <span className="text-[10px] text-gray-400">{userName}</span>  
        </button>
      </div>
    </div>
  );
};
