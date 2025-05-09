import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [mode, setMode] = useState('now_playing'); // 'now_playing' or 'search'
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [sortBy, setSortBy] = useState('default');

  const fetchMovies = async (page, search = '') => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
      const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${apiKey}&page=${page}`;
      
      const response = search ? await fetch(searchUrl) : await fetch(nowPlayingUrl);
      if (!response.ok) {
          throw new Error('Failed to fetch movie data');
      }
      const data = await response.json();
      setMovies(prevMovies => page === 1 ? data.results : [...prevMovies, ...data.results]);
      setNoResults(data.results.length === 0 && search !== '');
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(nextPage, searchTerm);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchMovies(1, searchTerm);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setMovies([]);
    setCurrentPage(1);
    setSearchTerm('');
    setNoResults(false);
    fetchMovies(1, '');
  };

  const sortMovies = (moviesToSort) => {
    const sortedMovies = [...moviesToSort];
    switch (sortBy) {
      case 'title':
        return sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
      case 'release_date':
        return sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      case 'rating':
        return sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return sortedMovies;
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <div className="controls">
        <div className="mode-toggle">
          <button 
            className={mode === 'now_playing' ? 'active' : ''} 
            onClick={() => handleModeChange('now_playing')}
          >
            Now Playing
          </button>
          <button 
            className={mode === 'search' ? 'active' : ''} 
            onClick={() => handleModeChange('search')}
          >
            Search
          </button>
        </div>
        <div className="sort-container">
          <select value={sortBy} onChange={handleSortChange}>
            <option value="default">Sort by</option>
            <option value="title">A-Z</option>
            <option value="release_date">Release Date (Recent to Oldest)</option>
            <option value="rating">Rating (Highest to Lowest)</option>
          </select>
        </div>
      </div>

      {mode === 'search' && (
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
            {searchTerm && (
              <button 
                type="button" 
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                  fetchMovies(1, '');
                }}
                className="clear-button"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      )}

      {noResults ? (
        <div className="no-results">
          <p>No movies found for "{searchTerm}"</p>
          <button onClick={() => handleModeChange('now_playing')}>
            Back to Now Playing
          </button>
        </div>
      ) : (
        <>
          <div className="movie-list">
            {sortMovies(movies).map((movie) => (
              <div key={movie.id} onClick={() => setSelectedMovieId(movie.id)} style={{ cursor: 'pointer' }}>
                <MovieCard 
                  title={movie.title} 
                  poster={movie.poster_path} 
                  vote_average={movie.vote_average} 
                />
              </div>
            ))}
          </div>
          {movies.length > 0 && (
            <div className="load-more">
              <button onClick={handleLoadMore}>Load More</button>
            </div>
          )}
        </>
      )}

      {selectedMovieId && (
        <MovieModal 
          movieId={selectedMovieId} 
          onClose={() => setSelectedMovieId(null)} 
        />
      )}
    </div>
  );
};

export default MovieList; 