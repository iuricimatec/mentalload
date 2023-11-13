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


app.get('/', (req, res) => {
  res.render('index');
});



app.get('/settings', (req, res) => {
  res.render('settings');
  
});



app.post('/game', (req, res) => {
  const percentage = req.body.percentage;
  const rounds = req.body.rounds;
  const timeReward = req.body.timeReward
  // It seems wrong to define the array of answers previously to the game. 
  // It sounds more reasonable/rational to calculate the array on every turn. 
  // As an action triggered by the user 
  res.render('game', {percentage, rounds,timeReward});
});

app.post('/play', (req, res) => {
  const arr = req.body.arr;
  const percentage = req.body.percentage;
  const rounds = req.body.rounds;
  const timeReward = req.body.timeReward;
  res.render('play', {arr, percentage, rounds, timeReward});
});

app.get('/save', (req, res) => {
  res.render('save');
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
