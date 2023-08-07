let timerInterval;
let timerDurationInSeconds = 0;

function updateTimerDisplay() {
  const displayElement = document.getElementById('timer');
  const minutes = Math.floor(timerDurationInSeconds / 60);
  const seconds = timerDurationInSeconds % 60;
  displayElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  clearInterval(timerInterval);
  timerDurationInSeconds = 0;
  updateTimerDisplay();

  timerInterval = setInterval(function () {
    timerDurationInSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerDurationInSeconds = 0;
  updateTimerDisplay();
}
