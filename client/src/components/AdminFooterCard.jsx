import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminFooterCard = () => {
  const [footerData, setFooterData] = useState({
    copyright: '© 2024 Portfolio. All rights reserved.',
    github: '',
    linkedin: '',
    twitter: '',
    email: ''
  });
  const [status, setStatus] = useState('');

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

  const handleChange = (e) => {
    setFooterData({ ...footerData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setStatus('Saving...');
    try {
      await setDoc(doc(db, 'content', 'footer'), footerData);
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
        <h2>Footer & Socials</h2>
      </div>
      <div className="card-body">
        <div className="form-grid">
          <div className="input-group full-width">
            <label>Copyright Text</label>
            <input type="text" name="copyright" value={footerData.copyright || ''} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>GitHub URL</label>
            <input type="text" name="github" value={footerData.github || ''} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>LinkedIn URL</label>
            <input type="text" name="linkedin" value={footerData.linkedin || ''} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Twitter/X URL</label>
            <input type="text" name="twitter" value={footerData.twitter || ''} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Contact Email</label>
            <input type="email" name="email" value={footerData.email || ''} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="card-footer">
         <button className="btn-primary" onClick={handleSave}>
            Save Footer
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

export default AdminFooterCard;
