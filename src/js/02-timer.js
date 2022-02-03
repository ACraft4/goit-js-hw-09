import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from "notiflix";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    startBtn: document.querySelector('[data-start]'),
    timerInput: document.querySelector('#datetime-picker'),
    tDay: document.querySelector('[data-days]'),
    tHours: document.querySelector('[data-hours]'),
    tMinutes: document.querySelector('[data-minutes]'),
    tSeconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.disabled = true; 


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
        if (selectedDates[0] < new Date()) {
            refs.timerInput.style.borderColor = 'red';
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            Notiflix.Notify.success('Please push the "Start" button')
            refs.startBtn.disabled = false; 
            refs.timerInput.style.borderColor = 'green';

            refs.startBtn.addEventListener('click', () => {
                let timeId = setInterval(() => {
                    const saveDate = convertMs(selectedDates[0] - new Date());
                    refs.tDay.textContent = saveDate.days;
                    refs.tHours.textContent = saveDate.hours;
                    refs.tMinutes.textContent = saveDate.minutes;
                    refs.tSeconds.textContent = saveDate.seconds;
                    if ((selectedDates[0] - new Date()) < 1000) {
                        clearInterval(timeId);
                    }
                }, 1000);
            })
        }
    },
};


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
flatpickr(refs.timerInput, options);

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}






