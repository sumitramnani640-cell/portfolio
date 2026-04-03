import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Footer.css';

const Footer = () => {
    const [footerData, setFooterData] = useState({
        copyright: '© 2024 Sumit Ramnani. All rights reserved.',
        github: '',
        linkedin: '',
        twitter: '',
        email: ''
    });

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const docRef = doc(db, 'content', 'footer');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFooterData(docSnap.data());
                }
            } catch (error) {
                console.error("Error fetching footer data", error);
            }
        };
        fetchFooter();
    }, []);

    return (
        <footer className="footer-module">
            <div className="footer-content">
                <div className="footer-socials">
                    {footerData.github && <a href={footerData.github} target="_blank" rel="noreferrer">GitHub</a>}
                    {footerData.linkedin && <a href={footerData.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                    {footerData.twitter && <a href={footerData.twitter} target="_blank" rel="noreferrer">Twitter</a>}
                    {footerData.email && <a href={`mailto:${footerData.email}`}>Email</a>}
                </div>
                <p>{footerData.copyright}</p>
            </div>
        </footer>
    );
};

export default Footer;
