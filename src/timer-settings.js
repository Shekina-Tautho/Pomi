const { ipcRenderer } = require('electron');

document.getElementById("save-settings").addEventListener("click", () => {
  const focus = parseInt(document.getElementById("focus-input").value);
  const shortBreak = parseInt(document.getElementById("short-break-input").value);
  const longBreak = parseInt(document.getElementById("long-break-input").value);

  const settings = {
    focus,
    break: shortBreak,
    long: longBreak
  };

  localStorage.setItem("pomodoro-settings", JSON.stringify(settings));
  window.close();
});

document.getElementById("back").addEventListener("click", () => {
  window.close();
});
