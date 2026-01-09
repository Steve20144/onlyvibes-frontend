import React from 'react';

/**
 * A layout wrapper for the main content area of a page.
 * Applies standard padding and box-sizing to ensure consistent spacing.
 * * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the wrapper.
 * @returns {JSX.Element} The styled content container.
 */
const PageContent = ({ children }) => (
  <div style={{ 
    width: '100%', 
    paddingBottom: '80px',
    paddingLeft: '20px',
    paddingRight: '20px',
    boxSizing: 'border-box',
    marginTop: '10px'
  }}>
    {children}
  </div>
);

export default PageContent;