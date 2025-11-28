import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/PopupDialog.css'; 

const PopupComponent = ({ message, title, type, onConfirm, onCancel, close }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = (callback) => {
    setIsVisible(false);
    // Wait for animation to finish before unmounting
    setTimeout(() => {
      if (callback) callback();
      close(); 
    }, 300); 
  };

  return (
    <div className={`modal-overlay ${isVisible ? 'active' : ''}`} onClick={() => handleClose(onCancel)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {title && <h3 style={{ color: 'white', marginBottom: '10px' }}>{title}</h3>}
        <p className="modal-text" dangerouslySetInnerHTML={{ __html: message }} />
        
        <div className="modal-actions">
          {type === 'confirm' ? (
            <>
              <button className="modal-btn btn-yes" onClick={() => handleClose(onConfirm)}>Yes</button>
              <button className="modal-btn btn-no" onClick={() => handleClose(onCancel)}>No</button>
            </>
          ) : (
            <button className="modal-btn btn-no" style={{ width: '100%' }} onClick={() => handleClose(onConfirm)}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const spawnPopup = ({ type, title, message }) => {
  return new Promise((resolve) => {
    // Create a temporary div to hold the popup
    const div = document.createElement('div');
    document.body.appendChild(div);
    const root = createRoot(div);

    const cleanup = () => {
      root.unmount();
      div.remove();
    };

    // Render the component into the independent div
    root.render(
      <PopupComponent
        type={type}
        title={title}
        message={message}
        onConfirm={() => resolve(true)} // Resolve promise with TRUE
        onCancel={() => resolve(false)} // Resolve promise with FALSE
        close={cleanup}
      />
    );
  });
};

// Exported Functions
export const confirm = async (message, title = "Are you sure?") => {
  return spawnPopup({ type: 'confirm', title, message });
};

export const alert = async (message, title = "Notice") => {
  return spawnPopup({ type: 'info', title, message });
};