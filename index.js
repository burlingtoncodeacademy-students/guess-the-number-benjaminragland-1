const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  //variables for the while loop
  let min = 1;
  let max = 100;
  let gameWon = false;
  let randomNumber = () => {
    return Math.floor((max + min) / 2);
  };
  let computerGuess = randomNumber();
  let yesOrNo;
  let highOrLow;

  //starts the game. user pics secretNumber. computer makes first guess
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  secretNumber += +secretNumber;

  let guessQuestion;

  //loop continues with computer guessing until computerGuess === secretNumber
  while (gameWon === false) {
    //make the computer guess a random number between 1 - 100
    guessQuestion = await ask(
      `Is your secret number ${computerGuess}?... Y/N : `
    );
    if (guessQuestion.toUpperCase() === "Y") {
      console.log("Congratulations!!! You guessed my number!");
      wonGame = true;
      process.exit();
    } else if (guessQuestion.toUpperCase() === "N") {
      yesOrNo = await ask(
        `Is your secret number higher or lower than my guess?... H/L : `
      );
    }
  }

  if (yesOrNo.toUpperCase() === "H") {
    min = computerGuess;
    guessQuestion = await ask(
      `Is your secret number ${randomNumber()}?... Y/N : `
    );
    highOrLow = true;
  } else if (yesOrNo.toUpperCase() === "L") {
    max = computerGuess;
    guessQuestion = await ask(
      `Is your secret number ${randomNumber()}?... Y/N : `
    );
    highOrLow = true;
  }
}

//tell the computer if the number was correct or not. if not, whether the secret number is higher or lower

//store new number range to reflect if secret number is lower than computer guess

//

// process.exit();

// let numberGenerator = () => {
//   return Math.round(Math.random() * (max - min) + min);
// };
