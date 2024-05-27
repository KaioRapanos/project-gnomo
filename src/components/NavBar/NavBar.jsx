import React, { useEffect, useState } from 'react';
import state from '../../engine';
import style from './NavBar.module.css';
import { playSound } from '../../initialize';
import player from '../../assets/images/giphy2.gif'

const NavBar = () => {
  const [timeLeft, setTimeLeft] = useState(state.value.currentTime);
  const [score, setScore] = useState(state.value.result);
  const [life] = useState(state.value.life);

  useEffect(() => {
    state.view.timeLeft = {
      get: () => timeLeft,
      set: setTimeLeft,
    };
    state.view.score = {
      get: () => score,
      set: setScore,
    };
  }, [timeLeft, score, life]);

  useEffect(() => {
    lifeChecker();
  },[state.value.life]);

  function lifeChecker(){
    if(state.value.life === 0){
      alert("Suas vidas acabaram e seus pontos foram:"+ state.value.result);
      window.location.reload();
    }
  }

  return (
    <div className={style.menu}>
      <div className={style.menuTime}>
        <h2>Time Left</h2>
        <h2>{timeLeft}</h2>
      </div>
      <div className={style.menuScore}>
        <h2>Your Score</h2>
        <h2>{score}</h2>
      </div>
      <div className={style.menuLive}>
        <img src={player} alt='player' />
        <h2>x{state.value.life}</h2>
      </div>
    </div>
  );
};

export default NavBar;
