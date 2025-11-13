import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "../styles/theme.css";

const ProfilePage = () => {
  const navigate = useNavigate();

  // Placeholder user data – later you can wire this to your /user endpoint
  const user = {
    username: "Long Username",
    followers: 235,
    following: 12,
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque felis eu felis semper, a convallis enim dictum. Nulla facilisi. Nullam ornare dapibus lacus. Nunc rutrum dolor vel interdum lobortis. Morbi pharetra vel felis a tristique. Duis imperdiet arcu in porta porta.`
  };

  const handleCreateEvent = () => {
    // adjust this path to whatever you used in App.js for the create event page
    navigate("/create-event");
  };

  return (
    <div className="page profile-page">
      {/* top section with username & action icons */}
      <header className="profile-header">
        <div className="profile-username-row">
          <h1 className="profile-username">{user.username}</h1>
          <span className="profile-verified">✓</span>
          <button className="profile-icon-button edit">
            ✎
          </button>
          <button className="profile-icon-button done">
            ✔
          </button>
        </div>
      </header>

      <main className="profile-main">
        {/* avatar + followers/following */}
        <section className="profile-top">
          <div className="profile-avatar">
            {/* simple circle avatar placeholder */}
            <span className="avatar-initial">U</span>
          </div>

          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-number">{user.followers}</span>
              <span className="profile-stat-label">Followers</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-number">{user.following}</span>
              <span className="profile-stat-label">Following</span>
            </div>
          </div>
        </section>

        {/* bio */}
        <section className="profile-bio">
          <p>{user.bio}</p>
        </section>

        {/* create event button */}
        <section className="profile-cta">
          <button className="primary-button profile-create-event" onClick={handleCreateEvent}>
            + Create an Event!
          </button>
        </section>

        {/* menu list */}
        <section className="profile-menu">
          <div className="profile-menu-item">
            <div className="profile-menu-left">
              <span className="profile-menu-icon">♡</span>
              <span className="profile-menu-text">Liked Events</span>
            </div>
            <span className="profile-menu-chevron">›</span>
          </div>

          <div className="profile-menu-item">
            <div className="profile-menu-left">
              <span className="profile-menu-icon">✩</span>
              <span className="profile-menu-text">Reviewed Events</span>
            </div>
            <span className="profile-menu-chevron">›</span>
          </div>

          <div className="profile-menu-item">
            <div className="profile-menu-left">
              <span className="profile-menu-icon">▢</span>
              <span className="profile-menu-text">Organized Events</span>
            </div>
            <span className="profile-menu-chevron">›</span>
          </div>

          <div className="profile-menu-item">
            <div className="profile-menu-left">
              <span className="profile-menu-icon">✎</span>
              <span className="profile-menu-text">Edit Preferences</span>
            </div>
            <span className="profile-menu-chevron">›</span>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
