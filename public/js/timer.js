let countdown;
let targetDate;

function startCountdown() {
    // Set the target date to 10 minutes from now
    targetDate = new Date();
    targetDate.setSeconds(targetDate.getSeconds() + 5);

    // Update the countdown every second
    countdown = setInterval(updateCountdown, 1000);

    // Update the countdown immediately to avoid a delay on start
    updateCountdown();
}

function updateCountdown() {
    const currentDate = new Date();
    const difference = targetDate - currentDate;

    if (difference <= 0) {
        // If the countdown is over, stop the interval
        clearInterval(countdown);
        document.getElementById('countdown').innerHTML = "0";
    } else {
        // Calculate hours, minutes, and seconds
        const seconds = Math.floor((difference % 60000) / 1000);

        // Display the countdown
        document.getElementById('countdown').innerHTML = seconds;
    }
}