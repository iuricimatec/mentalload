

function game(percentage, rounds) {
  // console.log(percentage, rounds, limit);
  const nBol = 1000 // '<%=rounds%>';  // What is nBol??  it is defintely not turns. nBol must be big enough to allow most accuracy 
  const percEsq = percentage/100;
  const rodadas = rounds;
  const esq = new Array(rodadas).fill(0);
  // console.log('percEsq: ', percEsq);
  const n1 = Math.round((nBol * percEsq));
  // console.log('n1: ', n1);
  const n0 = nBol - n1;
  // console.log('n0: ', n0);
  const idx = [0, 1];
  const pool = new Array(n0).fill(idx[0]).concat(new Array(n1).fill(idx[1]));
  // console.log(pool.length);
  // console.log('pool', pool);
  
  for (let i = 0; i < rodadas; i++) {
    const index = Math.floor(Math.random() * 1000);
    esq[i] = pool[index];
  }

  const p0 = esq.filter(value => value === 0).length / rodadas;
  const p1 = esq.filter(value => value === 1).length / rodadas;
  // console.log('p0', p0, 'p1', p1);
  // console.log('esq', esq);
  $('#p0').val(p0);
  $('#p1').val(p1);
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

function displayImage(arr, turn, choice, elapsedTime) {
  //console.log('arr ', arr[turn], 'choice ', choice)
  // hide buttons
  $('#buttons').hide();
  // hide timer
  $('#loader-block').hide();
  //console.log('bonus? ', elapsedTime, limit.value);
  
  if (choice === 'left') {
    if (arr[turn] == 0) {
      if (elapsedTime < limit.value*1000) { 
        $('#prize10-image').show();
      } else {
        $('#prize5-image').show();
      }
    } else if (arr[turn] == 1) {
      if (elapsedTime < limit.value*1000) {
        $('#prize100-image').show();
      } else {
        $('#prize50-image').show();
      }
    }
  } 
  if (choice === 'right') {
    if (arr[turn] == 0) {
      if (elapsedTime < limit.value*1000) {
        $('#prize100-image').show();
      } else {
        $('#prize50-image').show();
      }
    } else if (arr[turn] == 1) {
      if (elapsedTime < limit.value*1000) {
        $('#prize10-image').show();
      } else {
        $('#prize5-image').show();
      }
    }
  }
  $('#img-display').show();
  setTimeout(function() {
    $('#img-display').hide();
    $('#prize5-image').hide();
    $('#prize10-image').hide();
    $('#prize50-image').hide();
    $('#prize100-image').hide();
  }, 500);
}

function play(arr,stage) {
  let startTime = Date.now();
  let elapsedTime = 0;

  //console.log(startTime);
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
    elapsedTime = (Date.now() - startTime) - elapsedTime;
    results.push(['left', parseInt(arr[turn]), elapsedTime]);   
    displayImage(arr, turn, 'left', elapsedTime);
    if (arr[turn] == 1) {
      wins+=1;
    }
    //console.log('results: ', results);     
  });

 
  $('#right').on('click', function() {
    $('#right').css('background-color', 'blue')
    $('#right').css('border-color', 'blue');
    $('#right').css('color', '#FFF');
    $('#left').css('background-color', '#000');
    $('#left').css('border', '#000');

    elapsedTime = Date.now() - startTime;
    if (arr[turn] == 1) {
      results.push(['right', 0, elapsedTime]);   
    } else {
      results.push(['right', 1, elapsedTime]);   
      wins+=1;
    }
    displayImage(arr, turn, 'right', elapsedTime);   
    //console.log('results: ', results); 
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
        turn+=1; 
        // console.log('turn ', turn, arr.length, wins);
        if (turn === arr.length) {
          if (stage == 0) {
            if (parseInt(rounds2.value) > 0) {
              window.location.href = '/game?percentage='+percentage.value+'&rounds1='+rounds1.value+'&rounds2='+rounds2.value+'&limit='+limit.value+'&results='+results+'&arr='+arr+'&wins='+wins+'&lefts='+lefts;
            } else {
              endGame(results, results.length, parseInt(wins), parseInt(lefts), elapsedTime);
            } 
          }
          if (stage == 1) {
            // console.log('WINS ', $('#wins1').val(), wins);
            // console.log('results ', results);
                        
            // Split the string into an array of individual values
            const parts = $('#results1').val().split(',');

            // Initialize an array to store the triples
            const triples = [];

            // Iterate over the parts and create arrays
            for (let i = 0; i < parts.length; i += 3) {
              const triple = [
                parts[i],
                isNaN(parts[i + 1]) ? parts[i + 1] : parseInt(parts[i + 1], 10),
                isNaN(parts[i + 2]) ? parts[i + 2] : parseInt(parts[i + 2], 10)
              ];
              triples.push(triple);
            }



            endGame([...triples, ...results], [...triples, ...results].length, parseInt($('#wins1').val()) + parseInt(wins), parseInt($('#lefts1').val()) + parseInt(lefts), elapsedTime);
          }
        } else {
          displayButtons();
        }
      }, 600);
    }
  });  
}




function endGame(results, turns, wins, lefts, elapsedTime) {
  //
  // Finish 1st stage and start 2nd stage to increase mental load
  //
  $('#img-display').hide();
  $('#buttons').hide();
  $('#loader-block').hide();
  $('#result-message').text('Fim de Jogo!');
  
  // 0) Juntar os tempos de reação de cada rodada para dar o resultado no final
  var totalscore = 0;
  var score = 0;
  var totalduration = 0;
  var duration = 0;
  var sampleData = []
  results.forEach(function(item,index) {
    // console.log('item',item);
    // $('#items-list').append('<li>Rodada ' + parseInt(parseInt(index)+1) + ': ' + item + '</li>');
    if (item[1] == 1) {
      if (elapsedTime < limit.value*1000 ) {
        score = 100;
        totalscore+=100;
      } else {
        score = 50;
        totalscore+=50;
      }
    } else {
      if (elapsedTime < limit.value*1000 ) {
        score = 10;
        totalscore+=10;
      } else {
        score = 5;
        totalscore+=5;
      }
    }
    totalduration+=item[2]; 
    duration = Math.abs(item[2] - duration);
    sampleData.push({ rodada: index+1, lado: item[0], valor: score, duracao: duration});
  });

  // Sample data (replace this with your actual data)
  //console.log('sampleData', sampleData);  
  // a) Mostrar só o quanto a pessoa ganhou sobre o máximo que ela poderia ter ganhado (número de rodadas x 100).
  $('#max').text('Pontos: ' + totalscore);

  // b) Mostrar o aproveitamento percentual quantas vezes ela acertou a nota de 100
  $('#wins').text('Acertos: ' + ((wins/(turns))*100) + '%');
  //console.log('wins: ', wins);

  // c) Mostrar quantas vezes ela escolheu o lado esquerdo em percentual
  $('#lefts').text('Total Esquerdas: ' + ((lefts/turns)*100) + '%');
  //console.log('%lefts: ',lefts);

  $('#interval').text('Duração: ' + totalduration + ' milisegundos');

  // e) Mostrar uma curva de média deslizante com N = 10 rodadas e step de 1 rodada 
  // em um gráfico em que o X é a rodada e o Y é a percentagem que a pessoa escolheu o lado esquerdo                



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


