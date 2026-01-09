import React from 'react';

/**
 * The top-level layout container for pages.
 * Establishes a flex column structure for full-page alignment.
 * * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The page elements (Header, Content, etc.).
 * @returns {JSX.Element} The layout container.
 */
const PageLayout = ({ children }) => (
  <div style={{ 
    width: '100%', 
    height: 'auto', 
    display: 'flex', 
    flexDirection: 'column',
  }}>
    {children}
  </div>
);

export default PageLayout;