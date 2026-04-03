import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminAboutCard = () => {
  const [aboutData, setAboutData] = useState({
    bio: '',
    skills: '',
    resumeLink: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const docRef = doc(db, 'content', 'about');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching about data", error);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    setAboutData({ ...aboutData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setStatus('Saving...');
    try {
      await setDoc(doc(db, 'content', 'about'), aboutData);
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
        <h2>About Section</h2>
      </div>
      <div className="card-body">
        <div className="form-grid">
          <div className="input-group full-width">
            <label>Detailed Bio</label>
            <textarea name="bio" rows="6" value={aboutData.bio || ''} onChange={handleChange} placeholder="Share your story..."></textarea>
          </div>
          <div className="input-group full-width">
            <label>Skills (comma separated)</label>
            <input type="text" name="skills" value={aboutData.skills || ''} onChange={handleChange} placeholder="React, Node.js, Firebase..." />
          </div>
          <div className="input-group full-width">
            <label>Resume Link</label>
            <input type="text" name="resumeLink" value={aboutData.resumeLink || ''} onChange={handleChange} placeholder="URL to your resume" />
          </div>
        </div>
      </div>
      <div className="card-footer">
         <button className="btn-primary" onClick={handleSave}>
            Save About
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

export default AdminAboutCard;
