import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (err) {
            console.error(err);
            setError('Invalid credentials or login failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1>Admin <span>Access</span></h1>
                    <p>Enter your credentials to manage your portfolio.</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="admin@portfolio.com" 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="••••••••" 
                            required 
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
                <div className="login-footer">
                    <button onClick={() => navigate('/')} className="back-link">Return to Portfolio</button>
                </div>
            </div>
            <div className="login-bg-glow"></div>
        </div>
    );
};

export default Login;
