import React, { useState, useRef, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { confirm, alert } from "../components/PopupDialog"; // Your popup import

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
  
  // REMOVED: const [showTestModal, setShowTestModal] = useState(false); <-- Not needed!

  useLayoutEffect(() => {
    // ... (your scroll logic) ...
  }, [location.pathname]);

  const handleScroll = (e) => {
    // ... (your scroll logic) ...
  };

  // --- NEW: The function to trigger the popup ---
  const handleTestClick = async () => {
    // 1. Trigger the confirmation popup and wait for click
    const result = await confirm(
      "You are testing the new popup system.<br/>Does it look good?", 
      "System Check"
    );

    // 2. Handle the result (True = Yes, False = No)
    if (result) {
      await alert("Awesome! You clicked <b>Yes</b>.", "Success");
    } else {
      console.log("User clicked No");
    }
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
        zIndex: 990, 
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}>
        {/* <button 
          onClick={() => setIsDebug(!isDebug)}
          style={debugButtonStyle(isDebug ? 'rgba(255, 50, 50, 0.8)' : '#333')}
        >
          Debug: {isDebug ? 'ON' : 'OFF'}
        </button> */}
        
        {/* UPDATED BUTTON */}
        {/* <button
          onClick={handleTestClick} 
          style={debugButtonStyle('#333')}
        >
          Test Modal
        </button> */}
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