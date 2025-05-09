import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-section">
      <h2>Contact</h2>
      <div className="contact-content">
        <p>Have questions or feedback? Reach out to us!</p>
        <div className="contact-info">
          <a href="mailto:contact@flixster.com" className="contact-link">
            contact@flixster.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact; 