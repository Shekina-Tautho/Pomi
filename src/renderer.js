const { ipcRenderer, BrowserWindow } = require('electron');

document.getElementById("close").addEventListener("click", () => {
  ipcRenderer.send("close-app");
});



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
  event.preventDefault(); // ✅ This stops any default behavior

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
