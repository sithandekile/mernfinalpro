import React, { useEffect, useState } from 'react';
import apiService from '../services/api';

export const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
   const fetchProfile = async () => {
  try {
    const res = await apiService.getProfile();
    
    setProfile({
      firstName: res.firstName || '',
      lastName: res.lastName || '',
      email: res.email || '',
      phone: res.phone || '',
    });
  } catch (error) {
    console.error('Failed to load profile:', error);
    setMessage('Failed to load profile');
  }
};


    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await apiService.updateProfile(profile);
      setMessage('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      setMessage('Update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">First Name</label>
        <input
          name="firstName"
          value={profile.firstName}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Last Name</label>
        <input
          name="lastName"
          value={profile.lastName}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={profile.email}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium">Phone</label>
        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-[#301934] text-white px-4 py-2 rounded hover:bg-purple-900"
      >
        Save Changes
      </button>

      {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
    </div>
  );
};

