// pages/BuyerSignup.jsx
import Register from '../components/register';

const BuyerSignup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Register defaultRole="buyer" />
    </div>
  );
};

export default BuyerSignup;
