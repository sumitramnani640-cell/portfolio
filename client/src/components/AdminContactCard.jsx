import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminContactCard = () => {
  const [contactData, setContactData] = useState({
    heading: '',
    subtext: '',
    email: '',
    location: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, 'content', 'contact');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContactData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching contact data", error);
      }
    };
    fetchContact();
  }, []);

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setStatus('Saving...');
    try {
      await setDoc(doc(db, 'content', 'contact'), contactData);
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
        <h2>Contact Details</h2>
        <div className="card-actions">
           <span className="badge badge-purple">Footer Section</span>
        </div>
      </div>
      <div className="card-body">
         <div className="form-grid">
           <div className="input-group full-width">
             <label>Heading</label>
             <input type="text" name="heading" value={contactData.heading || ''} onChange={handleChange} placeholder="Let's build something amazing together." />
           </div>
           <div className="input-group full-width">
             <label>Subtext</label>
             <textarea name="subtext" rows="3" value={contactData.subtext || ''} onChange={handleChange} placeholder="Whether you have a question..."></textarea>
           </div>
           <div className="input-group">
             <label>Email Address</label>
             <input type="text" name="email" value={contactData.email || ''} onChange={handleChange} placeholder="hello@portfolio.dev" />
           </div>
           <div className="input-group">
             <label>Location</label>
             <input type="text" name="location" value={contactData.location || ''} onChange={handleChange} placeholder="San Francisco, CA" />
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

export default AdminContactCard;
