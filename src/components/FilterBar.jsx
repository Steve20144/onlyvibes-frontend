// src/components/FilterBar.jsx
import React from "react";

const FilterBar = ({ timeLabel, radiusKm, onClear }) => {
  return (
    <div className="filters-row">
      <div className="filters-left">
        <button className="filter-pill" type="button">
          <span>View All Filters</span>
        </button>
      </div>
      <div className="filters-right">
        <div className="filter-pill">
          <span>🕒</span>
          <span>{timeLabel}</span>
        </div>
        <div className="filter-pill">
          <span>📍</span>
          <span>{radiusKm.toFixed(1)} km</span>
        </div>
        <button className="filter-pill" type="button" onClick={onClear}>
          <span>Clear Filters</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
