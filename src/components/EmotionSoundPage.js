// src/components/EmotionSoundPage.js
import React, { useState } from 'react';
import './EmotionSoundPage.css';

// Импортируем изображения
import radostImage from '../images/радость.jpg';
import pechalImage from '../images/печаль.jpg';
import gnevImage from '../images/гнев.jpg';
import strahImage from '../images/страх.jpg';
import brezglivostImage from '../images/брезгливость.jpg';

const emotions = [
  { name: 'Радость', image: radostImage, sound: '/sounds/радость.ogg' },
  { name: 'Печаль', image: pechalImage, sound: '/sounds/печаль.ogg' },
  { name: 'Гнев', image: gnevImage, sound: '/sounds/гнев.ogg' },
  { name: 'Страх', image: strahImage, sound: '/sounds/страх.ogg' },
  { name: 'Брезгливость', image: brezglivostImage, sound: '/sounds/брезгливость.ogg' },
];

function EmotionSoundPage() {
  const [playingSound, setPlayingSound] = useState(null);

  const playSound = (emotion) => {
    setPlayingSound(emotion.name);
    const audio = new Audio(emotion.sound);
    audio.play();
    audio.onended = () => {
      setPlayingSound(null);
    };
    audio.onerror = () => {
      console.error('Ошибка воспроизведения звука:', emotion.sound);
      setPlayingSound(null);
    };
  };

  return (
    <div className="emotion-sound-page">
      <h1>Эмоции со звуками</h1>
      <div className="emotions-container">
        {emotions.map((emotion) => (
          <div
            key={emotion.name}
            className={`emotion-item ${
              playingSound === emotion.name ? 'playing' : ''
            }`}
            onClick={() => playSound(emotion)}
          >
            <img src={emotion.image} alt={emotion.name} />
            <p>{emotion.name}</p>
            {playingSound === emotion.name && (
              <div className="playing-indicator">
                <span role="img" aria-label="Playing">
                  🔊
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmotionSoundPage;
