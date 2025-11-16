import React, { useState, useRef, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";

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
  
  // --- CHANGED THIS LINE ---
  const [isDebug, setIsDebug] = useState(false); // Default to OFF

  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    const savedPosition = scrollPositions[location.pathname] || 0;
    scrollRef.current.scrollTop = savedPosition;

    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = savedPosition;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleScroll = (e) => {
    const position = e.target.scrollTop;
    scrollPositions[location.pathname] = position;
  };

  return (
    /* 1. RED BORDER = The "Phone" Frame */
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: '#000',
      boxSizing: 'border-box',
      position: 'relative',
      
      /* 4. Make the border conditional */
      border: isDebug ? '4px solid red' : 'none' 
    }}>
      
      <style>{hideScrollbarStyle}</style>

      {/* 5. Add the Debug Toggle Button */}
      <button 
        onClick={() => setIsDebug(!isDebug)}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          zIndex: 99999,
          background: isDebug ? 'rgba(255, 50, 50, 0.8)' : '#333',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '4px 8px',
          fontSize: '12px',
          cursor: 'pointer',
          fontFamily: 'sans-serif'
        }}
      >
        Debug: {isDebug ? 'ON' : 'OFF'}
      </button>

      {/* 2. BLUE BORDER = Scrollable Content */}
      <div 
        ref={scrollRef}          
        onScroll={handleScroll}  
        className="no-scrollbar" 
        style={{
          flex: 1,
          overflowY: 'auto',
          position: 'relative',
          boxSizing: 'border-box',

          /* 6. Make the border conditional */
          border: isDebug ? '2px dashed cyan' : 'none'
        }}
      >
        <Outlet />
      </div>
      
      {/* 3. NAV BAR AREA (Yellow Border) */}
      <div style={{
        flex: '0 0 auto',
        width: '100%',
        zIndex: 50,
        paddingBottom: '20px',
        paddingTop: '10px',
        background: '#000',

        /* 7. Make the border conditional */
        borderTop: isDebug ? '2px solid yellow' : 'none'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
           <BottomNav />
        </div>
      </div>

    </div>
  );
}