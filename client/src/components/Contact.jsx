import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Trying to hit the local Node.js Express server running on port 3000
      const res = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container glass-panel">
        <div className="contact-info">
          <h2 className="gradient-text">Let's build something amazing together.</h2>
          <p>
            Whether you have a question, a project idea, or just want to say hi,
            I'll try my best to get back to you!
          </p>
          <div className="contact-details">
            <p><strong>Email:</strong> hello@portfolio.dev</p>
            <p><strong>Location:</strong> San Francisco, CA</p>
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
