import { ShoppingCart, Package, User,Search } from 'lucide-react';
import { useCart } from '../context/cartContext';


// Mobile Bottom Navigation
export const MobileBottomNav = ()=>{
const { currentPage, setCurrentPage, cartItems } =useCart()
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 h-16">
        <button 
          onClick={() => setCurrentPage('shop')}
          className={`flex flex-col items-center justify-center space-y-1 ${currentPage === 'shop' ? 'text-orange-600' : 'text-gray-500'}`}
        >
          <Search size={20} />
          <span className="text-xs">Browse</span>
        </button>
        <button 
          onClick={() => setCurrentPage('cart')}
          className={`flex flex-col items-center justify-center space-y-1 relative ${currentPage === 'cart' ? 'text-orange-600' : 'text-gray-500'}`}
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
          onClick={() => setCurrentPage('orders')}
          className={`flex flex-col items-center justify-center space-y-1 ${currentPage === 'orders' ? 'text-orange-600' : 'text-gray-500'}`}
        >
          <Package size={20} />
          <span className="text-xs">Orders</span>
        </button>
        <button 
          onClick={() => setCurrentPage('profile')}
          className={`flex flex-col items-center justify-center space-y-1 ${currentPage === 'profile' ? 'text-orange-600' : 'text-gray-500'}`}
        >
          <User size={20} />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
};




