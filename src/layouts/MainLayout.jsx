import { useRef, useLayoutEffect } from "react";
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

/**
 * The primary application layout for authenticated users.
 * Features:
 * - A scrollable content area that hides native scrollbars for a mobile-app feel.
 * - A persistent Bottom Navigation bar.
 * - Automatic scroll-to-top behavior on route changes.
 * * @returns {JSX.Element} The main layout wrapper.
 */
export default function MainLayout() {
  const location = useLocation();
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    // ... (your scroll logic) ...
  }, [location.pathname]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: '#000',
      boxSizing: 'border-box',
      position: 'relative'
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
        className="no-scrollbar" 
        style={{
          flex: 1,
          overflowY: 'auto',
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        <Outlet />
      </div>
      
      {/* ... (Nav Bar Area) ... */}
      <div style={{
        flex: '0 0 auto',
        width: '100%',
        zIndex: 50,
        background: '#000'
      }}>
        <BottomNav />
      </div>

    </div>
  );
}