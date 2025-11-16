import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, User } from 'lucide-react';

export default function BottomNav(){
  const { pathname } = useLocation();
  
  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // --- 1. CHANGED COLORS ---
  const activeColor = "#FFFFFF";   // White
  const inactiveColor = "#888"; // Gray

  return (
    <nav
      style={{
        width: '100%',
        zIndex: 50,
        display: 'flex',
        alignItems: 'stretch', // <-- 2. STRETCH items vertically
        background: '#000',
        
        // 3. ADDED PADDING HERE to control the height
        paddingTop: '10px',
        paddingBottom: '20px', // Extra for iPhone home bar area
      }}
      aria-label="Bottom navigation"
    >
      {/* 4. APPLIED STYLES TO LINKS */}
      <Link to="/" style={linkStyle}>
        <Home 
          className="w-6 h-6" 
          color={isActive('/') ? activeColor : inactiveColor}
          fill={isActive('/') ? activeColor : 'none'}
        />
      </Link>

      <Link to="/search" style={linkStyle}>
        <Search 
          className="w-6 h-6" 
          color={isActive('/search') ? activeColor : inactiveColor}
          fill={isActive('/search') ? activeColor : 'none'}
        />
      </Link>

      <Link to="/profile" style={linkStyle}>
        <User 
          className="w-6 h-6" 
          color={isActive('/profile') ? activeColor : inactiveColor}
          fill={isActive('/profile') ? activeColor : 'none'}
        />
      </Link>
    </nav>
  );
}

// 5. HELPER STYLE FOR LINKS
// This makes each link fill its space
const linkStyle = {
  flex: 1, // This spaces them apart evenly
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};