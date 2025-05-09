import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import About from './components/About'
import Contact from './components/Contact'

const App = () => {
  const [activeSection, setActiveSection] = useState('movies'); // 'movies', 'about', or 'contact'

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <MovieList />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <span className="logo-text">Flixster</span>
        </div>
        <div className="nav-buttons">
          <button 
            className={`nav-button ${activeSection === 'movies' ? 'active' : ''}`}
            onClick={() => setActiveSection('movies')}
          >
            Movies
          </button>
          <button 
            className={`nav-button ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => setActiveSection('about')}
          >
            About
          </button>
          <button 
            className={`nav-button ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveSection('contact')}
          >
            Contact
          </button>
        </div>
      </header>
      {renderContent()}
      <footer className="App-footer">
        <p>© {new Date().getFullYear()} Flixster. All rights reserved.</p>
        <p>Powered by TMDB</p>
      </footer>
    </div>
  )
}

export default App
