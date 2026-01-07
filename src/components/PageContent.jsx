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
