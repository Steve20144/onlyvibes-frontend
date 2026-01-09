/**
 * A sticky header component that includes a search bar and filter toggles.
 * Positioned at the top of the page with a z-index overlay.
 * * @param {object} props - The component props.
 * @param {string} props.searchQuery - The current value of the search input.
 * @param {function} props.onSearchChange - Handler for search input changes.
 * @param {function} props.onClearFilters - Handler to reset active filters.
 * @param {string} [props.placeholder="Search..."] - Placeholder text for the input field.
 * @returns {JSX.Element} The sticky header UI.
 */
const PageHeader = ({ searchQuery, onSearchChange, onClearFilters, placeholder = "Search..." }) => {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: '#050016',
      paddingTop: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      boxSizing: 'border-box',
    }}>
      {/* Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
        <input 
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={onSearchChange}
          style={{
            width: '100%', 
            maxWidth: '300px', 
            padding: '10px 15px', 
            borderRadius: '20px',
            border: 'none', 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            color: 'white',
            textAlign: 'center', 
            outline: 'none', 
            fontSize: '16px'
          }}
        />
      </div>

      {/* Filter Row */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingBottom: '15px',
        color: '#ccc', 
        fontSize: '13px' 
      }}>
        <button style={{ background: 'none', border: '1px solid #555', borderRadius: '10px', color: 'white', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}>Filters</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span>🕒</span> 22:30</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span>📍</span> 1.5 km</div>
        <button onClick={onClearFilters} style={{ background: 'rgba(255,0,0,0.2)', border: 'none', borderRadius: '10px', color: '#ff9999', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}>Clear</button>
      </div>
    </div>
  );
};

export default PageHeader;