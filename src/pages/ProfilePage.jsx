// src/pages/ProfilePage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  
  if (!user) return <div className="page-container">Please log in.</div>;

  return (
    <div className="page-container profile-page">
      <h1 className="page-title">{user.name}'s Profile</h1>
      <img src={user.profilePictureUrl} alt="Profile" className="profile-img" style={{borderRadius: '50%', width: '100px', height: '100px', marginBottom: '20px'}}/>
      <p>Email: {user.email}</p>
      <p>Role: {user.role} ({user.isVerified ? 'Verified' : 'Unverified'})</p>
      <p>Bio: {user.bio}</p>
      <p>Preferences: {user.preferences.join(', ')}</p>
      
      <button className="btn btn-primary full-width" onClick={() => console.log('Simulating PUT /accounts/{userId} call')}>
        Edit Profile (PUT /accounts)
      </button>
      <button className="btn btn-secondary full-width" onClick={logout} style={{marginTop: '10px'}}>
        Logout
      </button>
    </div>
  );
};