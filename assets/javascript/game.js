var possibleWords = [
  "GRAND CANYON", 
  "ROCKY MOUNTAIN", 
  "ZION", 
  "YELLOWSTONE", 
  "YOSEMITE", 
  "GRAND TETON", 
  "GLACIER", 
  "ACADIA", 
  "MAMMOTH CAVE", 
  "OLYMPIC", 
  "GREAT SMOKY MOUNTAINS"
];

var maxTries = 10
var guessedLetters = []
var guessingWord = []
var wordToMatch
var numGuess
var wins = 0

//Starts game
resetGame()

// Wait for key press
document.onkeydown = function(event) {
  // Make sure key pressed is an alpha character
  if (isLetter(event.key)) {
  checkForLetter(event.key.toUpperCase())
  }
}

// Check if key pressed is between A-Z or a-z
var isLetter = function(ch){
  return typeof ch === "string" && ch.length === 1
  && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}

// Check if letter is in word
function checkForLetter(letter) {
  

  // Search string for letter
  for (var i=0; i < wordToMatch.length; i++) {
    if (letter === wordToMatch[i]) {
      guessingWord[i] = letter
      
      // If guessing word matches random word
      if (guessingWord.join("") === wordToMatch) {
        // Increment # of wins
        wins++
        updateDisplay()
        resetGame()
      }
    }
    
    // Check if inccorrect guess is already on the list
    else if (guessedLetters.indexOf(letter) != -1) {
      // Add incorrect letter to guessed letter list
      guessedLetters.push(letter)
      // Decrement the number of remaining guesses
      numGuess--
    }
    if (numGuess === 0) {
      // Display word before reseting game
      guessingWord = wordToMatch.split()
      resetGame()
    }
  }
  updateDisplay()
}

//Reset the game
function resetGame() {
  numGuess = maxTries

  // Get a new word
  wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase()
  console.log(wordToMatch)

  // Reset word arrays
  guessedLetters = []
  guessingWord = []

  // Reset the guessed word
  for (var i=0; i < wordToMatch.length; i++){
    // Put a space instead of an underscore between multi-word options in possibleWords array
    if (wordToMatch[i] === " ") {
      guessingWord.push(" ")
    } 
    else {
      guessingWord.push(" _ ")
    }
  }
  updateDisplay()
}

// Update the Display
function updateDisplay () {
  document.getElementById("totalWins").innerText = wins
  document.getElementById("currentWord").innerText = guessingWord.join("")
  document.getElementById("remainingGuesses").innerText = numGuess
  document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ")
}