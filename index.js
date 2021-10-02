const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

whichGame();
//let user decide which game they wold like to play

async function whichGame() {
  let chooseGame = await ask(
    "Please choose which guessing game you want to play:\nThe computer vs you: 1 >_\nYou vs the computer: 2 >_\n"
  );

  if (chooseGame === "1") {
    computerGuessingGame();
  } else if (chooseGame === "2") {
    humanGuessingGame();
  } else {
    console.log("\nPlease choose only the integer 1 or 2...\n");
    whichGame();
  }
}

//guessing game where computer tries to guess number picked by human
async function computerGuessingGame() {
  //variables and function declarations for computerGuessingGame
  let min = 1;
  let max;
  let gameWon = false;
  let randomNumber = () => {
    return Math.round(Math.random() * (max - min) + min);
  };
  let highLow;
  let guessCounter = 1;
  let guessQuestion;
  let validNumber = false;
  let secretNumber;
  let cheatDetector = false;

  //lets user choose a max number for guessing range or default value is 100
  while (max === undefined) {
    max = await ask(`
      Before we start the guessing game, what number would you like to be the 
      maximum in the guessing range? Enter a number of your choosing, or N for 
      default value of 100: `);
    if (max.toUpperCase() === "N") {
      max = 100;
    } else if (isNaN(max)) {
      console.log("\nPlease choose a valid integer.");
      max = undefined;
    } else {
      max = +max;
    }
  }
  let computerGuess = randomNumber();

  //starts the game. user pics secretNumber. computer makes first guess
  console.log(
    "\nLet's play a game where you (human) make up a number, and I (computer) try to guess it.\n"
  );

  while (validNumber === false) {
    secretNumber = await ask(
      "What is your secret number?\nI won't peek, I promise...\n"
    );
    if (isNaN(secretNumber) || +secretNumber > max) {
      console.log(`
      Please choose a valid integer between 1 and ${max}
      `);
    } else {
      validNumber = true;
    }
  }
  console.log("You entered: " + secretNumber);
  secretNumber = +secretNumber;

  //loop continues with computer guessing numbers until computer wins and (gameWon === true)
  while (gameWon === false) {
    console.log(`The computer guesses ${computerGuess}
    `);

    guessQuestion = await ask(`Did I guess correctly?... Y/N >_ `);
    while (
      guessQuestion.toUpperCase() !== "Y" &&
      guessQuestion.toUpperCase() !== "N"
    ) {
      console.log("\nPlease only choose Y or N");
      guessQuestion = await ask(`Did I guess correctly?... Y/N >_ `);
    }
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
    //next 3 lines: anti cheating feature. human forefits right to play again
    if (guessQuestion.toUpperCase() === "N" && computerGuess === secretNumber) {
      console.log("\nYou cheated! I'm outta here!!\n");
      process.exit();
    } else if (guessQuestion.toUpperCase() === "N") {
      highLow = await ask(
        `Is your secret number higher or lower than my guess?... H/L >_ `
      );
    }

    while (highLow.toUpperCase() !== "H" && highLow.toUpperCase() !== "L") {
      console.log("\nPlease choose only H or L\n");
      highLow = await ask(
        `Is your secret number higher or lower than my guess?... H/L >_ `
      );
    }

    //cheat detector if human says lower when the secret number is higher than computerGuess or reverse
    while (cheatDetector === false) {
      if (highLow.toUpperCase() === "H" && computerGuess > secretNumber) {
        console.log(
          "\nI don't think you are being completely honest with me *growl*...\n"
        );
        highLow = await ask(
          `Is your secret number higher or lower than my guess?... H/L >_ `
        );
      } else if (
        highLow.toUpperCase() === "L" &&
        computerGuess < secretNumber
      ) {
        console.log(
          "\nI don't think you are being honest with me *growl*...\n"
        );
        highLow = await ask(
          `Is your secret number higher or lower than my guess?... H/L >_ `
        );
      } else {
        break;
      }
    }
    if (highLow.toUpperCase() === "H") {
      console.log(`You need to guess higher than ${computerGuess}`);
      min = computerGuess;
    } else if (highLow.toUpperCase() === "L") {
      console.log(`You need to guess lower than ${computerGuess}`);
      max = computerGuess;
    }
    computerGuess = Math.round((max + min) / 2);
    guessCounter++;
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  //guessing game where human tries to guess number picked by computer
  async function humanGuessingGame() {
    //variable and function declarations for humanGuessingGame
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
      max = await ask(`
      Before we start the guessing game, what number would you like to be the 
      maximum in the guessing range? Enter a number of your choosing, or N for 
      default value of 100: `);
      if (max.toUpperCase() === "N") {
        max = 100;
      } else if (isNaN(max)) {
        console.log("\nPlease choose a valid integer.");
        max = undefined;
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
}
