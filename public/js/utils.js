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
      timeLeft = 6;
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
}






/**************************** 
  references https://developer.mozilla.org/en-US/docs/Web/CSS/animation 

@Daniel Gomes de Almeida Filho
tem ambiguidade na frase:
Insira o percentual de vezes que a nota de R$ 100 deverá aparecer do lado esquerdo.

Se 20% for atribuido ao percentual, então a nota de 100 reais deverá aparecer 20% das rodadas do lado esquerdo?



Como eu calculo o percentual de vezes?
Pelo codigo fonte no matlab o percentual refere-se ao pool, ao inves do numero de rodadas. Porque?

nBol tem que ser  o numero de rodadas

***********************/

function playGame(arr, timeReward) {
  

  const turns = arr.length; // number of rounds to play
  console.log(turns);
  console.log(arr);
  console.log('timeReward', timeReward);
  var turn = 1;
  var lefts = 0;
  var wins = 0;
  var deltas = [];

  // Using objects to store pairs
  var results = [];

  // Start timer;
  startTracking();
  startTimer();

  var timeout = setTimeout(function() {
    stopTimer();
    $('#loader-block').hide();
    $('#buttons').hide();

    // $('#return').show();
    $('#message').text('Tempo Encerrado!!');
    $('#reset-block').show();
  },5000);

  // console.log('timer1', timeout);


  $('button').click(function() {
    console.log('turns: ', turn);
    
    clearTimeout(timeout);
    startTimer();            

    // collect data from time tracking 
    stopTracking();
    console.log('elapsed time', elapsedTime);        
    deltas.push(elapsedTime);
    //
    // Reset Game
    //
    if (this.id == 'game') {
      window.location.href = 'game';
      return;
    }
    // Display results
    if (this.id == 'result-button') {
      $('#img-display').hide();
      $('#result-button').hide();
      //$('#saveButton').hide();
      $('#result-list').show();
      return;
    }

    // Save results to csv
    if (this.id == 'saveButton') {
      $('#img-display').hide();
      // console.log('saving csv');
    }
    //
    // Playing Game
    //
    if (this.id == 'left' || this.id == 'right') {     
      clearAnimation = true;               
      const choice = $(this).attr('id');          
      if (choice=='left') {
        
        $('#left').css('background-color', 'blue')
        $('#left').css('border-color', 'blue');
        $('#left').css('color', '#FFF');

        //$('#right').hide();
        $('#right').css('background-color', '#000');
        $('#right').css('border', '#000');

        lefts+=1;

        if (arr[turn-1] == 0) { // if it's a loss
          console.log('TIME REWARD?: ',timeLeft, timeReward)
          if (timeLeft > timeReward) { 
            results.push([choice, 10]);
            $('#no-prize-image').attr('src', '/images/10reais.png');
          } else {
            results.push([choice, 5]);
            $('#no-prize-image').attr('src', '/images/5reais.png');

          }
        } else if (arr[turn-1] == 1) { // if it's a win
          wins+=1;
          console.log('TIME REWARD?: ',timeLeft, timeReward)
          if (timeLeft > timeReward) { 
            results.push([choice, 100]);              
            $('#prize-image').attr('src', '/images/100reais.png');
          } else {
            results.push([choice, 50]);
            $('#prize-image').attr('src', '/images/50reais.png');

          }
        }
      } 
      if (choice=='right') {
        $('#right').css('background-color', 'blue')
        $('#right').css('border-color', 'blue');
        $('#right').css('color', '#FFF');
        $('#left').css('background-color', '#000');
        $('#left').css('border', '#000');
 
  
        // if it's a win. the logic is in the negative because we are looking at the value stored in the left array distriution, which the positon has value 2, but the user won but clicking a right click being a won, but and we push left clicks only
        if (arr[turn-1] == 0) { // it is a win
          wins+=1;
          console.log('TIME REWARD?: ',timeLeft, timeReward)
          if (timeLeft > timeReward) { 
            results.push([choice, 100]);
            $('#prize-image').attr('src', '/images/100reais.png');
              
          } else {
            results.push([choice, 50]);
            $('#prize-image').attr('src', '/images/50reais.png');

          }
          
        } else if (arr[turn-1] == 1) { // it is a loss
          console.log('TIME REWARD?: ',timeLeft, timeReward)
          if (timeLeft > timeReward) { 
            results.push([choice, 5])
            $('#no-prize-image').attr('src', '/images/10reais.png');
          } else {
            results.push([choice, 10])
            $('#no-prize-image').attr('src', '/images/5reais.png');
          }

        


        }
      }
      $('#img-display').hide();
      $('#prize-image').hide();
      $('#no-prize-image').hide();                     
      
      // init first timer 600 miliseconds
      setTimeout(function() {
        // showing result image 
        $('#buttons').hide();
        // console.log('choice ', choice, ' arr[turn-1]: ', arr[turn-1]);
        if (choice=='left') {         
          if (arr[turn-1] == 0) { // if turn is a loss
            $('#no-prize-image').show();            
          } else if (arr[turn-1] == 1) { // else if turn is a win
            $('#prize-image').show();              
          }
        }
        if (choice=='right') {
          if (arr[turn-1] == 0) { // this conditional has its logic in backwrds. if the user's choice is right and arr[i] is 0 it means  a win 
            $('#prize-image').show();
          } else if (arr[turn-1] == 1) { // this conditional has its logic in backwards. it  the user's choice is right and arr[i] is 1 it means a loss. because the ystem looks nly at left results, and it reverts  right results with its own. 
            $('#no-prize-image').show();
          }
        }
        $('#img-display').show();
        $('#result-block').show();          

        //
        // End Game
        //
        if (turn-1 == turns) {
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
          return;
        }

      
        // init second timer 500 miliseconds
        setTimeout(function() {
          $('#result-block').hide();
          $('#img-display').hide();
          
          $('#left').css('background-color', '#FFF');
          $('#left').css('border-color', '#FFF');
          $('#left').css('color' , '#000');

          $('#right').css('background-color', '#FFF');
          $('#right').css('border-color', '#FFF');
          $('#right').css('color' , '#000');
          //$('#right').show();    
          // $('#left').show();
          $('#buttons').show();

          $('#loader-block').show();
          console.log('timer2: ',document.querySelector('.timer'));
          runTimer(document.querySelector('.timer'),true);
          clearTimeout(timeout);                
          resetTimer();
          startTimer();
          startTracking();

          // init first timer 5 seconds
          timeout = setTimeout(function() {
              stopTimer();
              $('#loader-block').hide();
              $('#buttons').hide();
              $('#reset-block').show();    
          },5000);
        }, 500);
      }, 600);

      turn+=1;          
      return;
    }        
  });  // on button click  
}