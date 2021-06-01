//GLOBAL VARIABLES
//unordered list of guessed letters
const guessedLetters = document.querySelector(".guessed-letters");
//the button that says "guess"
const guessButton = document.querySelector(".guess");
//text input box where player guesses a letter
const guessInputBox = document.querySelector(".letter");
//paragraph where word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");
//paragraph where remaining guesses are displayed
const remainingGuesses = document.querySelector(".remaining");
//the span inside remaining guesses paragraph
const SpanGuesses = document.querySelector("span");
//empty paragraph messages displayed after guessing a letter
const message = document.querySelector(".message");
//hidden button play again please
const playAgainButton = document.querySelector(".play-again");
//test word
const word = "magnolia";


//a function to add a placeholder for each letter
//update word-in-progress innerText with circle symbols
const updateWordInProgress = function(word){
	//add placeholder for each letter
	const placeHolderletters = [];
	for (const letter of word) {
		console.log(letter);
		placeHolderletters.push("●");
	}
	wordInProgress.innerText = placeHolderletters.join("");
};
updateWordInProgress(word);

//an event listener for the Guess button
guessButton.addEventListener ("click", function (e) {
	// prevent default reloading behavior
	e.preventDefault();
	//type in a letter in box
	const guessLetter = guessInputBox.value;
	console.log(guessLetter);
	guessInputBox.value = "";
});


//guessed letter append to end of list
//update paragraphs innerText