let startTime;
let elapsedTime = 0;
let intervalId;

// const elapsedTimeElement = document.getElementById("elapsedTime");
// const startButton = document.getElementById("startButton");
// const stopButton = document.getElementById("stopButton");

// startButton.addEventListener("click", startTracking);
// stopButton.addEventListener("click", stopTracking);

function startTracking() {
  startTime = Date.now();
  intervalId = setInterval(updateElapsedTime, 1000); // Update every second
  // startButton.disabled = true;
  // stopButton.disabled = false;
}

function stopTracking() {
  clearInterval(intervalId);
  elapsedTime = 0;
  updateElapsedTime();
  //startButton.disabled = false;
  //stopButton.disabled = true;
}

function updateElapsedTime() {
  elapsedTime = Date.now() - startTime;

  // elapsedTime = Math.floor((currentTime - startTime) / 1000); // Convert to seconds
  // elapsedTimeElement.textContent = `${elapsedTime} seconds`;
}
