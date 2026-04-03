import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Navbar.css';

const Navbar = () => {
    const [theme, setTheme] = useState('light');
    const [navbarData, setNavbarData] = useState({
        logo: 'SumitRamnani',
        links: [
            { label: 'Meet Sumit', href: '#meet' },
            { label: 'My Work', href: '#work' },
            { label: 'Case Studies', href: '#casestudies' },
            { label: 'Testimonials', href: '#testimonials' },
            { label: 'Blog', href: '#blog' },
            { label: 'Contact Me', href: '#contact' }
        ]
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const fetchNavbar = async () => {
            try {
                const docRef = doc(db, 'content', 'navbar');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setNavbarData(docSnap.data());
                }
            } catch (error) {
                console.error("Error fetching navbar data", error);
            }
        };
        fetchNavbar();
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="navbar-container">
            <div className="logo">{navbarData.logo}</div>

            <nav className="nav-center">
                <ul className="nav-links">
                    {navbarData.links.map((link, index) => (
                        <li key={index}>
                            <a href={link.href}>{link.label}</a>
                        </li>
                    ))}
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
