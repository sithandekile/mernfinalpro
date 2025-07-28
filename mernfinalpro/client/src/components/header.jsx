import { ShoppingCart, Shield, Menu, X } from 'lucide-react';
import { useCart } from '../context/cartContext';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const { cartItems, isMobileMenuOpen, setIsMobileMenuOpen } = useCart();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? 'text-orange-600' : 'text-gray-700';

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-600">
              SafeSwap Local
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`${isActive('/')} hover:text-orange-600 transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`${isActive('/shop')} hover:text-orange-600 transition-colors`}
            >
              Shop
            </Link>
            <Link
              to="/how-it-works"
              className={`${isActive('/how-it-works')} hover:text-orange-600 transition-colors`}
            >
              How It Works
            </Link>
            <Link
              to="/register"
              className={`${isActive('/register')} hover:text-orange-600 transition-colors`}
            >
              Register
            </Link>
            <Link
              to="/referral"
              className={`${isActive('/referral')} hover:text-orange-600 transition-colors`}
            >
              Referral
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>

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
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-gray-700 hover:text-orange-600"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-gray-700 hover:text-orange-600"
            >
              Shop
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-gray-700 hover:text-orange-600"
            >
              How It Works
            </Link>
            <Link
              to="/referral"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-gray-700 hover:text-orange-600"
            >
              Referral
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-gray-700 hover:text-orange-600"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
