const { ipcRenderer, BrowserWindow } = require('electron');

document.getElementById("close").addEventListener("click", () => {
  ipcRenderer.send("close-app");
});


//start-stop timer
let currentMode = "focus"; 
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

let currentRound = 0; 
let isAlarmEnabled = false;
const alarmSound = new Audio("C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Sounds\\beep-6-96243.mp3"); 



function updateCountdown() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  document.getElementById("text").innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  if (time > 0) {
    time--;
  } else {
    clearInterval(countdownInterval);
    isTimerRunning = false;


    if (isAlarmEnabled && alarmSound) {
      alarmSound.play().catch((e) => {
        console.warn("Alarm playback failed:", e);
      });
    }

  
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


document.getElementById("timer-settings").addEventListener("click", () => {
  ipcRenderer.send("open-timer-settings");
});


//THEMES
const themes = [
  {
    name: "lightGreen",
    mainBg: "#D1F5CF",
    mainOutline: "#74CD71",
    bodyBg: "#E3F4F8",
    bodyOutline: "#74CD71",
    textColor: "#2D3A4A",
    assets: {
      close: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Green\\Exit Button.png",
      timerContainer: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Green\\Timer Container.png",
      start: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Green\\Start Container.png",
      reset: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Green\\Reset Container.png",
      timerSettings: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Green\\Timer Settings Logo.png",
      themeSettings: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Green\\Theme Settings Logo.png",
    }
  },
  {
    name: "darkGreen",
    mainBg: "#4F6E6A",
    mainOutline: "#74CD71",
    bodyBg: "#2C3A47",
    bodyOutline: "#74CD71",
    textColor: "#F1F1F1",
    assets: {
      close: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Green\\Exit Button.png",
      timerContainer: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Dark\\Green\\Timer Container.png",
      start: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Dark\\Green\\Start Container.png",
      reset: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Dark\\Green\\Reset Container.png",
      timerSettings: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Green\\Timer Settings Logo.png",
      themeSettings: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Green\\Theme Settings Logo.png",
    }
  },
  {
    name: "lightPurple",
    mainBg: "#E7CAFE",
    mainOutline: "#9A65A6",
    bodyBg: "#FFF9EF",
    bodyOutline: "#9A65A6",
    textColor: "#6C4A71",
    assets: {
      close: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Purple\\Close-button.png",
      timerContainer: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Purple\\Timer-Container.png",
      start: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Purple\\Start-button.png",
      reset: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Purple\\Reset-button.png",
      timerSettings: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Purple\\Timer-Settings Logo.png",
      themeSettings: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Purple\\Theme-settings logo.png",
    }
  },
  {
    name: "darkPurple",
    mainBg: "#6D5A7A",
    mainOutline: "#9A65A6",
    bodyBg: "#4B3B4F",
    bodyOutline: "#9A65A6",
    textColor: "#FDF7FA",
    assets: {
      close: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Purple\\Close-button.png",
      timerContainer: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Dark\\Purple\\Timer Container.png",
      start: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Dark\\Purple\\Start Container.png",
      reset: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Dark\\Purple\\Reset Container.png",
      timerSettings: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Purple\\Timer-Settings Logo.png",
      themeSettings: "C:\\Users\\USER\\Desktop\\Pomi\\Assets\\Light\\Purple\\Theme-settings logo.png",
    }
  }
];

let currentThemeIndex = parseInt(localStorage.getItem("theme-index")) || 0;

function applyTheme(theme) {
  const mainContainer = document.getElementById("main-container");
  const body = document.getElementById("body");

  mainContainer.style.backgroundColor = theme.mainBg;
  mainContainer.style.outline = `3px solid ${theme.mainOutline}`;

  body.style.backgroundColor = theme.bodyBg;
  body.style.outline = `3px solid ${theme.bodyOutline}`;

  document.getElementById("app-name").style.color = theme.textColor;
  document.getElementById("category").style.color = theme.textColor;
  document.getElementById("text").style.color = theme.textColor;
  document.getElementById("start-text").style.color = theme.textColor;
  document.getElementById("reset-text").style.color = theme.textColor;

  document.getElementById("close").src = theme.assets.close;
  document.getElementById("img-timerContainer").src = theme.assets.timerContainer;
  document.getElementById("start-button").src = theme.assets.start;
  document.getElementById("reset-button").src = theme.assets.reset;
  document.getElementById("timer-settings").src = theme.assets.timerSettings;
  document.getElementById("theme-settings").src = theme.assets.themeSettings;
}

document.getElementById("theme-settings").addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  localStorage.setItem("theme-index", currentThemeIndex);
  applyTheme(themes[currentThemeIndex]);
});

// Apply on load
applyTheme(themes[currentThemeIndex]);

