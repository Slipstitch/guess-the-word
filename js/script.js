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
const remainingGuessesElement = document.querySelector(".remaining");
//the span inside remaining guesses paragraph
const SpanGuesses = document.querySelector(".remaining span");
//empty paragraph messages displayed after guessing a letter
const message = document.querySelector(".message");
//hidden button play again please
const playAgainButton = document.querySelector(".play-again");


//test word
let word = "magnolia";
//all the letters the player guesses
let guessedLetters = [];
// variable for number of guesses
let remainingGuesses = 8;


//Async Function
const getWord = async function () {
	const showRequest = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
	const words = await showRequest.text();
	//transform fetched data into an array
	const wordArray = words.split("\n");
	//grab random word
	const randomIndex = Math.floor(Math.random() * wordArray.length);
	//pull out random word and remove extra white space using trim() and reassign value of existing "word" var
	word = wordArray[randomIndex].trim();
	//console.log(words);
	//call placeholder function pass variable holding random word
	updateWordInProgress(word);
};

 // call to start game
	getWord();


//a function to add a placeholder for each letter
//update word-in-progress innerText with circle symbols
const updateWordInProgress = function(word){
	//add placeholder for each letter
	const placeHolderletters = [];
	for (const letter of word) {
		//console.log(letter);
		placeHolderletters.push("●");
	}
	wordInProgress.innerText = placeHolderletters.join("");
};

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
const validateInput = function (input) {
	const acceptedLetter = /[a-zA-Z]/;
	// input is empty
	if (input.length === 0) {
		message.innerText = "Please enter one letter!";
	// player typed in more than one letter
	} else if (input.length > 1) { //player typed more than one letter
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
		//console.log(guessedLetters);
		updateGuessesRemaining(guess);
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
	//console.log(wordReveal);
     wordInProgress.innerText = wordReveal.join("");
     guessedWord();
	
};

// function to count guesses remaining
const updateGuessesRemaining = function (guess) {
	//compare letters with same casing
	const upperWord = word.toUpperCase();
	if (!upperWord.includes(guess)) {
       message.innerText = `Sorry! The word has no ${guess}!`;
       remainingGuesses -= 1;
	} else {
		message.innerText = `Great Guess! The word has the letter ${guess}!`;
	}
	if (remainingGuesses === 0) {
		message.innerHTML = `Game Over! The word was <span class="highlight">${word}</span>.`;

		startOver();

	} else if (remainingGuesses === 1 ) {
		SpanGuesses.innerText = `${remainingGuesses} guess`;
	} else {
		SpanGuesses.innerText = `${remainingGuesses} guesses`;
	}
};


// function to check if the player won
const guessedWord = function (guess) {
	if (word.toUpperCase() ===  wordInProgress.innerText) {
		message.classList.add("win");
		message.innerHTML = `<p class="highlight">You've guessed the Correct Word! Hooray!!</p>`;

		startOver();
	}
};

//Function to Hide and Show Elements
const startOver = function () {
	guessButton.classList.add("hide");
	remainingGuessesElement.classList.add("hide");
	guessedLettersElement.classList.add("hide");
	playAgainButton.classList.remove("hide");

};

//Click Event to the Play Again Button
playAgainButton.addEventListener ("click", function () {
	// reset all original values and grab a new word
	message.classList.remove("win");
	message.innerText = "";
	guessedLettersElement.innerHTML = "";
	remainingGuesses = 8;
	guessedLetters = [];
	SpanGuesses.innerText = `${remainingGuesses} guesses`;

	//new word
	getWord();

	//show UI elements
	guessButton.classList.remove("hide");
	remainingGuessesElement.classList.remove("hide");
	guessedLettersElement.classList.remove("hide");
	playAgainButton.classList.add("hide");


});








