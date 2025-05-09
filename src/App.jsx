import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <span className="logo-text">Flixster</span>
        </div>
      </header>
      <MovieList />
      <footer className="App-footer">
        <p>© {new Date().getFullYear()} Flixster. All rights reserved.</p>
        <p>Powered by TMDB</p>
      </footer>
    </div>
  )
}

export default App
