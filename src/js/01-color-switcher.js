import { getRandomHexColor } from "./random-color";
import Notiflix from "notiflix";

const refs = {
start: document.querySelector('button[data-start]'),
stop: document.querySelector('button[data-stop]'),
body: document.querySelector('body'),
};

refs.start.addEventListener('click', clickStart);
refs.stop.addEventListener('click', clickStop);
const DELAY = 1000;
let id = null;
refs.stop.setAttribute('disabled', 'true');

function clickStart() {
    refs.start.setAttribute('disabled', 'true');
    refs.stop.removeAttribute('disabled');
  
    id = setInterval(() => {
      const color = getRandomHexColor();
      refs.body.style.backgroundColor = color;
      Notiflix.Notify.success(color, {
        timeout: DELAY - 500,
      });
    }, DELAY);
  }
  
  function clickStop() {
    clearInterval(id);
    refs.stop.setAttribute('disabled', 'true');
    refs.start.removeAttribute('disabled');
    
  }
  console.log('object');