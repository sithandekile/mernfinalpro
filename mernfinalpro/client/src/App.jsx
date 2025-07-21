//main application
import { useCart } from './context/cartContext';
import {Header} from './components/header';
import {MobileBottomNav} from './components/mobileBottomNav';
import {Homepage} from './pages/home';
import {ShopPage} from './pages/shop';
import {ProductDetails} from './pages/productDetails';
import {HowItWorks} from './pages/howItWorks';
import {ReferralProgram} from './pages/referral';
import {Cart} from './pages/cart';
import {Checkout} from './pages/checkOut';
import {OrdersPage} from './pages/orders';
import {ProfilePage} from './pages/profile';


export default function App() {
  const { currentPage } = useCart();

  const renderPage = () => {
    if (currentPage.startsWith('product-')) {
      const productId = currentPage.split('-')[1];
      return <ProductDetails productId={productId} />;
    }

    switch (currentPage) {
      case 'home': return <Homepage />;
      case 'shop': return <ShopPage />;
      case 'how-it-works': return <HowItWorks />;
      case 'referral': return <ReferralProgram />;
      case 'cart': return <Cart />;
      case 'checkout': return <Checkout />;
      case 'orders': return <OrdersPage />;
      case 'profile': return <ProfilePage />;
      default: return <Homepage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {renderPage()}
      <MobileBottomNav />
    </div>
  );
}



// // Main App Component
// const App = () => {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [cartItems, setCartItems] = useState([]);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const addToCart = (product) => {
//     const existingItem = cartItems.find(item => item.id === product.id);
//     if (existingItem) {
//       setCartItems(cartItems.map(item => 
//         item.id === product.id 
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       ));
//     } else {
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }
//     alert('Added to cart!');
//   };

//   const renderPage = () => {
//     if (currentPage.startsWith('product-')) {
//       const productId = currentPage.split('-')[1];
//       return (
//         <ProductDetails 
//           productId={productId} 
//           onAddToCart={addToCart}
//           setCurrentPage={setCurrentPage}
//         />
//       );
//     }

//     switch (currentPage) {
//       case 'home':
//         return <Homepage setCurrentPage={setCurrentPage} onAddToCart={addToCart} />;
//       case 'shop':
//         return <ShopPage onAddToCart={addToCart} setCurrentPage={setCurrentPage} />;
//       case 'how-it-works':
//         return <HowItWorks />;
//       case 'referral':
//         return <ReferralProgram />;
//       case 'cart':
//         return <Cart cartItems={cartItems} setCartItems={setCartItems} setCurrentPage={setCurrentPage} />;
//       case 'checkout':
//         return <Checkout cartItems={cartItems} setCartItems={setCartItems} setCurrentPage={setCurrentPage} />;
//       case 'orders':
//         return <OrdersPage />;
//       case 'profile':
//         return <ProfilePage />;
//       default:
//         return <Homepage setCurrentPage={setCurrentPage} onAddToCart={addToCart} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header 
//         cartItems={cartItems} 
//         currentPage={currentPage} 
//         setCurrentPage={setCurrentPage}
//         isMobileMenuOpen={isMobileMenuOpen}
//         setIsMobileMenuOpen={setIsMobileMenuOpen}
//       />
      
//       {renderPage()}
      
//       <MobileBottomNav 
//         currentPage={currentPage} 
//         setCurrentPage={setCurrentPage}
//         cartItems={cartItems}
//       />
//     </div>
//   );
// };

// export default App;

// src/
// ├── components/
// │   ├── Header/
// │   │   ├── Header.jsx
// │   │   └── Header.css
// │   ├── MobileBottomNav/
// │   │   ├── MobileBottomNav.jsx
// │   │   └── MobileBottomNav.css
// │   └── ProductCard/
// │       ├── ProductCard.jsx
// │       └── ProductCard.css
// ├── pages/
// │   ├── Home/
// │   │   ├── Home.jsx
// │   │   └── Home.css
// │   ├── Shop/
// │   │   ├── Shop.jsx
// │   │   └── Shop.css
// │   ├── ProductDetails/
// │   │   ├── ProductDetails.jsx
// │   │   └── ProductDetails.css
// │   ├── HowItWorks/
// │   │   ├── HowItWorks.jsx
// │   │   └── HowItWorks.css
// │   ├── Referral/
// │   │   ├── Referral.jsx
// │   │   └── Referral.css
// │   ├── Cart/
// │   │   ├── Cart.jsx
// │   │   └── Cart.css
// │   ├── Checkout/
// │   │   ├── Checkout.jsx
// │   │   └── Checkout.css
// │   ├── Orders/
// │   │   ├── Orders.jsx
// │   │   └── Orders.css
// │   └── Profile/
// │       ├── Profile.jsx
// │       └── Profile.css
// ├── services/
// │   └── apiService.js
// ├── context/
// │   └── CartContext.jsx
// ├── App.jsx
// └── index.js