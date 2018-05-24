// Declare all variables;

let cards = document.getElementsByClassName('card');
let deck = document.querySelector('.deck');
let shuffledCards = shuffle(cards);
let openedCards = [];
let moves = document.querySelector('.moves');
let secondStar = document.querySelector('#secondStar');
let thirdStar = document.querySelector('#thirdStar');
let modal = document.querySelector('.modal');
let modalHeader = document.querySelector('.modal-header');
let modalBody = document.querySelector('.modal-body');
let timer = document.querySelector('#timer');
let starNumber = 3;
let matchedCount = 0;
let clickedCards = 0;
let modalHeaderMessage = '';
let modalBodyMessage = '';
let t, seconds, minutes;
let time = '00:00'

//score panel - star rate and moves

moves.textContent = 0;

function starRate() {
  if (moves.textContent > 12 && moves.textContent <= 18) {
    thirdStar.innerHTML = '<i class="fa fa-star-o"></i>';
    starNumber = 2;
  }
  if (moves.textContent > 18) {
    secondStar.innerHTML = '<i class="fa fa-star-o"></i>';
    starNumber = 1;
  }
}

function startTimer () {

    t = setInterval(function () {
      timer.textContent = time;
      seconds++;

      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          seconds = 0;
        }
      }
      timer.textContent =
        (minutes < 10 ? '0' + minutes.toString() : minutes) +
        ':' +
        (seconds < 10 ? '0' + seconds.toString() : seconds)
    },
    1000)
  }

// new game - helper functions

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function newGame() {
  //reset stars;
  secondStar.innerHTML = '<i class="fa fa-star"></i>';
  thirdStar.innerHTML = '<i class="fa fa-star"></i>';

  //reset moves;
  moves.textContent = 0;
  clickedCards = 0;

  //reset timer;
  clearInterval(t);
  seconds = 0;
  minutes = 0;
  timer.innerHTML = '00:00';

  //reset cards;
  for (let i = 0; i < shuffledCards.length; i++) {
    deck.appendChild(shuffledCards[i]);
    shuffledCards[i].classList.remove('open', 'match', 'unmatch');
  }
  openedCards = [];
  matchedCount = 0;

  //reset modal;
  modal.style.display = 'none';
  if (modalHeaderMessage) {
    modalHeader.removeChild(modalHeaderMessage);
    modalBody.removeChild(modalBodyMessage);
  }

}

// during game - toggle 'open' class

function unmatchCards() {
  openedCards[0].classList.add('unmatch');
  openedCards[1].classList.add('unmatch');
  setTimeout(function() {
    openedCards[0].classList.remove('unmatch', 'open');
    openedCards[1].classList.remove('unmatch', 'open');
    openedCards = [];
  }, 400);
}

function matchedCards() {
  openedCards[0].classList.add('match');
  openedCards[1].classList.add('match');
  matchedCount++;
  openedCards = [];
  endGame();
}

let displayCard = function () {
  this.classList.add('open');
}

let openedCard = function () {
  openedCards.push(this);
  clickedCards++;
  if (clickedCards === 1) {
    startTimer();
  }
  if (openedCards.length === 2) {
    moves.textContent++;
    starRate();
    if(openedCards[0].innerHTML !== openedCards[1].innerHTML) {
      unmatchCards();
    } else {
      matchedCards();
    }
  }
}

for (let shuffledCard of shuffledCards) {
  shuffledCard.addEventListener('click', displayCard);
  shuffledCard.addEventListener('click', openedCard);
}

// end game - modal message

function endGame() {
  setTimeout(function() {
    if (matchedCount === 8) {
      modalHeaderMessage = document.createElement('h3');
      modalBodyMessage = document.createElement('p');
      modalHeaderMessage.innerHTML = '<h3>Congratulations! You Won!</h3>';
      modalBodyMessage.innerHTML =
        `<p>With ${moves.textContent} Moves, ${minutes} Minutes ${seconds} Seconds and ${starNumber} Stars.</p>
        <p>Woooooo!</p>`;
      modalHeader.appendChild(modalHeaderMessage);
      modalBody.appendChild(modalBodyMessage);
      modal.style.display = 'block';
    }
  }, 1000);
}
