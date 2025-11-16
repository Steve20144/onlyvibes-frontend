// OnlyVibes Auth module — split across files for easy integration with DB later

// File: src/auth/authService.js
// Purpose: abstract auth API. Currently uses static data; swap to real API by replacing fetch implementations.

const mockUsers = [
  { id: 1, username: 'alice', password: 'password123', name: 'Alice' },
  { id: 2, username: 'bob', password: 'hunter2', name: 'Bob' }
];

export const authService = {
  // login: returns { user, token }
  login: async (username, password) => {
    await new Promise(r => setTimeout(r, 250));
    const u = mockUsers.find(x => x.username === username && x.password === password);
    if (!u) throw new Error('Invalid credentials');
    const token = `fake-token-${u.id}-${Date.now()}`;
    return { user: { id: u.id, username: u.username, name: u.name }, token };
  },

  logout: async () => {
    await new Promise(r => setTimeout(r, 100));
    return true;
  }
};

// When integrating DB: replace login/logout with fetch calls to your API and keep the response shape { user, token }.


// File: src/auth/authFetch.js
// Purpose: small helper that injects Authorization header. Uses token from localStorage by default.

export async function authFetch(input, init = {}) {
  const s = localStorage.getItem('onlyvibes_auth');
  const token = s ? JSON.parse(s).token : null;
  const headers = new Headers(init.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const cfg = { ...init, headers };
  return fetch(input, cfg);
}


// File: src/auth/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from './authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = localStorage.getItem('onlyvibes_auth');
    if (s) {
      try {
        const parsed = JSON.parse(s);
        setUser(parsed.user);
        setToken(parsed.token);
      } catch (e) {
        localStorage.removeItem('onlyvibes_auth');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await authService.login(username, password);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem('onlyvibes_auth', JSON.stringify(res));
    return res.user;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
    localStorage.removeItem('onlyvibes_auth');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// File: src/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null; // or a spinner
  if (!user) return <Navigate to="/login" replace />;
  return children;
}


// File: src/pages/LoginPage.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';

export default function LoginPage({ onSuccessRedirect = '/' }) {
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) window.location.href = onSuccessRedirect;
  }, [user, onSuccessRedirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    setLoading(true);
    try {
      await login(username.trim(), password);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-950 to-black p-4">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-white mb-4">OnlyVibes — Sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-lg px-3 py-2 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="username" autoComplete="username" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-lg px-3 py-2 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="password" autoComplete="current-password" />
          </div>
          {error && <div className="text-sm text-red-400">{error}</div>}
          <div className="flex items-center justify-between">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-600 disabled:opacity-60 rounded-lg text-white font-medium hover:bg-purple-700">{loading ? 'Signing in...' : 'Sign in'}</button>
            <button type="button" onClick={() => { setUsername('alice'); setPassword('password123'); }} className="text-sm text-slate-300 hover:underline">Demo user</button>
          </div>
        </form>
        <div className="mt-4 text-sm text-slate-400">This login uses static data for now. Replace authService.login with a POST to your API when ready.</div>
      </div>
    </div>
  );
}


// File: src/auth/index.js
export { AuthProvider, useAuth } from './AuthProvider';
export { authService } from './authService';
export { authFetch } from './authFetch';
export { default as ProtectedRoute } from './ProtectedRoute';


// File: src/App.jsx (usage example)
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import { ProtectedRoute } from './auth/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


// Integration notes (inside the canvas): keep the response shape { user, token } from the server, use authFetch for API calls, and store tokens in localStorage or swap to httpOnly cookie later.
