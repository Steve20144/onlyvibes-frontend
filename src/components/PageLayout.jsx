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
