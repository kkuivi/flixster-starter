import React from 'react';
import PropTypes from 'prop-types';
import './MovieCard.css';

const MovieCard = ({ title, poster, vote_average }) => {

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={`${title} poster`}
        />
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{title}</h2>
        <div className="rating">⭐ {vote_average.toFixed(1)}</div>
      </div>
    </div>
  );
};

export default MovieCard; 