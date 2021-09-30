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
    return Math.round(Math.random() * (max - min) + min);
  };
  let computerGuess = randomNumber();
  let yesOrNo;

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
    console.log(`The computer guesses ${computerGuess}`);
    guessQuestion = await ask(`Did I guess correctly?... Y/N : `);
    if (guessQuestion.toUpperCase() === "Y") {
      console.log("Congratulations!!! You guessed my number!");
      wonGame = true;
      process.exit();
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
  }
  // }
  // while (gameWon === false) {
  //   if (yesOrNo.toUpperCase() === "H") {
  //     console.log(computerGuess);
  //     min = computerGuess;
  //   } else if (yesOrNo.toUpperCase() === "L") {
  //     max = computerGuess;
  //   }
  //   computerGuess = Math.floor((max + min) / 2);
  // }
}

//tell the computer if the number was correct or not. if not, whether the secret number is higher or lower

//store new number range to reflect if secret number is lower than computer guess

//

// process.exit();

// let numberGenerator = () => {
//   return Math.round(Math.random() * (max - min) + min);
// };

//return Math.floor((max + min) / 2);
