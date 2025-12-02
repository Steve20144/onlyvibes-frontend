import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserId, logout } from '../api/auth';
import { getAccount } from '../api/accounts'; 
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
  const navigate = useNavigate();
  const userId = getCurrentUserId(); 
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch User Data on Load
  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await getAccount(userId);
        
        if (response.data) {
            setProfile(response.data);
        } else {
            setProfile(response);
        }

      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId, navigate]);

  // 2. Fixed Logout Handler
  const handleLogout = () => {
    logout(() => navigate('/login')); 
  };
  
  // Show mockup if user is not logged in
  if (!userId) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.guestContainer}>
            <h2 style={styles.guestTitle}>Sign In to view profile</h2>
            <button 
                style={styles.guestSignInBtn}
                onClick={() => navigate('/login')}
                className='guest-sign-in-button'
            >
                Sign In
            </button>
        </div>
      </div>
    );
  }

  // Show loading state while fetching (only for logged in users)
  if (loading) {
    return <div style={{...styles.pageContainer, display:'flex', justifyContent:'center', alignItems:'center'}}>Loading...</div>;
  }

  // Safety check if logged in but API failed
  if (!profile) return null; 

  // --- Mock Data ---
  const mockFollowers = 235;
  const mockFollowing = 12;

  // --- Helper component ---
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

  return (
    <div style={styles.pageContainer}>
      
      {/* Header Bar */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.username}>
            {profile.username || profile.firstName || "User"}
          </h1>
          {profile.isVerified && <CheckCircle size={22} color="#00d26a" fill="#000" />}
        </div>
        
        <div style={styles.headerRight}>
          <button style={styles.editButton} onClick={() => navigate('/profile/edit')}>
            <Edit2 size={16} color="white" />
          </button>
          <CheckCircle size={28} color="#a8a8a8" />
        </div>
      </div>

      {/* Profile Info Block */}
      <div style={styles.profileInfo}>
        {profile.profilePictureUrl ? (
          <img src={profile.profilePictureUrl} style={styles.profilePicCircle} alt="Profile" />
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

      <p style={styles.bio}>
        {profile.bio || `Hi, I'm ${profile.username || 'a user'} on OnlyVibes!`}
      </p>

      {/* Create Event Button */}
      <button 
        style={styles.createButton}
        onClick={() => navigate('/events/create')}
      >
        <Globe size={18} />
        <span>Create an Event!</span>
      </button>

      {/* Menu List */}
      <div style={styles.menuList}>
        <div style={styles.divider} />
        <MenuItem icon={<Heart size={20} />} text="Liked Events" onClick={() => navigate('/events/liked')} />
        <MenuItem icon={<MessageSquare size={20} />} text="Reviewed Events" onClick={() => navigate('/events/reviewed')} />
        <MenuItem icon={<Calendar size={20} />} text="Organized Events" onClick={() => navigate('/events/organized')} />
        <MenuItem icon={<SlidersHorizontal size={20} />} text="Edit Preferences" onClick={() => navigate('/profile/preferences')} />
        
        <div style={styles.divider} />
        <MenuItem icon={<LogOut size={20} />} text="Logout" onClick={handleLogout} isLogout={true} />
      </div>

    </div>
  );
};

// --- Styles ---
const styles = {
  pageContainer: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#050016',
    color: 'white',
    padding: '20px 25px 100px 25px',
    boxSizing: 'border-box'
  },
  guestContainer: {
    height: '70vh', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px'
  },
  guestTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: 'white',
    margin: 0
  },
  guestSignInBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #00d4ff',
    color: '#00d4ff',           
    padding: '12px 40px',
    borderRadius: '30px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '500',
    marginTop: '10px'
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
    textTransform: 'capitalize'
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
    height: '1px',
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
