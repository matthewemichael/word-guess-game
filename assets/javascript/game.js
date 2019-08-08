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
  "GREAT SMOKY MOUNTAINS",
  "ARCHES",
  "BRYCE CANYON",
  "CARLSBAD CAVERNS",
  "CRATER LAKE",
  "DEATH VALLEY",
  "DENALI",
  "JOSHUA TREE",
  "CAPITOL REEF",
  "CANYON LANDS",
  "BADLANDS",
  "BIG BEND",
  "SEQUOIA",
  "BISCAYNE",
  "SHENANDOAH",
  "HOT SPRINGS",
  "MOUNT RANIER",
  "SAGUARO",
  "KINGS CANYON",
  "EVERGLADES",
  "MESA VERDE",
  "REDWOOD"
];

var maxTries = 7;
var guessedLetters = [];
var guessingWord = [];
var usedGuessingwWords = [];
var wordToMatch;
var numGuess;
var wins = 0;

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
  var foundLetter = false

  // Search string for letter
  for (var i=0; i < wordToMatch.length; i++) {
    if (letter === wordToMatch[i]) {
      guessingWord[i] = letter
      foundLetter = true
      // If guessing word matches random word
      if (guessingWord.join("") === wordToMatch) {
        // Increment # of wins and add word to usedGuessingWords
        wins++
        endRound()
        updateDisplay()
        setTimeout(resetGame, 300);
      }
    }
  }
  if (foundLetter === false) {
    // Check if inccorrect guess is already on the list
    if (guessedLetters.includes(letter) === false) {
      // Add incorrect letter to guessed letter list
      guessedLetters.push(letter)
      // Decrement the number of remaining guesses
      numGuess--
    }
    if (numGuess === 0) {
      // Display word before reseting game
      endRound()
      guessingWord = wordToMatch.split()
      setTimeout(resetGame, 1000);
    }
  }
  updateDisplay()
}

function endRound() {
  usedGuessingwWords.push(wordToMatch);
}

//Reset the game
function resetGame() {
  numGuess = maxTries

  // Get a new word
  wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase()
  console.log(wordToMatch)
  console.log(usedGuessingwWords)
  // If new word has already been used randomly select another - !!freaks out after all options have been played!!
  if (usedGuessingwWords.includes(wordToMatch) === true && (usedGuessingwWords !== possibleWords))  {
    resetGame()
    console.log(wordToMatch)
  }

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
      guessingWord.push("_")
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
