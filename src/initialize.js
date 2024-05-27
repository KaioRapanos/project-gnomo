import { randomSquare, countDown } from './components/Panel/Panel';
import state from './engine';
import cheetos from '../src/assets/audios/Cheetos.mp3'

export function playSound(audioName, volume = 0.2 , loop = false) {
  let audio = new Audio(`${audioName}`);
  audio.volume = volume;

  if(loop){
    audio.loop = true;
  }
  audio.play();
}

let isAudioPlaying = false;

document.addEventListener('click', function onFirstInteraction() {
  if (!isAudioPlaying) {
    playSound(cheetos, 0.2, true);
    isAudioPlaying = true;
  }
});

export function initialize() {
  state.actions.timerId = setInterval(randomSquare, state.value.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}
