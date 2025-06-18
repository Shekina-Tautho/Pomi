const { ipcRenderer } = require('electron');


function setupVerticalButtons(containerId, valueId, min = 1, max = 60) {
  const container = document.getElementById(containerId);
  const valueDisplay = document.getElementById(valueId);

  const upBtn = container.querySelector(".up-btn");
  const downBtn = container.querySelector(".down-btn");

  if (!upBtn || !downBtn || !valueDisplay) {
    console.warn(`Missing elements in ${containerId}`);
    return;
  }

  upBtn.addEventListener("click", () => {
    let value = parseInt(valueDisplay.textContent);
    if (value < max) {
      valueDisplay.textContent = value + 1;
    }
  });

  downBtn.addEventListener("click", () => {
    let value = parseInt(valueDisplay.textContent);
    if (value > min) {
      valueDisplay.textContent = value - 1;
    }
  });
}

// Save button logic
document.getElementById("save-text").addEventListener("click", () => {
  const focus = parseInt(document.getElementById("focus-value").textContent);
  const shortBreak = parseInt(document.getElementById("break-value").textContent);
  const longBreak = parseInt(document.getElementById("longBreak-value").textContent);
  const alarmOn = document.getElementById("alarm-checkbox").checked;

  const settings = {
    focus,
    break: shortBreak,
    long: longBreak,
    alarm: alarmOn
  };

  localStorage.setItem("pomodoro-settings", JSON.stringify(settings));
  ipcRenderer.send("update-settings", settings); 
  window.close();
});


document.getElementById("close").addEventListener("click", () => {
  window.close();
});

// Load saved settings 
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("pomodoro-settings"));
  if (saved) {
    document.getElementById("focus-value").textContent = saved.focus;
    document.getElementById("break-value").textContent = saved.break;
    document.getElementById("longBreak-value").textContent = saved.long;
    document.getElementById("alarm-checkbox").checked = saved.alarm;
  }


  setupVerticalButtons("focus-container", "focus-value");
  setupVerticalButtons("break-container", "break-value");
  setupVerticalButtons("longBreak-container", "longBreak-value");
};
