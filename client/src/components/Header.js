import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const referralLink = `${window.location.origin}/${user?.id || ''}`;
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
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between">
        <div>
          <Link to="/" className="mr-4">Home</Link>
          {user && <Link to="/referrals" className="mr-4">Referral Users</Link>}
          {user && <Link to="/update" className="mr-4">Update Profile</Link>}
          {user && (
            <button
              onClick={handleCopyLink}
              className="mx-4 py-1 px-3 bg-blue-600 text-white rounded"
            >
              {copied ? 'Link Copied!' : 'Copy Referral Link'}
            </button>
          )}
        </div>
        <div>
          {user ? (
            <>
              <span className="mr-4">{user.email}</span>
              <button onClick={logout} className="py-1 px-3 bg-red-600 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="py-1 px-3 bg-blue-600 rounded mr-4">Login</Link>
              <Link to="/" className="py-1 px-3 bg-blue-600 rounded">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
