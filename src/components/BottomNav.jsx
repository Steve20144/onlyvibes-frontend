// src/components/BottomNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, User } from 'lucide-react';

export default function BottomNav(){
  const { pathname } = useLocation();
  const isActive = p => pathname === p;

  return (
    <nav
      // REMOVED: "fixed bottom-0 left-0 right-0"
      // ADDED: "w-full" and "bg-transparent" (or your preferred bg)
      className="onlyvibes-bottom-nav w-full z-50 flex justify-evenly items-center py-3"
      aria-label="Bottom navigation"
    >
      <Link to="/" className="flex flex-col items-center">
        <Home className={`w-6 h-6 ${isActive('/') ? 'text-purple-400' : 'text-gray-400'}`} />
      </Link>

      <Link to="/search" className="flex flex-col items-center">
        <Search className={`w-6 h-6 ${isActive('/search') ? 'text-purple-400' : 'text-gray-400'}`} />
      </Link>

      <Link to="/profile" className="flex flex-col items-center">
        <User className={`w-6 h-6 ${isActive('/profile') ? 'text-purple-400' : 'text-gray-400'}`} />
      </Link>
    </nav>
  );
}