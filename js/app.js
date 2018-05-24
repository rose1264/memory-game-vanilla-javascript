/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');
let deck = document.querySelector('.deck');
let shuffledCards = shuffle(cards);
let openedCards = [];
let moves = document.querySelector('.moves');
let firstStar = document.querySelector('#firstStar');
let secondStar = document.querySelector('#secondStar');
let thirdStar = document.querySelector('#thirdStar');
let modal = document.querySelector('.modal');
let modalHeader = document.querySelector('.modal-header');
let modalBody = document.querySelector('.modal-body');
let starNumber = 3;
let matchedCount = 0;
let modalHeaderMessage = '';
let modalBodyMessage = '';

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//score panel - star rate and moves
moves.textContent = 0;

function starRate() {
  if (moves.textContent > 12 && moves.textContent <= 18) {
    thirdStar.innerHTML = '<i class="fa fa-star-o"></i>';
    starNumber = 2;
  }
  if (moves.textContent > 18 && moves.textContent <= 24) {
    secondStar.innerHTML = '<i class="fa fa-star-o"></i>';
    starNumber = 1;
  }
  if (moves.textContent > 24) {
    firstStar.innerHTML = '<i class="fa fa-star-o"></i>';
    starNumber = 0;
  }
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
  for (let i = 0; i < shuffledCards.length; i++) {
    deck.appendChild(shuffledCards[i]);
    shuffledCards[i].classList.remove('open', 'match', 'unmatch');
  }
  moves.textContent = 0;
  openedCards = [];
  firstStar.innerHTML = '<i class="fa fa-star"></i>';
  secondStar.innerHTML = '<i class="fa fa-star"></i>';
  thirdStar.innerHTML = '<i class="fa fa-star"></i>';
  modal.style.display = 'none';
  matchedCount = 0;
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
  }, 350);
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
        `<p>With ${moves.textContent} Moves and ${starNumber} Stars.</p>
        <p>Woooooo!</p>`;
      modalHeader.appendChild(modalHeaderMessage);
      modalBody.appendChild(modalBodyMessage);
      modal.style.display = 'block';
    }
  }, 1000);
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
