import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useParams } from 'react-router-dom';

const ReferPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  
  const referralLink = `${window.location.origin}/?referral=${id || user?.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setCopied(true); 
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Failed to copy the link:', error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Refer a Friend</h2>
      <p className="mb-4">
        Share this link with your friends to refer them to our platform and earn points.
      </p>
      <div className="mb-4 p-2 bg-gray-100 border rounded">
        <span className="text-gray-700">{referralLink}</span>
      </div>
      <button 
        onClick={handleCopyLink} 
        className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {copied ? 'Link Copied!' : 'Copy Link'}
      </button>
    </div>
  );
};

export default ReferPage;
