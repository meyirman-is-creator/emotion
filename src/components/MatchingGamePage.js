// src/components/MatchingGamePage.js
import React, { useState } from 'react';
import './MatchingGamePage.css';

// Импортируем изображения
import radostImage from '../images/радость.jpg';
import pechalImage from '../images/печаль.jpg';
import gnevImage from '../images/гнев.jpg';
import strahImage from '../images/страх.jpg';
import brezglivostImage from '../images/брезгливость.jpg';

const emotions = [
  { id: '1', name: 'Радость', image: radostImage },
  { id: '2', name: 'Печаль', image: pechalImage },
  { id: '3', name: 'Гнев', image: gnevImage },
  { id: '4', name: 'Страх', image: strahImage },
  { id: '5', name: 'Брезгливость', image: brezglivostImage },
];

function MatchingGamePage() {
  const [leftItems, setLeftItems] = useState(emotions);
  const [rightItems, setRightItems] = useState(
    emotions
      .map((e) => ({ id: e.id, name: e.name }))
      .sort(() => Math.random() - 0.5)
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [showMismatchAnimation, setShowMismatchAnimation] = useState(false);

  const handleImageClick = (item) => {
    setSelectedImage(item);
    if (selectedName) {
      checkMatch(item, selectedName);
    }
  };

  const handleNameClick = (item) => {
    setSelectedName(item);
    if (selectedImage) {
      checkMatch(selectedImage, item);
    }
  };

  const checkMatch = (imageItem, nameItem) => {
    if (imageItem.id === nameItem.id) {
      // Правильный матч
      setMatchedPairs([...matchedPairs, { image: imageItem, name: nameItem }]);
      setLeftItems(leftItems.filter((item) => item.id !== imageItem.id));
      setRightItems(rightItems.filter((item) => item.id !== nameItem.id));
      setSelectedImage(null);
      setSelectedName(null);
      if (matchedPairs.length + 1 === emotions.length) {
        setIsGameFinished(true);
      }
    } else {
      // Неправильный матч с анимацией
      setShowMismatchAnimation(true);
      setTimeout(() => {
        setShowMismatchAnimation(false);
      }, 500);
      setSelectedImage(null);
      setSelectedName(null);
    }
  };

  const resetGame = () => {
    setLeftItems(emotions);
    setRightItems(
      emotions
        .map((e) => ({ id: e.id, name: e.name }))
        .sort(() => Math.random() - 0.5)
    );
    setMatchedPairs([]);
    setSelectedImage(null);
    setSelectedName(null);
    setIsGameFinished(false);
  };

  return (
    <div className="matching-game-page">
      <h1>Соедините эмоции с названиями</h1>
      {isGameFinished && (
        <div className="game-finished">
          <h2>🎉 Поздравляем! Вы сопоставили все эмоции! 🎉</h2>
          <button onClick={resetGame}>🔄 Начать заново</button>
        </div>
      )}
      <div className="matched-pairs">
        {matchedPairs.map((pair) => (
          <div key={pair.image.id} className="matched-pair">
            <img src={pair.image.image} alt={pair.image.name} />
            <p>{pair.name.name}</p>
          </div>
        ))}
      </div>
      {!isGameFinished && (
        <div
          className={`matching-container ${
            showMismatchAnimation ? 'shake' : ''
          }`}
        >
          <div className="left-column">
            {leftItems.map((item) => (
              <div
                key={item.id}
                className={`left-item ${
                  selectedImage && selectedImage.id === item.id ? 'selected' : ''
                }`}
                onClick={() => handleImageClick(item)}
              >
                <img src={item.image} alt={item.name} />
              </div>
            ))}
          </div>
          <div className="right-column">
            {rightItems.map((item) => (
              <div
                key={item.id}
                className={`right-item ${
                  selectedName && selectedName.id === item.id ? 'selected' : ''
                }`}
                onClick={() => handleNameClick(item)}
              >
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchingGamePage;
