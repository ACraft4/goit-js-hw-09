const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let colorTimeId = null; 

startBtn.addEventListener('click', colorSwitcher);
stopBtn.addEventListener('click', colorSwitchStopper)


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function colorSwitcher() {
  colorTimeId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor()
  }, 1000);
  if (colorTimeId) {
    startBtn.disabled = true; 
  }
}

function colorSwitchStopper() {
  clearInterval(colorTimeId);
  startBtn.disabled = false; 
}



