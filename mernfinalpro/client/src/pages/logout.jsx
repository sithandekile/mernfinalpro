// components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api'; 

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    apiService.logout();

  
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
