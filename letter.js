/**
 * Letter
 *
 * Represents a letter for a game of hangman.
 */
Letter = function(lettertext) {
	var guessed = false;
	var trueValue = lettertext;

	/**
	 * isGuessed()
	 *
	 * A public getter method for the boolean value which
	 * indicates whether the Letter object's hidden value
	 * has been guessed.
	 *
	 * @return {boolean} true if Letter has been guessed
	 */
	this.isGuessed = function() {
		return guessed;
	}

	/**
	 * setGuessed()
	 *
	 * A private setter method for the guessed value
	 * @param {boolean} val
	 */
	function setGuessed(val) {
		guessed = val;
	}

	/**
	 * getTrueValue()
	 *
	 * A private getter method for the Letter's text
	 * @return {boolean}
	 */
	function getTrueValue() {
		return trueValue;
	}

	/**
	 * getDisplayText()
	 *
	 * A public getter method for the letter's actual text if it 
	 * has already been guessed, otherwise returns "_"
	 *
	 * @return {string} the letter's actual text if it has already
	 * been guessed, otherwise "_"
	 */
	this.getDisplayText = function() {
		return this.isGuessed() ? trueValue : "_";
	}

	/**
	 * checkMatch()
	 *
	 * Sets the Letter object's guessed value to true if a given
	 * letter guess is a correct match for the letter's hidden value.
	 */
	this.checkMatch = function(guess) {
		//skip check if object has already been guessed
		if(!this.isGuessed()) {
			//check guess against letter object's hidden value
			if(getTrueValue() == guess) {
				setGuessed(true);
				return true;
			}
			return false;
		}
		return false;
	}
}

module.exports = Letter;