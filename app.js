const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let userAttempts = [];

app.get('/', (req, res) => {
  res.render('index');
});



app.get('/settings', (req, res) => {
  res.render('settings');
  
});



app.post('/game', (req, res) => {
  const number = req.body.number;
  const turns = req.body.turns;
  console.log('turns: ',turns)
  res.render('game', {number, turns});
});

app.post('/play', (req, res) => {
  const number = req.body.number;
  const turns = req.body.turns;
  // console.log('turns: ', turns)
  res.render('play', {turns,number});
});

app.get('/save', (req, res) => {
  res.render('save');
});

app.get('/timer', (req, res) => {
  res.render('timer');
});


app.get('/choose', (req, res) => {
  
  const prizeButton = getRandomButton();
  const userChoice = req.query.choice.toLowerCase();
  // console.log(userChoice);
  // console.log(prizeButton);
     
  let message, image;
  if (userChoice === prizeButton) {
    message = 100;
    image = '/images/prize.jpeg';
  } else {
    message = 2;
    image = '/images/no-prize.jpeg';

  }

  const attempt = { choice: userChoice, result: message };
  userAttempts.push(attempt);

  res.send({message, image});
});




app.get('/attempts', (req, res) => {
    res.json(userAttempts);
});


function getRandomButton() {
  return getRandomNumber() === 0 ? 'left' : 'right';
}

function getRandomNumber() {
  return Math.floor(Math.random() * 2);
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
