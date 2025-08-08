import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../services/api';
import { useFormik } from 'formik';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const res = await apiService.post('/users/login', values);
      const { token, user } = res.data;

      localStorage.setItem('token', token);

      if (user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/checkout');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const { handleSubmit, values, handleChange, handleBlur } = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back!</h2>

        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email} 
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password} 
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="w-full bg-orange-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange-700 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
