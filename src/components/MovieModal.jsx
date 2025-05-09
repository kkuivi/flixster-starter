import React, { useState, useEffect } from 'react';
import './MovieModal.css';

const MovieModal = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) return null;

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <div className="modal-poster">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={`${movieDetails.title} poster`}
            />
          </div>
          <div className="modal-info">
            <h2>{movieDetails.title}</h2>
            <div className="modal-details">
              <p className="modal-runtime">Runtime: {formatRuntime(movieDetails.runtime)}</p>
              <p className="modal-release">Release Date: {movieDetails.release_date}</p>
              <div className="modal-genres">
                {movieDetails.genres.map(genre => (
                  <span key={genre.id} className="genre-tag">{genre.name}</span>
                ))}
              </div>
            </div>
            <div className="modal-overview">
              <h3>Overview</h3>
              <p>{movieDetails.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal; 