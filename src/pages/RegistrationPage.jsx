// src/pages/RegistrationPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        await login(email, password); 
        alert('Registration successful! Logged in.');
        navigate('/'); 
    } catch (error) {
        alert('Registration failed.');
    }
  };

  return (
    <div className="page-container registration-page">
      <h1>Join OnlyVibes</h1>
      <form onSubmit={handleRegister} className="registration-form">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit" className="btn btn-primary full-width">Register & Login (POST /accounts)</button>
      </form>
    </div>
  );
};