import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom'; // <--- Import useNavigate

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // <--- Init Hook

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // <--- Redirects to the page with NO nav bar
  };
  
  if (!user) return null; // ProtectedRoute handles the redirect usually, but this is safe

  return (
    <div className="page-container profile-page">
      <h1 className="page-title">{user.name}'s Profile</h1>
      <img src={user.profilePictureUrl} alt="Profile" className="profile-img" style={{borderRadius: '50%', width: '100px', height: '100px', marginBottom: '20px'}}/>
      <p>Email: {user.email}</p>
      <p>Role: {user.role} ({user.isVerified ? 'Verified' : 'Unverified'})</p>
      <p>Bio: {user.bio}</p>
      <p>Preferences: {user.preferences.join(', ')}</p>
      
      <button className="btn btn-primary full-width" onClick={() => console.log('Edit Profile Clicked')}>
        Edit Profile
      </button>
      
      <button className="btn btn-secondary full-width" onClick={handleLogout} style={{marginTop: '10px'}}>
        Logout
      </button>
    </div>
  );
};