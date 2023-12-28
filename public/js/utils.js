

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

function displayResult(arr, turn, wins) {
  // hide buttons
  $('#buttons').hide();
  // hide timer
  $('#loader-block').hide();

  if (arr[turn-1] == 5) {
    $('#prize5-image').show();
  } else if (arr[turn-1] == 50) {
    $('#prize50-image').show();
    wins+=1;
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

function play(arr, turn) {
  const turns = arr.length; // number of rounds to play
  console.log('turns', turns);
  console.log('array', arr);

  runTimer(document.querySelector('.timer'),true);
  // init first timer 5 seconds
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
        console.log('choice ', 'left', ' arr[turn-1]: ', arr[turn-1]);
        displayResult(arr, turn, wins); 
         
      }, 600);
    }
  });  
}

function endGame(results, turns, wins, deltas) {
  //
  // Finish 1st stage and start 2nd stage to increase mental load
  //
  $('#img-display').hide();
  $('#prize-image').hide();
  $('#no-prize-image').hide();
  $('#buttons').hide();
  $('#loader-block').hide();
  $('#result-message').text('Fim de Jogo!');
  results.forEach(function(item,index) {
    console.log('item',item);
    // $('#items-list').append('<li>Rodada ' + parseInt(parseInt(index)+1) + ': ' + item + '</li>');
  });

  // a) Mostrar só o quanto a pessoa ganhou sobre o máximo que ela poderia ter ganhado (número de rodadas x 100).
  $('#max').text('Pontos: ' + (wins*100) + '/' + (turns*100));

  // b) Mostrar o aproveitamento percentual quantas vezes ela acertou a nota de 100
  $('#wins').text('Acertos: ' + ((wins/(turns))*100) + '%');
  console.log('wins: ', wins);

  // c) Mostrar quantas vezes ela escolheu o lado esquerdo em percentual
  $('#lefts').text('Total Esquerdas: ' + ((lefts/turns)*100) + '%');
  console.log('%lefts: ',lefts);

  // d) Juntar os tempos de reação de cada rodada para dar o resultado no final
  tot = 0
  deltas.forEach(function(d) {
    tot+=d; 
  });
  $('#interval').text('Duração: ' + tot + ' milisegundos');

  // e) Mostrar uma curva de média deslizante com N = 10 rodadas e step de 1 rodada 
  // em um gráfico em que o X é a rodada e o Y é a percentagem que a pessoa escolheu o lado esquerdo                


  // Sample data (replace this with your actual data)
  var sampleData = []
  results.forEach(function(item,index) {
    sampleData.push({ rodada: index, lado: item[0], valor: item[1], duracao: deltas[index]});
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
  console.log('Running function runTimer', timerElement);
  console.log(timerElement,clearAnimation, timeLeft, timer);
  const timerCircle = timerElement.querySelector('svg > circle + circle');
  timerElement.classList.add('animatable');
  // by removing strokeDashoffset the animation does not take time 
  // to load up  the timer. It stops, reload and restart depending on
  // the button event click   
  // timerCircle.style.strokeDashoffset = 1;
      

  let countdownTimer = setInterval(function(){
    console.log('isTimeLeft: ', isTimeLeft());
    $('button').click(function() {
      clearInterval(countdownTimer);
      timeLeft = 6
      timerElement.classList.remove('animatable');
    });
  
    if(isTimeLeft()){
      const timeRemaining = timeLeft--;
      console.log('timeRemaining: ', timeRemaining, 'timeLeft: ', timeLeft);
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


