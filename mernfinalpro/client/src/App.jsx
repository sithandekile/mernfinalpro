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
import AdminDashboard from './pages/admin/dashboard'

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
      case 'dashboard': return <AdminDashboard/>;
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


