import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="navbar-container">
      <div className="logo">SumitRamnani</div>

      <nav className="nav-center">
        <ul className="nav-links">
          <li><a href="#meet" className="active">Meet Sumit</a></li>
          <li><a href="#work">My Work</a></li>
          <li><a href="#casestudies">Case Studies</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact">Contact Me</a></li>
        </ul>
      </nav>

      <div className="nav-socials">
        <a href="#fb">fb</a>
        <a href="#tw">tw</a>
        <a href="#in">in</a>
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.5rem', color: 'var(--text-dark)' }} title="Toggle Theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
