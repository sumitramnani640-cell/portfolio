import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminNavbarCard = () => {
  const [navbarData, setNavbarData] = useState({
    logo: 'Portfolio',
    links: [
        { label: 'Meet Me', href: '#meet' },
        { label: 'Work', href: '#work' },
        { label: 'Contact', href: '#contact' }
    ]
  });
  const [status, setStatus] = useState('');

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

  const handleChange = (e) => {
    setNavbarData({ ...navbarData, [e.target.name]: e.target.value });
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...navbarData.links];
    newLinks[index][field] = value;
    setNavbarData({ ...navbarData, links: newLinks });
  };

  const addLink = () => {
    setNavbarData({ ...navbarData, links: [...navbarData.links, { label: '', href: '' }] });
  };

  const removeLink = (index) => {
    setNavbarData({ ...navbarData, links: navbarData.links.filter((_, i) => i !== index) });
  };

  const handleSave = async () => {
    setStatus('Saving...');
    try {
      await setDoc(doc(db, 'content', 'navbar'), navbarData);
      setStatus('Saved successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (e) {
      console.error(e);
      setStatus('Error saving data!');
    }
  };

  return (
    <div className="admin-card">
      <div className="card-header">
        <h2>Navbar Configuration</h2>
        <button className="badge badge-purple" onClick={addLink} style={{ border: 'none', cursor: 'pointer' }}>+ Add Link</button>
      </div>
      <div className="card-body">
        <div className="form-grid">
          <div className="input-group full-width">
            <label>Logo Text</label>
            <input type="text" name="logo" value={navbarData.logo || ''} onChange={handleChange} />
          </div>
          
          <div className="full-width">
            <label>Navigation Links</label>
            {navbarData.links.map((link, index) => (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 40px', gap: '10px', marginTop: '10px' }}>
                    <input type="text" placeholder="Label" value={link.label} onChange={(e) => handleLinkChange(index, 'label', e.target.value)} />
                    <input type="text" placeholder="Href" value={link.href} onChange={(e) => handleLinkChange(index, 'href', e.target.value)} />
                    <button onClick={() => removeLink(index)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>×</button>
                </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card-footer">
         <button className="btn-primary" onClick={handleSave}>
            Save Navbar
         </button>
         {status && (
            <span className={`status-msg ${status.includes('Error') ? 'error' : 'success'}`}>
              {status}
            </span>
         )}
      </div>
    </div>
  );
};

export default AdminNavbarCard;
