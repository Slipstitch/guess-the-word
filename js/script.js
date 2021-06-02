//GLOBAL VARIABLES
//unordered list of guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");
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
//all the letters the player guesses
const guessedLetters = [];


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

	// empty message paragraph
	message.innerText = "";

	//type a letter in box ... variable (guess) capturing the input value
	const guess = guessInputBox.value;

	//make sure its a single letter
	const goodGuess = validateInput(guess);

	if (goodGuess) {
		makeGuess(guess);
	}
	
	guessInputBox.value = "";
    
   
});

//function to validate player's input
const validateInput = function(input) {
	const acceptedLetter = /[a-zA-Z]/;
	// input is empty
	if (input.length === 0) {
		message.innerText = "Please enter one letter!";
	// player typed in more than one letter
	} else if (input.length > 1) {
		message.innerText ="Only one letter at a time, silly!";
	// player typed a number, special character, or nonletter
	} else if (!input.match(acceptedLetter)) {
		message.innerText = "One letter from A to Z will do!"
	// player typed in a single letter
	} else {
		return input;
	}
};

// a function to capture input
const makeGuess = function (guess) {
	guess = guess.toUpperCase();
	if (guessedLetters.includes(guess)) {
		message.innerText = "You've already guessed that letter! Please try again!";
	} else {
		guessedLetters.push(guess);
		console.log(guessedLetters);
		showLettersGuessed();
		updateProgressingWord(guessedLetters);
	}
};

// function to show guessed letters

const showLettersGuessed = function () {
	//clear list
	guessedLettersElement.innerHTML = "";
	for (const letter of guessedLetters) {
	const li = document.createElement("li");
	li.innerText = letter;
	guessedLettersElement.append(li);
  }
};

// function to update the word in progress

const updateProgressingWord = function (guessedLetters) {
	const wordUpper = word.toUpperCase();
	//split word string into array 
	const wordArray = wordUpper.split("");
	const wordReveal = [];

	for (const letter of wordArray) {
		if (guessedLetters.includes(letter)) {
			wordReveal.push(letter.toUpperCase());
		} else {
			wordReveal.push("●");
		}
	}
	//console.log(wordArray);
     wordInProgress.innerText = wordReveal.join("");
     guessedWord();
	
};

// function to check if the player won

const guessedWord = function () {
	if (word.toUpperCase() ===  wordInProgress.innerText) {
		message.classList.add("win");
		message.innerHTML = `<p class="highlight">You've guessed the Correct Word! Hooray!!</p>`;
	}
};




