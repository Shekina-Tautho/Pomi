const { ipcRenderer, BrowserWindow } = require('electron');

document.getElementById("close").addEventListener("click", () => {
  ipcRenderer.send("close-app");
});


//start-stop timer
let currentMode = "focus"; // Can be "focus", "break", or "longBreak"
const categoryText = document.getElementById("category");
const startWrapper = document.getElementById("start-wrapper");
const startText = document.getElementById("start-text");
let isTimerRunning = false;
let countdownInterval;
let startingMinutes = 25;
let time = startingMinutes * 60;
let durations = {
  focus: 25,
  break: 5,
  longBreak: 15
};

let currentRound = 0; // for tracking long breaks
let isAlarmEnabled = false;
const alarmSound = new Audio("C:\Users\USER\Desktop\Pomi\Assets\Sounds\beep-6-96243.mp3"); // Use correct path to your audio file



function updateCountdown() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  document.getElementById("text").innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  if (time > 0) {
    time--;
  } else {
    clearInterval(countdownInterval);
    isTimerRunning = false;

    // Switch modes
    if (currentMode === "focus") {
      currentRound++;
      currentMode = (currentRound % 4 === 0) ? "longBreak" : "break";
    } else {
      currentMode = "focus";
    }

    // Update time & display
    startingMinutes = durations[currentMode];
    time = startingMinutes * 60;
    updateCategoryText();
    timerDisplay.innerText = `${startingMinutes}:00`;

    // Auto-restart timer
    countdownInterval = setInterval(updateCountdown, 1000);
    isTimerRunning = true;
    startText.innerText = "STOP";
  }
}


function updateCategoryText() {
  if (currentMode === "focus") {
    categoryText.innerText = "focus...";
  } else if (currentMode === "break") {
    categoryText.innerText = "break...";
  } else if (currentMode === "longBreak") {
    categoryText.innerText = "long break...";
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

  currentMode = "focus";
  currentRound = 0;
  startingMinutes = durations.focus;
  time = startingMinutes * 60;
  timerDisplay.innerText = `${startingMinutes}:00`;
  startText.innerText = "START";
  updateCategoryText();
});




//Open timer settings window

ipcRenderer.on("apply-settings", (event, settings) => {
  durations.focus = settings.focus;
  durations.break = settings.break;
  durations.longBreak = settings.long;
  isAlarmEnabled = settings.alarm;

  currentMode = "focus";
  currentRound = 0;
  startingMinutes = durations.focus;
  time = startingMinutes * 60;
  timerDisplay.innerText = `${startingMinutes}:00`;
  updateCategoryText();
});


