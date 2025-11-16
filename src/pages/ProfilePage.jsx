import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  User, 
  Globe, 
  Heart, 
  MessageSquare, 
  Calendar, 
  SlidersHorizontal, 
  ChevronRight, 
  LogOut,
  Edit2
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); 
  };
  
  // This will be handled by your ProtectedRoute, but it's a good safeguard
  if (!user) return null; 

  // --- Mock Data from Mockup ---
  const mockFollowers = 235;
  const mockFollowing = 12;

  // --- Helper component for the list items ---
  const MenuItem = ({ icon, text, onClick, isLogout = false }) => (
    <button style={styles.menuItem} onClick={onClick}>
      <div style={{...styles.menuIcon, color: isLogout ? '#ff6b6b' : '#a8a8a8'}}>
        {icon}
      </div>
      <span style={{...styles.menuText, color: isLogout ? '#ff6b6b' : 'white'}}>
        {text}
      </span>
      {!isLogout && <ChevronRight size={20} style={styles.menuChevron} />}
    </button>
  );

  // Function to handle navigation for vertical links
  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.pageContainer}>
      
      {/* 1. Header Bar (from mockup) */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.username}>{user.name}</h1>
          {user.isVerified && <CheckCircle size={22} color="#00d26a" fill="#000" />}
        </div>
        
        {/* We can wire these up later */}
        <div style={styles.headerRight}>
          <button style={styles.editButton}>
            <Edit2 size={16} color="white" />
          </button>
          <CheckCircle size={28} color="#a8a8a8" />
        </div>
      </div>

      {/* 2. Profile Info Block (from mockup) */}
      <div style={styles.profileInfo}>
        {/* Use user's image if it exists, otherwise the icon */}
        {user.profilePictureUrl ? (
          <img src={user.profilePictureUrl} style={styles.profilePicCircle} alt="Profile" />
        ) : (
          <div style={styles.profilePicCircle}>
            <User size={50} color="#ccc" />
          </div>
        )}
        
        <div style={styles.stats}>
          <div>
            <span style={styles.statCount}>{mockFollowers}</span>
            <span style={styles.statLabel}>Followers</span>
          </div>
          <div>
            <span style={styles.statCount}>{mockFollowing}</span>
            <span style={styles.statLabel}>Following</span>
          </div>
        </div>
      </div>

      {/* 3. Bio Section (using user's bio) */}
      <p style={styles.bio}>
        {user.bio || "No bio available. Click edit to add one!"}
      </p>

      {/* 4. Create Event Button (wired to navigate) */}
      <button 
        style={styles.createButton}
        onClick={() => navigate('/events/create')} // <--- ADDED THIS LINE
      >
        <Globe size={18} />
        <span>Create an Event!</span>
      </button>

      {/* 5. Menu List (from mockup + Logout) */}
      <div style={styles.menuList}>
        <div style={styles.divider} />
        <MenuItem icon={<Heart size={20} />} text="Liked Events" onClick={() => navigate('/profile/liked')} />
        <MenuItem icon={<MessageSquare size={20} />} text="Reviewed Events" onClick={() => navigate('/profile/reviews')} />
        <MenuItem icon={<Calendar size={20} />} text="Organized Events" onClick={() => navigate('/profile/organized')} />
        <MenuItem icon={<SlidersHorizontal size={20} />} text="Edit Preferences" onClick={() => navigate('/profile/preferences')} />
        
        {/* Added your Logout functionality to fit the design */}
        <div style={styles.divider} />
        <MenuItem icon={<LogOut size={20} />} text="Logout" onClick={handleLogout} isLogout={true} />
      </div>

    </div>
  );
};

// --- Styles to match the mockup ---
const styles = {
  pageContainer: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#050016',
    color: 'white',
    padding: '20px 25px 100px 25px',
    boxSizing: 'border-box'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '25px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  username: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    color: 'white',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  editButton: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(145deg, #6C63FF, #584ed8)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  profilePicCircle: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    backgroundColor: '#1a1a2e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #333',
    objectFit: 'cover',
    flexShrink: 0,
  },
  stats: {
    display: 'flex',
    gap: '25px',
  },
  statCount: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: '13px',
    color: '#a8a8a8',
  },
  bio: {
    fontSize: '14px',
    color: '#ccc',
    lineHeight: 1.6,
    marginBottom: '25px',
  },
  createButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '12px',
    borderRadius: '20px',
    border: '1px solid #6C63FF',
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    color: '#fff',
    fontSize: '15px',
    cursor: 'pointer',
    marginBottom: '30px',
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    height: '1impx',
    backgroundColor: '#222',
    margin: '10px 0',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 5px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  },
  menuIcon: {
    marginRight: '15px',
  },
  menuText: {
    flex: 1,
    fontSize: '16px',
    fontWeight: '500'
  },
  menuChevron: {
    color: '#a8a8a8',
  }
};