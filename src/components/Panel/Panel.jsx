import React, { useEffect, useState } from 'react';
import state from '../../engine';
import style from './Panel.module.css';
import gameOver from '../../assets/audios/gameOver.mp3'
import multiplo10 from '../../assets/audios/multiplo10.mp3'
import multiplo50 from '../../assets/audios/multiplo50.mp3'
import hit from '../../assets/audios/hit.mp3'

const Panel = () => {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const squares = document.querySelectorAll(`.${style.square}`);
    state.view.squares = squares;
    setSquares(squares);
  }, []);

  useEffect(() => {
    if (squares.length > 0) {
      state.actions.timerId = setInterval(randomSquare, state.value.gameVelocity);
      state.actions.countDownTimerId = setInterval(countDown, 1000);
      addListenerHitBox(squares);
    }

    return () => {
      clearInterval(state.actions.timerId);
      clearInterval(state.actions.countDownTimerId);
    };
  }, [squares]);

  return (
    <div className={style.panel}>
      {[...Array(3)].map((_, rowIndex) => (
        <div className={style.panelRow} key={rowIndex}>
          {[...Array(3)].map((_, colIndex) => {
            const id = rowIndex * 3 + colIndex + 1;
            return <div className={style.square} id={id} key={id}></div>;
          })}
        </div>
      ))}
    </div>
  );
};

let previousRandomNumber = -1;

function randomSquare() {
  const squares = state.view.squares;
  squares.forEach(square => {
    square.classList.remove(style.enemy);
  });

  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 9);
  } while (randomNumber === previousRandomNumber);

  let randomSquare = squares[randomNumber];
  randomSquare.classList.add(style.enemy);
  state.value.hitPosition = randomSquare.id;

  previousRandomNumber = randomNumber; 
}

function countDown() {
  state.value.currentTime--;
  state.view.timeLeft.set(state.value.currentTime);

  if (state.value.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert('Game Over! O seu resultado foi: ' + state.value.result);
    window.location.reload();
  }
}

function addListenerHitBox(squares) {
  squares.forEach(square => {
    square.addEventListener('mouseenter', () => {
      const hitPosition = state.value.hitPosition;
      if (square.id === hitPosition) {
        setTimeout(() => {
          randomSquare(true); 
        }, 150);
      }
    });

    square.addEventListener('mousedown', () => {
      if (square.id === state.value.hitPosition) {
        state.value.result++; 

        if (state.value.result % 10 === 0) {
          state.value.result += 10;
          playSound(multiplo10, 1); 
        } else if (state.value.result % 50 === 0){
          state.value.life += 3;
          state.value.currentTime += 60;
          playSound(multiplo50, 1);
        } else {
          playSound(hit);
        }

        state.view.score.set(state.value.result);
        state.value.hitPosition = null;
      } else {
        state.value.wrongClicks++;

        if(state.value.wrongClicks % 3 === 0){
          state.value.life--;
          if(state.value.life === 0){
            playSound(gameOver, 1);
          }
          state.value.wrongClicks = 0;
        }
      }
    });
  });
}

function playSound(audioName) {
  let audio = new Audio(`${audioName}`);
  audio.volume = 0.2;
  audio.play();
}

export { randomSquare, countDown };
export default Panel;
