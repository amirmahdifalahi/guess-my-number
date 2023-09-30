'use strict';

let score = 20;
let highScore = 0;

// this function generates the secret number
const secretNumberGenerator = function () {
  const temp = Math.trunc(Math.random() * 20) + 1;
  return temp;
};

let secretNumber = secretNumberGenerator();

// a function that can set a text content for an element by giving css selector. link querySelector
const setTextContent = function (cssSelector, content) {
  document.querySelector(cssSelector).textContent = content;
};

// again event handler
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = secretNumberGenerator();
  console.log(secretNumber);

  setTextContent('.score', score);
  setTextContent('.message', 'Start guessing...');
  document.querySelector('.guess').value = '';

  setTextContent('.number', '?');
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
});

// check evennt handler. whenever "check" button is clicked
document.querySelector('.check').addEventListener('click', function () {
  // giving textBox value and converting from string to number. by default, textBox value is always string
  const guess = Number(document.querySelector('.guess').value);

  // when input is empty
  if (!guess) {
    setTextContent('.message', 'No number⛔');

    // when player won
  } else if (guess === secretNumber) {
    setTextContent('.message', 'Correct number🎉');

    setTextContent('.number', secretNumber);
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
    }
    setTextContent('.highscore', highScore);

    // when the input is wrong
  } else if (guess !== secretNumber) {
    if (score > 0) {
      setTextContent(
        '.message',
        guess > secretNumber ? 'Too high📈' : 'Too low📉'
      );
      score--;
      setTextContent('.score', score);
    } else {
      setTextContent('.message', '💥You lost the game');
    }
  }
});
