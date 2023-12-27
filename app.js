const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'public' directory
app.use('/',express.static(path.join(__dirname, 'public')));

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('index');
});



app.get('/settings', (req, res) => {
  res.render('settings');
  
});



<<<<<<< HEAD
app.all('/game', (req, res) => {
  if (req.method === 'POST') {
    const percentage = req.body.percentage;
    const rounds1 = req.body.rounds1;
    const rounds2 = req.body.rounds2;
    const limit = req.body.limit;

    // It seems wrong to define the array of answers previously to the game. 
    // It sounds more reasonable/rational to calculate the array on every turn. 
    // As an action triggered by the user 
    res.render('game', {percentage, rounds1, rounds2, limit});
  } else {
    const percentage = req.query.percentage;
    const rounds1 = req.query.rounds1;
    const rounds2 = req.query.rounds2;
    const limit = req.query.limit; 
    res.render('game2', {percentage, rounds1, rounds2, limit});
  }

=======
app.post('/game', (req, res) => {
  const percentage = req.body.percentage;
  const rounds = req.body.rounds;
  const timeReward = req.body.timeReward
  // It seems wrong to define the array of answers previously to the game. 
  // It sounds more reasonable/rational to calculate the array on every turn. 
  // As an action triggered by the user 
  res.render('game', {percentage, rounds,timeReward});
>>>>>>> d36c8015ffb7e4f4573472cf81a02519f5d41dfc
});



app.post('/play', (req, res) => {
  const arr = req.body.arr;
  const percentage = req.body.percentage;
<<<<<<< HEAD
  const rounds1 = req.body.rounds1;
  const rounds2 = req.body.rounds2;
  const limit = req.body.limit;
  res.render('play', {arr, percentage, rounds1, rounds2, limit});
=======
  const rounds = req.body.rounds;
  const timeReward = req.body.timeReward;
  res.render('play', {arr, percentage, rounds, timeReward});
>>>>>>> d36c8015ffb7e4f4573472cf81a02519f5d41dfc
});


app.post('/play2', (req, res) => {
  const arr = req.body.arr;
  const percentage = req.body.percentage;
  const rounds1 = req.body.rounds1;
  const rounds2 = req.body.rounds2;
  const limit = req.body.limit;
  res.render('play2', {arr, percentage, rounds1, rounds2, limit});
});


app.get('/save', (req, res) => {
  res.render('save');
});


const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
