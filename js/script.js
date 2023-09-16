//The unordered list where the player’s guessed letters will appear.
const letterGuesses = document.querySelector(".guessed-letters");

//The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");

//The text input where the player will guess a letter.
const guessForm = document.querySelector(".guess-form");

//The empty paragraph where the word in progress will appear.
const wordProgress = document.querySelector(".word-in-progress")

//The paragraph where the remaining guesses will display.
const remaining = document.querySelector(".remaining");

//The span inside the paragraph where the remaining guesses will display.
const displayGuesses = document.querySelector("span");

//The empty paragraph where messages will appear when the player guesses a letter.
const guessMessage = document.querySelector(".message");

//The hidden button that will appear prompting the player to play again
const playAgain = document.querySelector(".play-again");

//placeholder word
let word = "";

//emtpy array where the guesses from the players go
let guessedLetters = [];

//sets the initial number of guesses
let remainingGuesses = 8;

//GLOBAL VARIABLES END HERE

//function the grabs a random word from a list to guess
const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
  // console.log(data);
  //this splits the data (words) into an array so that we can then grab a random word
    const wordArray = words.split("\n");
  //Get a random index from the wordArray
    const randomIndex = Math.floor(Math.random() * wordArray.length);
  // Get a random word and trim it to remove whitespace
     word = wordArray[randomIndex].trim()
    console.log(word);  //this will show the word in the console, which ruins the game!
     wordUpdater(word);
}
//getWord(); this moves to after the wordUpdater function and gets called there instead


//placeholder function that splits the array of magnolia into letters and then turns those into bullet points
const wordUpdater = function (word) {
    const letters = word.split('');
    const displayWord = letters.map(function(letter) {
        return "●";
   // word.join();
    }).join('');
   wordProgress.innerText = displayWord;
}
//wordUpdater(word);  //this moves up to into at the bottom of the getWord function
getWord();


//event listener for when folks click on the guess button - it should show the value of what is typed in the console
guessButton.addEventListener("click", function (e) {
   e.preventDefault();
   const inputField = document.querySelector(".guess-form input");
   const inputValue = inputField.value;
 
   //this empties the text of the message element
   guessMessage.innerText = "";

   //Clear the input field
   inputField.value = "";
     
   //calls upon the validator to check and log it out to the console
   const theGuess = guessChecker(inputValue);
   //checks the the guess is actually something that is accepted here
   if (theGuess !== undefined) { 
    makeGuess(theGuess);
   }
});

//function to validate/check the player's guess
const guessChecker = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        guessMessage.innerText = `Hey, you need to enter a letter!`;
    } else if (input.length > 1) {
        guessMessage.innerText =`Oh dear, you can only enter one letter as a guess!`;
    } else if (!input.match(acceptedLetter)) {
        guessMessage.innerText = `It's only possible to enter a letter!`;
    } else {
        return input;
    }
};

//function that deals with the letters being added to the array of gusses
const makeGuess = function (letter) {
     //convert the input letter to uppercase
     letter = letter.toUpperCase();
    if(guessedLetters.includes(letter)) {
        guessMessage.innerText = `You already guessed ${letter}, please try again!`;
    } else {
        guessMessage.innerText = `Guess ${letter} was added to your guesses.`;
        guessedLetters.push(letter);
        console.log(guessedLetters);
        //call player guess to update the remaining guesses
        playerGuess(letter);
        updateLetters();
        theProgress(guessedLetters);
    }
};

//function that creates the list of guesses
const updateLetters = function () {
    //clear the existing content of letterGusses
  letterGuesses.innerHTML = "";
  guessedLetters.forEach(function (letter) {
    const li = document.createElement("li");
    //set the text content of the <li> element
    li.innerHTML = letter;
    //append the <li" to the letterGuesses element
     letterGuesses.append(li);
  }) 
};

//function that updates the word in progress on the screen
const theProgress = function(guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
   let updatedWord = "";

        for (const letter of wordArray) {
            if (guessedLetters.includes(letter)) {
                updatedWord += letter;
            } else {
                updatedWord += "●";
            }
        }
        wordProgress.innerText = updatedWord;
        playerWon(updatedWord);
};


//function that keeps track of the number of guesses
const playerGuess = function (guess) {
   const wordUpper = word.toUpperCase();
       if (wordUpper.includes(guess)) {
          guessMessage.innerText = `Correct, ${guess} is in the word!`;
       } else {
          guessMessage.innerText = `Sorry, ${guess} is not in the word!`;
          remainingGuesses = remainingGuesses - 1;
       } 

         // Update the displayGuesses element with the new guess count
 // displayGuesses.innerText = `${remainingGuesses} guesses`;

    if (remainingGuesses === 0) {
        guessMessage.innerText = `Sorry, game over. The word is ${word}!`;
        startOver(); //this function is called so that you can play again
    //  remaining.innerText = ``; //remove the guess number for when the game is over

    } else if (remainingGuesses === 1) { 
        displayGuesses.innerText = `1 guess`;
    }  else {
        console.log("Remaining Guesses: " + remainingGuesses); // Debugging line
       displayGuesses.innerText = `${remainingGuesses} guesses`;
    }
};

//fucntion to tell if the player won and to display a congratulatory messag
const playerWon = function (updatedWord) {
   if (updatedWord === word.toUpperCase()) {
         guessMessage.classList.add("win");
         guessMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
         startOver(); //this function is called so that you can play again
   }
};

//function to start the game over from the start!
const startOver = function () {
    //hide elements
  guessButton.classList.add("hide"); //hide the guess button
  remaining.classList.add("hide") //hide the guess number for when the game is over
  letterGuesses.classList.add("hide") //clear the unordered list where the guessed letters apppear
 
  //Show the play button again
   playAgain.classList.remove("hide"); // show the play again button
};


//event listening so that the play again button resets the game to start over
playAgain.addEventListener("click", function () {
  // Remove the "win" class from the message element
   guessMessage.classList.remove("win");

  //Clear the message text and the unordered list
   guessMessage.innerText = "";
   letterGuesses.innerHTML = "";

   //Reset the remaining guesses to the initial value (e.g., 8)
    remainingGuesses = 8;

   // Reset the guessedLetters array to an empty array
    guessedLetters = [];

    // Update the display of remaining guesses with the initial value
     displayGuesses.innerText = `${remainingGuesses} guesses`;

  //Show the Guess button
    guessButton.classList.remove("hide");

    //show the paragraph with the remaining guesses
    remaining.classList.remove("hide");

     //show the guessed letters
    letterGuesses.classList.remove("hide");

    //Hide the "Play Again" button
    playAgain.classList.add("hide");

  // Start a new game by calling the getWord() function
   getWord();
});
