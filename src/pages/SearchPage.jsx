// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import { alert } from '../components/PopupDialog'; // <--- NEW IMPORT

export const SearchPage = () => {
  const [query, setQuery] = useState('');
  
  const handleSearch = async (e) => {
    e.preventDefault();
    
    // 1. Validation Popup
    if (!query.trim()) {
        await alert("Please enter a keyword to search.", "Empty Search");
        return;
    }

    // 2. Logic for calling GET /search?q={query}
    // For now, we show the custom popup instead of the native alert
    await alert(`Searching for: <b>${query}</b>`, "Search Started");
    
    // In a real app, you would probably navigate here:
    // navigate(`/results?q=${query}`);
  };

  return (
    <div className="page-container search-page" style={{ padding: '20px', color: 'white' }}>
      <h1 className="page-title" style={{ fontSize: '24px', marginBottom: '20px' }}>Find Vibes</h1>
      
      <form onSubmit={handleSearch} className="search-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search events or users..." 
          className="search-input"
          style={{
            padding: '15px',
            borderRadius: '12px',
            border: '1px solid #333',
            background: '#1a1a2e',
            color: 'white',
            outline: 'none',
            fontSize: '16px'
          }}
        />
        
        <button 
            type="submit" 
            className="btn btn-primary full-width"
            style={{
                padding: '15px',
                borderRadius: '12px',
                border: 'none',
                background: '#6C63FF',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer'
            }}
        >
            Search (GET /search)
        </button>
      </form>
    </div>
  );
};