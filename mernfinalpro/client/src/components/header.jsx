
// Header Component
import { ShoppingCart, Shield, Menu, X } from 'lucide-react';
import { useCart } from '../context/cartContext';

export const Header = ()=>{
const { cartItems, currentPage, setCurrentPage, isMobileMenuOpen, setIsMobileMenuOpen } =useCart();
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-2xl font-bold text-orange-600"
            >
              SafeSwap Local
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`${currentPage === 'home' ? 'text-orange-600' : 'text-gray-700'} hover:text-orange-600 transition-colors`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('shop')}
              className={`${currentPage === 'shop' ? 'text-orange-600' : 'text-gray-700'} hover:text-orange-600 transition-colors`}
            >
              Shop
            </button>
            <button 
              onClick={() => setCurrentPage('how-it-works')}
              className={`${currentPage === 'how-it-works' ? 'text-orange-600' : 'text-gray-700'} hover:text-orange-600 transition-colors`}
            >
              How It Works
            </button>
            <button 
              onClick={() => setCurrentPage('referral')}
              className={`${currentPage === 'referral' ? 'text-orange-600' : 'text-gray-700'} hover:text-orange-600 transition-colors`}
            >
              Referral
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-2 space-y-1">
            <button 
              onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-700 hover:text-orange-600"
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-700 hover:text-orange-600"
            >
              Shop
            </button>
            <button 
              onClick={() => { setCurrentPage('how-it-works'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-700 hover:text-orange-600"
            >
              How It Works
            </button>
            <button 
              onClick={() => { setCurrentPage('referral'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-700 hover:text-orange-600"
            >
              Referral
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

