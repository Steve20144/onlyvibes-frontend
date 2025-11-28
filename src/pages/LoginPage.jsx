import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { login as apiLogin, signup as apiSignup } from '../api/auth'; 
import { alert } from '../components/PopupDialog'; 
import '../styles/LoginPage.css';

export default function LoginPage({ onSuccessRedirect = '/' }) {
  const navigate = useNavigate();
  
  const [isSigningUp, setIsSigningUp] = useState(false); 
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if already logged in
  useEffect(() => {
    const userId = localStorage.getItem('currentUserId');
    if (userId) {
        // Use navigate instead of window.location
        navigate(onSuccessRedirect);
    }
  }, [onSuccessRedirect, navigate]);

  // ==========================================
  // REGISTER
  // ==========================================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !email || !password) {
      await alert("Username, Email, and Password are required.", "Missing Info");
      return;
    }
    
    setLoading(true);
    try {
      const userData = {
        username: username.trim(),
        email: email.trim(),
        password: password
      };

      const response = await apiSignup(userData);

      const userId = response.user?.id || response.user?._id || response.id;
      const token = response.token; 

      if (userId) {
          localStorage.setItem('currentUserId', userId);
          if (token) localStorage.setItem('token', token);

          await alert("Account created! Logging you in.", "Success");
          
          // Redirect immediately after OK is clicked
          navigate(onSuccessRedirect);
      } else {
          await alert("Account created! Please sign in.", "Success");
          setIsSigningUp(false);
      }
      
    } catch (err) {
      console.error("Registration error:", err);
      const userMessage = err.response?.data?.message || 'Registration failed.';
      await alert(userMessage, "Error"); 
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SIGN IN
  // ==========================================
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      await alert("Please enter email and password.", "Input Required");
      return;
    }

    setLoading(true);
    try {
      const response = await apiLogin({ email, password });
      
      const userId = response.user?.id || response.user?._id || response.id;
      const token = response.token;
      
      if (!userId) throw new Error("Login successful but no user ID received.");

      localStorage.setItem('currentUserId', userId);
      if (token) localStorage.setItem('token', token);

      await alert("Welcome back!", "Signed In");
      
      // Redirect immediately
      navigate(onSuccessRedirect);

    } catch (err) {
      console.error("Login error:", err);
      const userMessage = err.response?.data?.message || 'Invalid email or password.';
      await alert(userMessage, "Login Failed"); 
    } finally {
      setLoading(false);
    }
  };

  // --- Render Fields ---
  const renderFormFields = () => (
    <>
      {isSigningUp && (
        <div className="input-group">
          <label className="input-label">Username</label>
          <input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="login-input" 
            placeholder="coolUser123" 
            autoComplete="username"
          />
        </div>
      )}
      
      <div className="input-group">
        <label className="input-label">Email</label>
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="login-input" 
          placeholder="email@example.com" 
          type="email" 
          autoComplete="email"
        />
      </div>
      
      <div className="input-group">
        <label className="input-label">Password</label>
        <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          className="login-input" 
          placeholder="password" 
          autoComplete="current-password"
        />
      </div>
    </>
  );

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          OnlyVibes — {isSigningUp ? 'Join' : 'Sign in'}
        </h1>
        
        <form onSubmit={isSigningUp ? handleRegister : handleSignIn} className="login-form">
          {renderFormFields()}
          
          <div className="form-footer">
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Processing...' : (isSigningUp ? 'Sign Up' : 'Sign in')}
            </button>
            <button 
              type="button" 
              onClick={() => { 
                setIsSigningUp(!isSigningUp); 
                setError('');
                setUsername('');
                setEmail('');
                setPassword('');
              }} 
              className="demo-link"
            >
              {isSigningUp ? 'Already have an account? Sign in' : 'New here? Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}