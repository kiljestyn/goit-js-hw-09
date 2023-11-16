import Notiflix from "notiflix";

const form = document.querySelector('.form');
const { delay, step, amount } = form.elements;
form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
  if (shouldResolve) {
    // Fulfill
    resolve({ position, delay });
  } else {
    // Reject
    reject({ position, delay });
  }
}, delay);
  });
}

function onSubmit(evt) {
  evt.preventDefault();

  let amountValue = Number(amount.value);
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);

  for (let i = 1; i <= amountValue; i += 1) {
    let generalDelay = delayValue + stepValue * i - stepValue;


createPromise(i, generalDelay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
}