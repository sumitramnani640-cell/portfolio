import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [contactData, setContactData] = useState({
    heading: "Let's build something amazing together.",
    subtext: "Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!",
    email: "hello@portfolio.dev",
    location: "San Francisco, CA"
  });

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      await addDoc(collection(db, 'messages'), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container glass-panel">
        <div className="contact-info">
          <h2 className="gradient-text">{contactData.heading}</h2>
          <p>
            {contactData.subtext}
          </p>
          <div className="contact-details">
            <p><strong>Email:</strong> {contactData.email}</p>
            <p><strong>Location:</strong> {contactData.location}</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="form-input"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary form-submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
          
          {status === 'success' && <p className="status-message success">Message sent successfully!</p>}
          {status === 'error' && <p className="status-message error">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
