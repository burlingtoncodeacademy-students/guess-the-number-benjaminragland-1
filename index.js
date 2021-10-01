const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
whichGame();
async function whichGame() {
  let chooseGame = await ask(
    "Please choose which game you want to play:\nThe computer vs you: 1 >_\nYou vs the computer: 2 >_\n"
  );

  if (chooseGame === "1") {
    computerGuessingGame();
  } else if (chooseGame === "2") {
    humanGuessingGame();
  }
}

//guessing game where computer tries to guess number picked by human
async function computerGuessingGame() {
  //variables and functions for the main game while loop
  let min = 1;
  let max;
  let gameWon = false;
  let randomNumber = () => {
    return Math.round(Math.random() * (max - min) + min);
  };
  let yesOrNo;
  let guessCounter = 1;
  let guessQuestion;
  let validNumber = false;
  let secretNumber;

  //lets user choose a max number for guessing range or default value is 100
  while (max === undefined) {
    max = await ask(`
      Before we start the guessing game, what number would you like to be the 
      maximum in the guessing range? Enter a number of your choosing, or N for default value: `);
    if (max.toUpperCase() === "N") {
      max = 100;
    } else {
      max = +max;
    }
  }
  let computerGuess = randomNumber();

  //starts the game. user pics secretNumber. computer makes first guess
  console.log(
    "\nLet's play a game where you (human) make up a number, and I (computer) try to guess it."
  );

  while (validNumber === false) {
    secretNumber = await ask(
      "What is your secret number?\nI won't peek, I promise...\n"
    );
    if (isNaN(secretNumber) || +secretNumber > max) {
      console.log(`Please choose a valid integer between 1 and ${max}`);
    } else {
      validNumber = true;
    }
  }
  console.log("You entered: " + secretNumber);
  secretNumber = +secretNumber;

  //loop continues with computer guessing numbers until gameWon === true
  while (gameWon === false) {
    console.log(`The computer guesses ${computerGuess}
    `);
    guessQuestion = await ask(`Did I guess correctly?... Y/N >_ `);
    if (guessQuestion.toUpperCase() === "Y") {
      console.log(`
      Congratulations Computer!!! You guessed my number!
      You guessed it in ${guessCounter} tries!
      `);
      //lets user choose whether or not to play again after game has ended
      let playAgain = await ask("Would you like you play again? Y/N...");
      if (playAgain.toUpperCase() === "Y") {
        gameWon = true;
        max = undefined;
        computerGuessingGame();
        break;
      } else {
        console.log("\nThanks for playing the game!!!\n");
        process.exit();
      }
    }

    //84-89: anti cheating feature. human forefits right to play again
    if (guessQuestion.toUpperCase() === "N" && computerGuess === secretNumber) {
      console.log("\nYou cheated! I'm outta here!!\n");
      process.exit();
    } else if (guessQuestion.toUpperCase() === "N") {
      yesOrNo = await ask(
        `Is your secret number higher or lower than my guess?... H/L >_ `
      );
    }
    if (yesOrNo.toUpperCase() === "H") {
      console.log(`You need to guess higher than ${computerGuess}`);
      min = computerGuess;
    } else if (yesOrNo.toUpperCase() === "L") {
      console.log(`You need to guess lower than ${computerGuess}`);
      max = computerGuess;
    }
    computerGuess = Math.round((max + min) / 2);
    guessCounter++;
  }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//guessing game where human tries to guess number picked by computer
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

  //lets user choose a max number for guessing range or default value is 100
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

  //starts the game. computer pics secretNumber. human makes first guess
  console.log(
    "\nLet's play a game where I (the computer) make up a number and you (human) try to guess it. Good luck!"
  );
  let humanGuess = await ask(
    "\nWhat do you think my number is human? Take a guess >_ "
  );
  humanGuess = +humanGuess;

  //loops through program until humanGuess === secretNumber
  while (gameWon === false) {
    if (humanGuess === secretNumber) {
      console.log(
        `
        You guessed my number! It was in fact ${secretNumber}. You guessed it in ${guessCounter} tries.
        `
      );

      //lets user choose whether or not to play again after game has ended
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
    if (humanGuess > max || isNaN(+humanGuess)) {
      console.log(`Please choose a valid integer between 1 and ${max}.`);
      humanGuess = await ask("\nPlease take another guess >_ ");
      humanGuess = +humanGuess;
    } else if (humanGuess > secretNumber) {
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
