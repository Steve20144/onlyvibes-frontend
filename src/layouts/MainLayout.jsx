import React, { useState, useRef, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
// Assuming your modal is at this path
import PopupDialog from "../components/PopupDialog"; 

const hideScrollbarStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const scrollPositions = {}; 

export default function MainLayout() {
  const location = useLocation();
  const scrollRef = useRef(null);
  
  const [isDebug, setIsDebug] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false); 

  useLayoutEffect(() => {
    // ... (your scroll logic) ...
  }, [location.pathname]);

  const handleScroll = (e) => {
    // ... (your scroll logic) ...
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: '#000',
      boxSizing: 'border-box',
      position: 'relative',
      border: isDebug ? '4px solid red' : 'none' 
    }}>
      
      <style>{hideScrollbarStyle}</style>

      {/* --- BUTTON WRAPPER --- */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        zIndex: 990, // <--- THIS IS THE FIX (was 99999)
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}>
        <button 
          onClick={() => setIsDebug(!isDebug)}
          style={debugButtonStyle(isDebug ? 'rgba(255, 50, 50, 0.8)' : '#333')}
        >
          Debug: {isDebug ? 'ON' : 'OFF'}
        </button>
        
        <button
          onClick={() => setShowTestModal(true)}
          style={debugButtonStyle('#333')}
        >
          Test Modal
        </button>
      </div>

      {/* ... (Scrollable content / Outlet) ... */}
      <div 
        ref={scrollRef}          
        onScroll={handleScroll}  
        className="no-scrollbar" 
        style={{
          flex: 1,
          overflowY: 'auto',
          position: 'relative',
          boxSizing: 'border-box',
          border: isDebug ? '2px dashed cyan' : 'none'
        }}
      >
        <Outlet />
      </div>
      
      {/* ... (Nav Bar Area) ... */}
      <div style={{
        flex: '0 0 auto',
        width: '100%',
        zIndex: 50,
        background: '#000',
        borderTop: isDebug ? '2px solid yellow' : 'none'
      }}>
        <BottomNav />
      </div>

      {/* --- MODAL --- */}
      <PopupDialog
        show={showTestModal}
        onClose={() => setShowTestModal(false)}
        title="Test Modal"
      >
        This is a test modal triggered from the MainLayout.
      </PopupDialog>

    </div>
  );
}

// Helper function for button styles
const debugButtonStyle = (backgroundColor) => ({
  background: backgroundColor,
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '4px 8px',
  fontSize: '12px',
  cursor: 'pointer',
  fontFamily: 'sans-serif'
});