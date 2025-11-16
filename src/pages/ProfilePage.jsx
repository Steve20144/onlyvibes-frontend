// src/pages/ProfilePage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return <div className="page-container">Please log in.</div>;

  // Function to handle navigation for vertical links
  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="page-container profile-page">
      
      {/* HEADER & USER INFO AREA (Mockup Style) */}
      <div className="profile-header-area">
        <div className="user-casing">
          {/* Placeholder for Profile Picture */}
          <div className="profile-img-placeholder" style={{borderRadius: '50%', width: '70px', height: '70px', backgroundColor: '#5c3980', display: 'inline-block'}}>
            {/* User icon goes here */}
          </div> 
        </div>

        <h1 className="username" style={{marginTop: '10px'}}>{user.name} 
          <span className="material-icons verified-icon" style={{color: '#4CAF50', fontSize: '20px', verticalAlign: 'middle', marginLeft: '5px'}}>check_circle</span>
        </h1>
        
        {/* Stats and Edit Icons */}
        <div className="stats-row" style={{display: 'flex', justifyContent: 'center', gap: '20px', margin: '5px 0'}}>
            <span style={{fontSize: '16px'}}>235 Followers</span> 
            <span style={{fontSize: '16px'}}>12 Following</span>
            
            {/* Edit/Save Icons from Mockup #2 */}
            <span className="material-icons edit-profile-icon" style={{cursor: 'pointer'}}>edit</span>
            <span className="material-icons save-profile-icon" style={{cursor: 'pointer'}}>done</span>
        </div>
        
        {/* Bio Text Area */}
        <p className="bio-text" style={{textAlign: 'center', padding: '15px 0', color: 'var(--text-muted)'}}>
            {/* Using the full mockup text for better visualization */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque felis et felis semper, a convallis enim dictum. Nulla facilisi. Nunc ornare dapibus lacus. Nunc rutrum dolor eu interdum lobortis. Morbi pharetra vel felis a tristique. Duis imperdiet arcu in porta porta.
        </p>

        <button className="btn btn-primary" style={{marginBottom: '20px'}}>
            Create an Event!
        </button>
      </div>

      {/* VERTICAL ACTION MENU (Mockup Style) */}
      <div className="action-menu-list">
        {/* Liked Events (Linked to /feed as it shows liked events) */}
        <div className="profile-action-link" onClick={() => handleActionClick('/feed')}>
            <span className="material-icons icon-heart">favorite_border</span> 
            <span>Liked Events</span>
            <span className="material-icons arrow">chevron_right</span>
        </div>
        
        {/* Reviewed Events */}
        <div className="profile-action-link" onClick={() => console.log('Navigate to Reviewed Events')}>
            <span className="material-icons icon-review">rate_review</span> 
            <span>Reviewed Events</span>
            <span className="material-icons arrow">chevron_right</span>
        </div>
        
        {/* Organized Events (The path for the Edit Event flow) */}
        <div className="profile-action-link" onClick={() => handleActionClick('/profile/organized')}>
            <span className="material-icons icon-organized">download</span> 
            <span>Organized Events</span>
            <span className="material-icons arrow">chevron_right</span>
        </div>

        {/* Edit Preferences */}
        <div className="profile-action-link" onClick={() => console.log('Navigate to Edit Preferences')}>
            <span className="material-icons icon-prefs">edit</span> 
            <span>Edit Preferences</span>
            <span className="material-icons arrow">chevron_right</span>
        </div>
      </div>
      
      <button className="btn btn-secondary full-width" onClick={logout} style={{marginTop: '30px', maxWidth: '80%', margin: '30px auto', display: 'block'}}>
        Logout
      </button>

    </div>
  );
};