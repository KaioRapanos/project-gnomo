import { randomSquare, countDown } from './components/Panel/Panel';
import state from './engine';

export function playSound(audioName, volume = 0.2 , loop = false) {
  let audio = new Audio(`./src/assets/audios/${audioName}`);
  audio.volume = volume;

  if(loop){
    audio.loop = true;
  }
  audio.play();
}

let isAudioPlaying = false;

document.addEventListener('click', function onFirstInteraction() {
  if (!isAudioPlaying) {
    playSound('Cheetos.mp3', 0.2, true);
    isAudioPlaying = true; // Marca o áudio como iniciado
  }
});

export function initialize() {
  state.actions.timerId = setInterval(randomSquare, state.value.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}
