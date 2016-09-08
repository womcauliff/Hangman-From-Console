//import Letter Object
var Letter = require("./letter.js");

Word = function (word) {
	var actualValue = word;
	var letterList = [];

	//Parses word parameter into Letter Objects,
	//adding them to internal array
	for(var i = 0; i < word.length; i++) {
		console.log(word[i]);
		letterList[letterList.length] = new Letter([word[i]]);
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
		console.log("Word.getDisplayText()");
		var displayText = "";
		for(var i = 0; i < letterList.length; i++) {
			displayText += letterList[i].getDisplayText() + " ";
		}
		return displayText;
	}
}

module.exports = Word;