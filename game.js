Game = function() {

	/* Private Variables */
	var secretWord;
	var wordList = [
		{displaytext: "dog"},
		{displaytext: "cat"},
		{displaytext: "bat"},
		{displaytext: "rat"}
	];

	/**
	 * getSecretWord()
	 *
	 * A getter method for the Game Object's secretWord Object
	 * @return {Object} the Word Object
	 */
	this.getSecretWord = function() {
		return secretWord;
	}
	
	/**
	 * selectWord()
	 *
	 * This method randomly selects one of the Word objects from
	 * an internal list, and assigns it as the secretWord.
	 */
	this.selectWord = function() {
		secretWord = wordList[getRandomInt(0, wordList.length)];
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
}

module.exports = Game;