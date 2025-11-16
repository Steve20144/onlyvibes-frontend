import React from 'react';
import { X } from 'lucide-react';

// Renamed to PopupDialog to match your import
export const PopupDialog = ({ 
  show, 
  onClose, 
  onConfirm, 
  title, 
  children, 
  confirmText = "Confirm", 
  cancelText = "Cancel" 
}) => {
  if (!show) {
    return null;
  }

  const isConfirmation = !!onConfirm;

  return (
    <div 
      style={styles.overlay} 
      onClick={onClose}
    >
      <div 
        style={styles.card} 
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button style={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={styles.content}>
          {children}
        </div>

        <div style={styles.footer}>
          {isConfirmation ? (
            <>
              <button 
                style={{...styles.btn, ...styles.btnCancel}} 
                onClick={onClose}
              >
                {cancelText}
              </button>
              <button 
                style={{...styles.btn, ...styles.btnConfirm}} 
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button 
              style={{...styles.btn, ...styles.btnConfirm}} 
              onClick={onClose}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000, // <--- Higher than the button
  },
  card: {
    background: '#1a1a2e',
    borderRadius: '20px',
    padding: '24px',
    width: '90%',
    maxWidth: '400px',
    border: '1px solid #333',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    color: 'white',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#888',
    cursor: 'pointer',
  },
  content: {
    marginBottom: '24px',
    fontSize: '15px',
    lineHeight: 1.6,
    color: '#ccc',
  },
  footer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  btn: {
    padding: '10px 20px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
  },
  btnConfirm: {
    background: 'linear-gradient(145deg, #6C63FF, #584ed8)',
    color: 'white',
  },
  btnCancel: {
    background: '#333',
    color: 'white',
  }
};

// Export default if you're importing it without {}
export default PopupDialog;