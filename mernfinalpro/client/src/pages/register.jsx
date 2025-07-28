import apiService from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik'
import { useState } from 'react';

const Register = () => {


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


  const onSubmit = async e => {
    try {

      console.log(values);
      
      const res = await apiService.post('/users/register', values);
      const { token, user } = res.data;
      localStorage.setItem('token', token);

      if (user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/payment');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'admin',
  }

  const { handleSubmit, values, handleChange, handleBlur } = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-sm">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <select
            name="role"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-600"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-orange-700 text-white py-2 rounded-lg hover:bg-orange-800 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
