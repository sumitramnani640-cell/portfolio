import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Admin = () => {
  const [heroData, setHeroData] = useState({
    username: '@sumitramnani',
    name: 'Sumit Ramnani',
    bio: 'A Backend Developer who excels in architecting scalable and robust server-side applications. I possess a strong engineering sensibility, focusing on database performance, API optimization, and secure infrastructure.',
    miniCard: 'Backend Developer With A Passion For Scalable Architecture'
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
    <div style={{ padding: '4rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-family)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Portfolio Admin Dashboard</h1>
      <p style={{ marginBottom: '2rem' }}>Manage your Hero text dynamically mapped from Firebase Firestore.</p>
      
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginBottom: '1rem' }}>Edit Hero Section</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Social Handle</label>
            <input type="text" name="username" value={heroData.username} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Full Name</label>
            <input type="text" name="name" value={heroData.name} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Biography</label>
            <textarea rows="4" name="bio" value={heroData.bio} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontFamily: 'var(--font-family)' }}></textarea>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Mini Card Text</label>
            <input type="text" name="miniCard" value={heroData.miniCard} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd' }} />
          </div>
          
          <button onClick={handleSave} style={{ marginTop: '1rem', padding: '1rem', background: 'var(--text-teal)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Save Hero Changes
          </button>
          {status && <p style={{ fontWeight: 'bold', color: status.includes('Error') ? 'red' : 'green', marginTop: '1rem' }}>{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default Admin;
