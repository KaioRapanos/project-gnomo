const state = {
    view: {
      squares: null,
      timeLeft: null,
      score: null,
    },
    value: {
      life: 3,
      wrongClicks: 0,

      gameVelocity: 1000,
      hitPosition: 0,
      
      result: 0,
      currentTime: 100000000,
    },
    actions: {
      timerId: null,
      countDownTimerId: null,
    },
  };
  
  export default state;
  