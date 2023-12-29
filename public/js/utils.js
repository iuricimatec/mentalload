

function game(percentage, rounds, limit) {
  console.log(percentage, rounds, limit);
  
  const nBol = 1000 // '<%=rounds%>';  // What is nBol??  it is defintely not turns. nBol must be big enough to allow most accuracy 
  const percEsq = percentage/100;
  const rodadas = rounds;
  const esq = new Array(rodadas).fill(0);

  // console.log('percEsq: ', percEsq);

  const n50 = Math.round((nBol * percEsq));
  // console.log('n100: ', n100);

  const n5 = nBol - n50;
  // console.log('n2: ', n2);

  const idx = [5, 50];
  const pool = new Array(n5).fill(idx[0]).concat(new Array(n50).fill(idx[1]));

  // console.log(pool.length);
  // console.log('pool', pool);
  
  for (let i = 0; i < rodadas; i++) {
    const index = Math.floor(Math.random() * 1000);
    esq[i] = pool[index];
  }

  const p5 = esq.filter(value => value === 5).length / rodadas;
  const p50 = esq.filter(value => value === 50).length / rodadas;

  console.log('p5', p5, 'p50', p50);
  console.log('esq', esq);
  $('#p5').val(p5);
  $('#p50').val(p50);
  $('#arr').val(esq);

} 
 

function resetGame() {
  $('#result-button').hide();
  //$('#saveButton').hide();
  $('#result-list').show();
}

function saveGame() {
  $('#img-display').hide();
  $('#prize5-image').hide();
  $('#prize10-image').hide();
  $('#prize50-image').hide();
  $('#prize100-image').hide();  
  // console.log('saving csv');
}
 
function resetCountdown(timeout) {
  stopTimer(timeout)
  timeLeft = 6;
  runTimer(document.querySelector('.timer'),true);
  
}

function displayButtons() {
  $('#left').css('background-color', '#FFF');
  $('#left').css('border-color', '#FFF');
  $('#left').css('color' , '#000');

  $('#right').css('background-color', '#FFF');
  $('#right').css('border-color', '#FFF');
  $('#right').css('color' , '#000');
  
  $('#buttons').show();
  $('#loader-block').show(); 
}

function displayResult(arr, turn) {
  // hide buttons
  $('#buttons').hide();
  // hide timer
  $('#loader-block').hide();
  if (arr[turn] == 5) {
    $('#prize5-image').show();
  } else if (arr[turn] == 50) {
    $('#prize50-image').show();
  }
  $('#img-display').show();

  setTimeout(function() {
    $('#img-display').hide();
    $('#prize5-image').hide();
    $('#prize10-image').hide();
    $('#prize50-image').hide();
    $('#prize100-image').hide();
    displayButtons();
  }, 500);
  
}

function play(arr) {
  let startTime = Date.now();
  let elapsedTime = 0;

  console.log(startTime);
   // start with 1, instead of 0.
   var turn = 0;
   var wins = 0;
   var lefts = 0;
   // Using objects to store result in pairs
   var results = [];

    $('#reset-button').on('click', function() {
      resetGame();
    });

    $('#save-button').on('click', function() {
     saveGame();
    });

    $('#game').on('click', function() {
      window.location.href = 'game';
    });

    $('#result-button').on('click', function() {
      $('#result-list').show();
    });

  // auxiliary functions
  // Using vanilla JavaScript
  $('#left').on('click', function() {
    $('#left').css('background-color', 'blue')
    $('#left').css('border-color', 'blue');
    $('#left').css('color', '#FFF');
    $('#right').css('background-color', '#000');
    $('#right').css('border', '#000');

    lefts+=1;
    elapsedTime = Date.now() - startTime;
    wins+=1;
    results.push(['left', 50, elapsedTime]);   
    // console.log('results: ', results);     
  });

 
  $('#right').on('click', function() {
    $('#right').css('background-color', 'blue')
    $('#right').css('border-color', 'blue');
    $('#right').css('color', '#FFF');
    $('#left').css('background-color', '#000');
    $('#left').css('border', '#000');

    elapsedTime = Date.now() - startTime;
    if (arr[turn]===50) {
      results.push(['right', 5, elapsedTime]);   
    } else {
      wins+=1;
      results.push(['right', 50, elapsedTime]);   
    }
    console.log('results: ', results); 
  });




  // init first timer 5 seconds
  runTimer(document.querySelector('.timer'),true);
  timeout = setTimeout(function() {
    stopTimer(timeout);
    $('#loader-block').hide();
    $('#buttons').hide();
    $('#reset-block').show();    
  }, 6000);

  $('button').click(function() {
    if (this.id == 'left' || this.id == 'right') {    
      $('#loader-block').hide();  
      resetCountdown(timeout);
      setTimeout(function() {
        console.log('choice ', 'left', ' arr[turn]: ', arr[turn]);
        displayResult(arr, turn);   
        turn+=1; 
        console.log('turn ', turn, arr.length, wins);
        if (turn === arr.length) {
          endGame(results, arr.length, wins, lefts);
        }
      }, 600);
    }
  });  
}

