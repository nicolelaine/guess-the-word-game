//The unordered list where the player’s guessed letters will appear.
const guessedLetters = document.querySelector(".guessed-letters");

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
const word = "magnolia";

//function that splits the array of magnolia into letters and then turns those into bullet points
const wordUpdater = function (word) {
    const letters = word.split('');
    const displayWord = letters.map(function(letter) {
        return "●";
    word.join();
    }).join('');
   wordProgress.innerText = displayWord;
}
wordUpdater(word);


//event listener for when folks click on the guess button - it should show the value of what is typed in the console
guessButton.addEventListener("click", function (e) {
   e.preventDefault();
   const inputField = document.querySelector(".guess-form input")
   const inputValue = inputField.value
   console.log(inputValue);

   //Clear the input field
   inputField.value = "";
});