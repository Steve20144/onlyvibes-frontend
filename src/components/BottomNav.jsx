// src/components/BottomNav.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const getClassName = ({ isActive }) =>
    `bottom-nav-item${isActive ? " active" : ""}`;

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={getClassName} end>
        <span className="bottom-nav-icon">🏠</span>
        <span>Home</span>
      </NavLink>
      <NavLink to="/events/new" className={getClassName}>
        <span className="bottom-nav-icon">🔍</span>
        <span>Create</span>
      </NavLink>
      <NavLink to="/profile" className={getClassName}>
        <span className="bottom-nav-icon">👤</span>
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