function endGame(results, turns, wins, lefts) {
  //
  // Finish 1st stage and start 2nd stage to increase mental load
  //
  $('#img-display').hide();
  $('#buttons').hide();
  $('#loader-block').hide();
  $('#result-message').text('Fim de Jogo!');
  
  // 0) Juntar os tempos de reação de cada rodada para dar o resultado no final
  var tot = 0;
  var score = 0;
  results.forEach(function(item,index) {
    console.log('item',item);
    // $('#items-list').append('<li>Rodada ' + parseInt(parseInt(index)+1) + ': ' + item + '</li>');
    tot+=item[2]; 
    score+=item[1];
  });

  // a) Mostrar só o quanto a pessoa ganhou sobre o máximo que ela poderia ter ganhado (número de rodadas x 100).
  $('#max').text('Pontos: ' + score);

  // b) Mostrar o aproveitamento percentual quantas vezes ela acertou a nota de 100
  $('#wins').text('Acertos: ' + ((wins/(turns))*100) + '%');
  console.log('wins: ', wins);

  // c) Mostrar quantas vezes ela escolheu o lado esquerdo em percentual
  $('#lefts').text('Total Esquerdas: ' + ((lefts/turns)*100) + '%');
  console.log('%lefts: ',lefts);


  $('#interval').text('Duração: ' + tot + ' milisegundos');

  // e) Mostrar uma curva de média deslizante com N = 10 rodadas e step de 1 rodada 
  // em um gráfico em que o X é a rodada e o Y é a percentagem que a pessoa escolheu o lado esquerdo                


  // Sample data (replace this with your actual data)
  var sampleData = []
  results.forEach(function(item,index) {
    sampleData.push({ rodada: index, lado: item[0], valor: item[1], duracao: item[2]});
  });
  console.log('sampleData', sampleData);  
  // Event listener for the button click
  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", function() {
    downloadCSV(sampleData, "results.csv");
  });
  // show result blocks <divs>
  $('#saveButton').show();
  $('#result-button').show();
  $('#result-block').show();
  $('#reset-block').show();


}





 // Function to convert data to CSV format
 function convertToCSV(data) {
  const header = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map(obj => Object.values(obj).join(",")).join("\n");
  return header + rows;
}

// Function to trigger the download
function downloadCSV(data, filename) {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: "text/csv" });

  // Create a download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  // Simulate a click on the link to trigger the download
  link.click();

  // Clean up
  URL.revokeObjectURL(link.href);
}





//
// Animated Timer;
//
// source code of timer animation;
//
let timeLeft = 6;
let timer = document.getElementById('timeLeft');

function isTimeLeft() {
  return timeLeft > -1;
}

function stopTimer(t) {
  clearInterval(t);
}

function runTimer(timerElement,clearAnimation) {
  // console.log('Running function runTimer', timerElement);
  // console.log(timerElement,clearAnimation, timeLeft, timer);
  const timerCircle = timerElement.querySelector('svg > circle + circle');
  timerElement.classList.add('animatable');
  // by removing strokeDashoffset the animation does not take time 
  // to load up  the timer. It stops, reload and restart depending on
  // the button event click   
  // timerCircle.style.strokeDashoffset = 1;
      

  let countdownTimer = setInterval(function(){
    //console.log('isTimeLeft: ', isTimeLeft());
    $('button').click(function() {
      clearInterval(countdownTimer);
      timeLeft = 6
      timerElement.classList.remove('animatable');
    });
  
    if(isTimeLeft() || timeLeft === 0){
      const timeRemaining = timeLeft--;
      // console.log('timeRemaining: ', timeRemaining, 'timeLeft: ', timeLeft);
      
      // for clockwise animation
      const normalizedTime = (timeRemaining - 6) / 4;
      // for counter clockwise animation
      // const normalizedTime = (6 - timeRemaining) / 6;
      timerCircle.style.strokeDashoffset = normalizedTime;
      timer.innerHTML = timeRemaining;
    } else {
      clearInterval(countdownTimer);
      timerElement.classList.remove('animatable');
    }  
  }, 1000);
  return countdownTimer;
}


