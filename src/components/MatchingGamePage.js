// src/components/MatchingGamePage.js
import React, { useState } from 'react';
import './MatchingGamePage.css';

// Импортируем изображения для левого столбца из src/images
import radostImage from '../images/радость.jpg';
import pechalImage from '../images/печаль.jpg';
import gnevImage from '../images/гнев.jpg';
import brezglivostImage from '../images/брезгливость.jpg';

// Удалите импорт изображения "Страх".
// import strahImage from '../images/страх.jpg'; // Удалено

// Определяем эмоции с изображениями для обоих столбцов без "Страха"
const emotions = [
  { id: '1', name: 'Радость', leftImage: radostImage, rightImage: '/images/радость.png' },
  { id: '2', name: 'Печаль', leftImage: pechalImage, rightImage: '/images/печаль.png' },
  { id: '3', name: 'Гнев', leftImage: gnevImage, rightImage: '/images/гнев.png' },
  { id: '4', name: 'Брезгливость', leftImage: brezglivostImage, rightImage: '/images/брезгливость.png' },
];

function MatchingGamePage() {
  const [leftItems, setLeftItems] = useState(emotions);
  const [rightItems, setRightItems] = useState(
    emotions
      .map((e) => ({ id: e.id, rightImage: e.rightImage }))
      .sort(() => Math.random() - 0.5)
  );
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [showMismatchAnimation, setShowMismatchAnimation] = useState(false);

  const handleLeftClick = (item) => {
    setSelectedLeft(item);
    if (selectedRight) {
      checkMatch(item, selectedRight);
    }
  };

  const handleRightClick = (item) => {
    setSelectedRight(item);
    if (selectedLeft) {
      checkMatch(selectedLeft, item);
    }
  };

  const checkMatch = (leftItem, rightItem) => {
    if (leftItem.id === rightItem.id) {
      // Правильный матч
      const matchedPair = emotions.find((e) => e.id === leftItem.id);
      setMatchedPairs([...matchedPairs, matchedPair]);
      setLeftItems(leftItems.filter((item) => item.id !== leftItem.id));
      setRightItems(rightItems.filter((item) => item.id !== rightItem.id));
      setSelectedLeft(null);
      setSelectedRight(null);
      if (matchedPairs.length + 1 === emotions.length) {
        setIsGameFinished(true);
      }
    } else {
      // Неправильный матч с анимацией
      setShowMismatchAnimation(true);
      setTimeout(() => {
        setShowMismatchAnimation(false);
      }, 500);
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  const resetGame = () => {
    setLeftItems(emotions);
    setRightItems(
      emotions
        .map((e) => ({ id: e.id, rightImage: e.rightImage }))
        .sort(() => Math.random() - 0.5)
    );
    setMatchedPairs([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setIsGameFinished(false);
  };

  return (
    <div className="matching-game-page">
      <h1>Соедините эмоции с изображениями</h1>
      {isGameFinished && (
        <div className="game-finished">
          <h2>🎉 Поздравляем! Вы сопоставили все эмоции! 🎉</h2>
          <button onClick={resetGame}>🔄 Начать заново</button>
        </div>
      )}
      <div className="matched-pairs">
        {matchedPairs.map((pair) => (
          <div key={pair.id} className="matched-pair">
            <img src={pair.leftImage} alt={pair.name} className="matched-left-image" />
            <img src={pair.rightImage} alt={pair.name} className="matched-right-image" />
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
                  selectedLeft && selectedLeft.id === item.id ? 'selected' : ''
                }`}
                onClick={() => handleLeftClick(item)}
              >
                <img src={item.leftImage} alt={item.name} />
              </div>
            ))}
          </div>
          <div className="right-column">
            {rightItems.map((item) => (
              <div
                key={item.id}
                className={`right-item ${
                  selectedRight && selectedRight.id === item.id ? 'selected' : ''
                }`}
                onClick={() => handleRightClick(item)}
              >
                <img src={item.rightImage} alt={`Изображение для ${item.id}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchingGamePage;
