let isAutoPlaying = false; // Controla o estado do modo automatico
let intervalId; // Armazena o identificador do intervalo

// Objeto para armazenar o placar
let score = localGetStorage() || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement(); // Atualiza o placar na tela

// Função para ativar/desativar o modo automatico
function autoPlay() {
  if (!isAutoPlaying) { // Se o modo automático está desligado
    intervalId = setInterval(() => {
      playGame(); // Chama playGame repetidamente a cada segundo
    }, 1000);
    isAutoPlaying = true; // Muda o estado para ligado
  } else { // Se o modo automático está ligado
    clearInterval(intervalId); // Para o intervalo
    isAutoPlaying = false; // Muda o estado para desligado
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors')
  }
});

// Função principal do jogo
function playGame(playerMove) {
  if (!playerMove) {
    playerMove = pickComputerMove(); // Gera uma jogada automática se não for fornecida
  }

const computerMove = pickComputerMove(); // Jogada do computador
let result = '';

  // Lógica do jogo
  if (playerMove === 'rock') {
    result = (computerMove === 'rock') ? 'Tie.' :
      (computerMove === 'paper') ? 'You lose.' : 'You win.';
  } else if (playerMove === 'paper') {
    result = (computerMove === 'rock') ? 'You win.' :
      (computerMove === 'paper') ? 'Tie.' : 'You lose.';
  } else if (playerMove === 'scissors') {
    result = (computerMove === 'rock') ? 'You lose.' :
      (computerMove === 'paper') ? 'You win.' : 'Tie.';
  }

  // Atualiza o placar com base no resultado
  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

localSetStorage(); // Salva o placar no localStorage
updateScoreElement(); // Atualiza o placar na tela

document.querySelector('.js-result'). // updating o result na pagina;
innerHTML = result;

// Atualiza os resultados e jogadas na página
document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-moves').innerHTML = `
  You picked
  <img src="images-rps/${playerMove}-emoji copy.png" class="move-icon">
  <img src="images-rps/${computerMove}-emoji copy.png" class="move-icon">
  Computer
  `;
}

// Atualiza o placar na tela
function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `
    Wins: ${score.wins},
    Losses: ${score.losses},
    Ties: ${score.ties}.
  `;
}

// Salva o placar no localStorage
function localSetStorage(){
  localStorage.setItem('score', JSON.stringify(score)); // chaves no localStorage são sempre strings;
}

// Recupera o placar do localStorage
function localGetStorage(){
  return JSON.parse(localStorage.getItem('score'));
}

// Gera uma jogada aleatória para o computador
function pickComputerMove() {
  const randomMove = Math.random();
  if (randomMove < 1/3) {
    return 'rock';
  } else if (randomMove < 2/3) {
    return 'paper';
  } else {
    return 'scissors';
  }
}