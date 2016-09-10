Game = function(totalTries) {

	//import Word Object
	var Word = require("./word.js");

	/* Private Variables */
	var secretWord;// Word Object
	var wordList = [];//array of lines from text file
	var alphabucket = [];//stores previous guesses
	var triesLeft = totalTries;//attempts remaining

	/**
	 * buildList()
	 *
	 * Synchronously parses a given file to create Word Objects, 
	 * adding them to an internal list.
	 *
	 * @param {string} pathToFile - the relative path to a newline delimited file
	 * @param {Function} callback - a function to execute after reading file contents
	 */
	this.buildList = function(pathToFile, callback) {
		var fs = require('fs');

		fs.readFileSync(pathToFile, 'utf8').split("\n").forEach(
			function(line, index, arr) {
				if (index === arr.length - 1 && line === "") { return; }
				wordList.push(line.trim());
			}
		);

		callback(null);
	}

	/**
	 * getDisplayText()
	 *
	 * Outputs the text for a game of hangman, with blanks
	 * substituted for letters not yet correctly guessed. 
	 *
	 * @return {string} the text for a game of hangman, with blanks
	 * substituted for letters not yet correctly guessed.
	 */
	this.getDisplayText = function() {
		return secretWord.getDisplayText((this.getTriesLeft() === 0) || this.isOver());
	}
	
	/**
	 * selectWord()
	 *
	 * This method randomly selects one of the strings from
	 * an internal list, uses it to construct a Word Object,
	 * and assigns it as the secretWord.
	 *
	 * @param {Function} callback - a function to execute after selecting secret word
	 */
	this.selectWord = function(callback) {
		secretWord = new Word(wordList[getRandomInt(0, wordList.length)]);
		callback(null);
	}

	/**
	 * getRandomInt()
	 *
	 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	 * 
	 * @param {Number} min - the minimum value (inclusive) for a range of random numbers
	 * @param {Number} max - the maximum value (exclusive) for a range of random numbers
	 * @return {Number} A random integer between min (included) and max (excluded)
	 */
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	/**
	 * isNewGuess()
	 *
	 * Determines whether a user's guess has already been made in a previous round.
	 *
	 * @param {string} guess - a single letter between "a" and "z"
	 * @return {boolean} true if the latest guess has not previously been guessed
	 */
	this.isNewGuess = function(guess) {
		var charcode = guess.toUpperCase().charCodeAt();
		if(alphabucket[charcode - 65] !== true) {
			alphabucket[charcode - 65] = true;
			return true;
		}
		return false;
	}

	this.makeGuess = function(guess, callback) {

		guess = guess.toUpperCase().trim();
		//if the guess matched any of the word's letters
		if (secretWord.checkMatches(guess)) {
			callback(null, true);
		}
		//else, none of the word's letters matched the guess
		else {
			//Remove life
			triesLeft--;
			callback(null, false);
		}
	}

	this.isOver = function() {
		return secretWord.isGuessed();
	}

	this.getTriesLeft = function() {
		return triesLeft;
	}
}

module.exports = Game;