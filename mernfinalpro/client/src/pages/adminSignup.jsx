// pages/AdminSignup.jsx
import Register from '../components/register';

const AdminSignup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Register defaultRole="admin" />
    </div>
  );
};

export default AdminSignup;
