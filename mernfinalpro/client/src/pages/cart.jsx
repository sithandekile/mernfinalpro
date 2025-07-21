// Cart Component
import { ShoppingCart,Shield } from 'lucide-react';
import { useCart } from '../context/cartContext.jsx';


export const Cart = ()=> {
  const { cartItems, setCartItems, setCurrentPage } =useCart()
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100">
            <ShoppingCart size={64} className="text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Discover amazing pre-owned household goods</p>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
              {cartItems.map(item => (
                <div key={item.id} className="p-6">
                  <div className="flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.condition} condition</p>
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="mx-4 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">${item.price * item.quantity}</div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>${deliveryFee}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setCurrentPage('checkout')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors mb-4"
              >
                Proceed to Checkout
              </button>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center">
                  <Shield size={16} className="text-orange-600 mr-2" />
                  <span className="text-sm text-orange-700">Protected by Escrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
