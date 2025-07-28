import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { MobileBottomNav } from './components/mobileBottomNav';
import { Homepage } from './pages/home';
import { ShopPage } from './pages/shop';
import { ProductDetails } from './pages/productDetails';
import { HowItWorks } from './pages/howItWorks';
import { ReferralProgram } from './pages/referral';
import { Cart } from './pages/cart';
import { Checkout } from './pages/checkOut';
import { OrdersPage } from './pages/orders';
import { ProfilePage } from './pages/profile';
import AdminDashboard from './pages/admin/dashboard';
import Register from './pages/register';
import Login from './pages/login'; // Don't forget this!

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/referral" element={<ReferralProgram />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <MobileBottomNav />
    </div>
  );
}
