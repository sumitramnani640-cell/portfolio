import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminHeroCard = () => {
  const [heroData, setHeroData] = useState({
    username: '',
    name: '',
    bio: '',
    miniCard: '',
    heroLine1: '',
    heroLine2: '',
    stat1: '',
    stat2: '',
    stat3: '',
    stat4: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const docRef = doc(db, 'content', 'hero');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHeroData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data", error);
      }
    };
    fetchHero();
  }, []);

  const handleChange = (e) => {
    setHeroData({ ...heroData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setStatus('Saving...');
    try {
      await setDoc(doc(db, 'content', 'hero'), heroData);
      setStatus('Saved successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (e) {
      console.error(e);
      setStatus('Error saving data!');
    }
  };

  return (
    <div className="admin-card col-span-2">
      <div className="card-header">
        <h2>Hero & Stats Section</h2>
        <div className="card-actions">
          <span className="badge badge-purple">Landing Page</span>
        </div>
      </div>
      <div className="card-body">
        <div className="form-grid">
          <div className="input-group">
            <label>Social Handle</label>
            <input type="text" name="username" value={heroData.username || ''} onChange={handleChange} placeholder="@username" />
          </div>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="name" value={heroData.name || ''} onChange={handleChange} placeholder="Your Name" />
          </div>
          <div className="input-group full-width">
            <label>Biography</label>
            <textarea name="bio" rows="4" value={heroData.bio || ''} onChange={handleChange} placeholder="Write a short bio..."></textarea>
          </div>
          <div className="input-group full-width">
            <label>Mini Card Text</label>
            <input type="text" name="miniCard" value={heroData.miniCard || ''} onChange={handleChange} placeholder="e.g. Backend Developer With..." />
          </div>
          <div className="input-group">
            <label>Hero Title Line 1</label>
            <input type="text" name="heroLine1" value={heroData.heroLine1 || ''} onChange={handleChange} placeholder="lets think" />
          </div>
          <div className="input-group">
            <label>Hero Title Line 2</label>
            <input type="text" name="heroLine2" value={heroData.heroLine2 || ''} onChange={handleChange} placeholder="creative" />
          </div>
          
          <div className="input-group">
            <label>Stat 1</label>
            <input type="text" name="stat1" value={heroData.stat1 || ''} onChange={handleChange} placeholder="1434 DESIGNED COMPLETED" />
          </div>
          <div className="input-group">
            <label>Stat 2</label>
            <input type="text" name="stat2" value={heroData.stat2 || ''} onChange={handleChange} placeholder="17 CLIENTS" />
          </div>
          <div className="input-group">
            <label>Stat 3</label>
            <input type="text" name="stat3" value={heroData.stat3 || ''} onChange={handleChange} placeholder="2 BILLION LINES" />
          </div>
          <div className="input-group">
            <label>Stat 4</label>
            <input type="text" name="stat4" value={heroData.stat4 || ''} onChange={handleChange} placeholder="1200+ CLIENTS" />
          </div>

        </div>
      </div>
      <div className="card-footer">
         <button className="btn-primary" onClick={handleSave}>
            Save Changes
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

export default AdminHeroCard;
