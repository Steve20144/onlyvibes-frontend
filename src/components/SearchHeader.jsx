// src/components/SearchHeader.jsx
import React from "react";

const SearchHeader = ({ value, onChange, onSubmit }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit?.();
    }
  };

  return (
    <header className="app-header">
      <div className="search-bar">
        <span className="search-bar-icon">🔍</span>
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <span className="search-bar-mic">🎤</span>
      </div>
    </header>
  );
};

export default SearchHeader;
