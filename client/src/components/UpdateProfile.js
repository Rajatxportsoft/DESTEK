import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SweetAlert from 'sweetalert2';
import { useAuth } from '../context/authContext';
import { updateProfile } from '../services/apiClient';

const UpdateProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
   
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        const { name, mobile } = response.data.user; 
        setName(name);
        setMobile(mobile);
      } catch (error) {
        console.error('Error fetching user data:', error);
        SweetAlert.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to fetch user data',
        });
      }
    };

    fetchUserData();
  }, [user.id]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('mobile', mobile);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      const response = await updateProfile(formData); 
      SweetAlert.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
      SweetAlert.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to update profile',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            className="border p-2 w-full"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="profilePic">Profile Picture</label>
          <input
            type="file"
            id="profilePic"
            className="border p-2 w-full"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
