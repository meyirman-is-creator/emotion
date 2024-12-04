// src/components/EmotionSoundPage.js
import React, { useState } from 'react';
import { Howl } from 'howler';
import './EmotionSoundPage.css';

// Импортируем изображения
import radostImage from '../images/радость.jpg';
import pechalImage from '../images/печаль.jpg';
import gnevImage from '../images/гнев.jpg';
import strahImage from '../images/страх.jpg';
import brezglivostImage from '../images/брезгливость.jpg';

// Импортируем звуки
import radostSound from '../sounds/радость.ogg';
import pechalSound from '../sounds/печаль.ogg';
import gnevSound from '../sounds/гнев.ogg';
import strahSound from '../sounds/страх.ogg';
import brezglivostSound from '../sounds/брезгливость.ogg';

const emotions = [
  { name: 'Радость', image: radostImage, sound: radostSound },
  { name: 'Печаль', image: pechalImage, sound: pechalSound },
  { name: 'Гнев', image: gnevImage, sound: gnevSound },
  { name: 'Страх', image: strahImage, sound: strahSound },
  { name: 'Брезгливость', image: brezglivostImage, sound: brezglivostSound },
];

function EmotionSoundPage() {
  const [playingSound, setPlayingSound] = useState(null);

  const playSound = (emotion) => {
    setPlayingSound(emotion.name);
    const sound = new Howl({
      src: [emotion.sound],
      onend: () => {
        setPlayingSound(null);
      },
    });
    sound.play();
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
                <span>🔊</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmotionSoundPage;
