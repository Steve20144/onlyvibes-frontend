// src/pages/SearchPage.jsx
import React, { useState } from 'react';

export const SearchPage = () => {
  const [query, setQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Logic for calling GET /search?q={query}
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="page-container search-page">
      <h1 className="page-title">Find Vibes</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search events or users..." 
          className="search-input"
        />
        <button type="submit" className="btn btn-primary full-width">Search (GET /search)</button>
      </form>
    </div>
  );
};