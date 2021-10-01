const { count } = require("console");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
humanGuessingGame();

async function humanGuessingGame() {
  //variable declarations for humanGuessingGame
  let min = 1;
  let max;
  let randomNumber = () => {
    return Math.round(Math.random() * (max - min) + min);
  };
  let guessCounter = 1;
  gameWon = false;
  let secretNumber;

  while (max === undefined) {
    max = await ask(
      `
      Before we start the guessing game, what number would you like to be the 
      maximum in the guessing range? Enter a number of your choosing, or N for default value: `
    );
    if (max.toUpperCase() === "N") {
      max = 100;
    } else {
      max = +max;
    }
  }
  secretNumber = randomNumber();

  //starts the game. user pics secretNumber. computer makes first guess
  console.log(
    "\nLet's play a game where you I (the computer) make up a number and you (human) try to guess it. Good luck!"
  );
  let humanGuess = await ask(
    "\nWhat do you think my number is human? Take a guess >_ "
  );
  humanGuess = +humanGuess;

  while (gameWon === false) {
    if (humanGuess === secretNumber) {
      console.log(
        `
        You guessed my number! It was in fact ${secretNumber}. You guessed it in ${guessCounter} tries.
        `
      );
      let playAgain = await ask("Would you like you play again? Y/N...");
      if (playAgain.toUpperCase() === "Y") {
        gameWon = true;
        humanGuessingGame();
        break;
      } else {
        console.log("\nThank you for playing the game!\n");
        process.exit();
      }
    }
    if (humanGuess > secretNumber) {
      console.log(`You need to guess lower than ${humanGuess}`);
      humanGuess = await ask("\nPlease take another guess >_ ");
      humanGuess = +humanGuess;
      guessCounter++;
    } else if (humanGuess < secretNumber) {
      console.log(`You need to guess higher than ${humanGuess}`);
      humanGuess = await ask("\nPlease take another guess >_ ");
      humanGuess = +humanGuess;
      guessCounter++;
    }
  }
}
