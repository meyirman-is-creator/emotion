// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmotionSoundPage from './components/EmotionSoundPage';
import MatchingGamePage from './components/MatchingGamePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/">Эмоции со звуками</Link>
            </li>
            <li>
              <Link to="/matching">Соединение эмоций</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<EmotionSoundPage />} />
          <Route path="/matching" element={<MatchingGamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
