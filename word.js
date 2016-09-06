Word = function (word) {
	var displaytext = word;

	this.getDisplayText = function() {
		return displaytext;
	}
}

module.exports = Word;