const { ipcRenderer, BrowserWindow } = require('electron');

document.getElementById("close").addEventListener("click", () => {
  ipcRenderer.send("close-app");
});


/*
//TIMER FUNCTIONALITY
let startingMinutes = 25;
let time = startingMinutes * 60;
const timerElement = document.getElementById("text");
let timerRunning = false;
let startBtnClicked = false;
let startButton = document.getElementById("start");
let countdownInterval;

startButton.addEventListener('click', () => {
    timerFlow();
})



function timerFlow() {
    if (startBtnClicked) {
        startTimer();
    }
}

function startTimer() {
    timerRunning = true;
    clearInterval(countdownInterval);
    time = startingMinutes * 60;
    countdownInterval = setInterval(updateCountdown, 1000);
    timerFlow();
}

function updateCountdown() {
    let minutes = Math.floor(time/60);
    let seconds = time%60;

    timerElement.innerHTML= `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    if (time > 0) {
        time--
    } else if (time > 0 && timerRunning) {
        //stopTimer function
    } else {
        clearInterval(countdownInterval);
    }

}
*/

let startingMinutes = 25;
let time = startingMinutes;
const timerElement = document.getElementById("text");

function updateCountdown() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    timerElement.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    if (time > 0) {
        time--;
    } else {
        clearInterval(countdownInterval);
    }
}

const startButton = document.getElementById("start");
let countdownInterval;

startButton.addEventListener('click', () => {
    clearInterval(countdownInterval);
    time = startingMinutes * 60;
    countdownInterval = setInterval(updateCountdown, 1000);
    showNextImage();
});


//Create timer settings window


