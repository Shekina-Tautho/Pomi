const { ipcRenderer, BrowserWindow } = require('electron');

document.getElementById("close").addEventListener("click", () => {
  ipcRenderer.send("close-app");
});


//start-stop timer
const startWrapper = document.getElementById("start-wrapper");
const startText = document.getElementById("start-text");
let isTimerRunning = false;
let countdownInterval;
let startingMinutes = 25;
let time = startingMinutes * 60;

function updateCountdown() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  document.getElementById("text").innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  if (time > 0) {
    time--;
  } else {
    clearInterval(countdownInterval);
    isTimerRunning = false;
    startText.innerText = "START";
  }
}

startWrapper.addEventListener("click", (event) => {
  event.preventDefault(); 

  if (!isTimerRunning) {
    countdownInterval = setInterval(updateCountdown, 1000);
    isTimerRunning = true;
    startText.innerText = "STOP";
  } else {
    clearInterval(countdownInterval);
    isTimerRunning = false;
    startText.innerText = "START";
  }
});

const resetWrapper = document.getElementById("reset-wrapper");
const timerDisplay = document.getElementById("text");

resetWrapper.addEventListener("click", (event) => {
    event.preventDefault();
    clearInterval(countdownInterval);
    isTimerRunning = false;
    time = startingMinutes * 60;
    timerDisplay.innerText = "25:00";

    startText.innerText = "START"
})

//Open timer settings window

document.getElementById("timer-settings").addEventListener("click", () => {
  ipcRenderer.send("open-timer-settings");
});


