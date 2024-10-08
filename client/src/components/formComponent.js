import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { saveFormData } from '../services/apiClient';
import { useParams } from 'react-router-dom';

const FormComponent = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    referralCode: '',
    gender: '',
    technologies: [],
    profilePics: [],
    dob: '',
    termsAccepted: false,
    password: '',
  });

  const [profilePicInputs, setProfilePicInputs] = useState([0]);

  useEffect(() => {
    if (id) {
      setFormData((prevData) => ({ ...prevData, referralCode: id }));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'mobile' && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedTechnologies = [...formData.technologies];
    if (checked) {
      updatedTechnologies.push(value);
    } else {
      updatedTechnologies = updatedTechnologies.filter((tech) => tech !== value);
    }
    setFormData({ ...formData, technologies: updatedTechnologies });
  };

  const handleProfilePicChange = (e, index) => {
    const files = Array.from(e.target.files);
    const updatedPics = [...formData.profilePics];

    if (!updatedPics[index]) {
      updatedPics[index] = [];
    }
    
    updatedPics[index] = files;
    setFormData({ ...formData, profilePics: updatedPics });
  };

  const addProfilePicInput = () => {
    setProfilePicInputs([...profilePicInputs, profilePicInputs.length]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dob = new Date(formData.dob);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 18) {
      Swal.fire('Error', 'You must be at least 18 years old.', 'error');
      return;
    }

    if (!formData.termsAccepted) {
      Swal.fire('Error', 'You must accept the terms and conditions.', 'error');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('mobile', formData.mobile);
    data.append('referralCode', formData.referralCode);
    data.append('gender', formData.gender);
    data.append('dob', formData.dob);
    data.append('password', formData.password);
    data.append('technologies', formData.technologies.join(','));

    formData.profilePics.forEach((files) => {
      files.forEach((file) => {
        data.append('profilePic', file);
      });
    });

    try {
      const response = await saveFormData(data);
      Swal.fire('Success', response.data.message, 'success');
      setFormData({
        name: '',
        mobile: '',
        referralCode: '',
        gender: '',
        technologies: [],
        profilePics: [],
        dob: '',
        termsAccepted: false,
        password: '',
      });
      setProfilePicInputs([0]);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      Swal.fire('Error', errorMessage, 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            maxLength={10} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Referral Code</label>
          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <div className="mt-2 space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              Female
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Technologies</label>
          <div className="mt-2 space-x-4">
            <label>
              <input
                type="checkbox"
                value="Nodejs"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Nodejs
            </label>
            <label>
              <input
                type="checkbox"
                value="React"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              React
            </label>
            <label>
              <input
                type="checkbox"
                value="SQL"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              SQL
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Profile Picture</label>
          {profilePicInputs.map((_, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="file"
                name={`profilePics_${index}`}
                multiple
                onChange={(e) => handleProfilePicChange(e, index)}
                className="block w-full text-sm text-gray-500"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addProfilePicInput}
            className="mt-2 text-blue-600 hover:underline"
          >
            Add More Images
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
            className="mr-2"
            required
          />
          <label>I accept the terms and conditions</label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
