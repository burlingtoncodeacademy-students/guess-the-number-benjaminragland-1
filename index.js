const { count } = require("console");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  //variables and functions for the main game while loop
  let min = 1;
  let max;
  let gameWon = false;
  let randomNumber = () => {
    return Math.floor((max + min) / 2);
  };
  let yesOrNo;
  let guessCounter = 1;

  //lets user choose a max number for guessing range or defaults to 100
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
  let computerGuess = randomNumber();

  //starts the game. user pics secretNumber. computer makes first guess
  console.log(
    "\nLet's play a game where you (human) make up a number and I (computer) try to guess it."
  );

  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  secretNumber += +secretNumber;

  let guessQuestion;

  //loop continues with computer guessing numbers until gameWon === true
  while (gameWon === false) {
    console.log(`The computer guesses ${computerGuess}`);
    guessQuestion = await ask(`Did I guess correctly?... Y/N : `);
    if (guessQuestion.toUpperCase() === "Y") {
      console.log(`
      Congratulations Computer!!! You guessed my number!
      You guessed it in ${guessCounter} tries!
      `);

      //lets user choose whether or not to play again(*** currently broken if they choose yes ***)
      let playAgain = await ask("Would you like you play again? Y/N...");
      if (playAgain.toUpperCase() === "Y") {
        wonGame = true;
        start();
      } else {
        process.exit();
      }
    }
    if (guessQuestion.toUpperCase() === "N") {
      yesOrNo = await ask(
        `Is your secret number higher or lower than my guess?... H/L : `
      );
    }
    if (yesOrNo.toUpperCase() === "H") {
      console.log(`You need to guess higher than ${computerGuess}`);
      min = computerGuess;
    } else if (yesOrNo.toUpperCase() === "L") {
      console.log(`You need to guess lower than ${computerGuess}`);
      max = computerGuess;
    }
    computerGuess = Math.floor((max + min) / 2);
    guessCounter++;
  }
}
