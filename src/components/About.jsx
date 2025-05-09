import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-section">
      <h2>About Flixster</h2>
      <p>
        A movie discovery app powered by TMDB. Browse current releases, search for films, 
        and explore detailed movie information.
      </p>
      <div className="attribution">
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          Powered by TMDB
        </a>
      </div>
    </div>
  );
};

export default About; 