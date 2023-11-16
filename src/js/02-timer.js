import Notiflix from "notiflix";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
input: document.querySelector("#datetime-picker"),
btn: document.querySelector("[data-start]"),
daysEl: document.querySelector("[data-days]"),
hoursEl: document.querySelector("[data-hours]"),
minEl: document.querySelector("[data-minutes]"),
secEl: document.querySelector("[data-seconds]"),
body: document.querySelector("body"),
};

refs.btn.addEventListener('click', onClick);
let currentDay = null;
let futureDay = null;
let id = null;
let time = 0;
refs.btn.setAttribute('disabled', 'true');


flatpickr(refs.input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      futureDay = selectedDates[0].getTime();
      currentDay = new Date();
      if (futureDay - currentDay < 1000) {
        Notiflix.Notify.info('Please choose a date in the future');
      } else {
        refs.btn.removeAttribute('disabled');
        Notiflix.Notify.info('You choose a date');
      }
    },
  });

  function onClick() {
    id = setInterval(() => {
      currentDay = new Date().getTime();
      if (futureDay - currentDay < 1000) {
        Notiflix.Notify.info('The time is up!');
        clearInterval(id);
      } else {
        currentDay += 1000;
        time = futureDay - currentDay;
  
        convertMs(time);
        //   console.log('continue');
      }
    }, 1000);
  };



function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  newValue({ days, hours, minutes, seconds });
    return { days, hours, minutes, seconds };
  }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function newValue({ days, hours, minutes, seconds }) {
    refs.daysEl.textContent = days;
    refs.hoursEl.textContent = hours;
    refs.minEl.textContent = minutes;
    refs.secEl.textContent = seconds;
  }
  
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }