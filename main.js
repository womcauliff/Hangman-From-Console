
var Game = require("./game.js");
var inquirer = require("inquirer");
var GameController = new Game(6);
GameController.buildList(
	'./possible_words.txt',
	function(err) {
		if(err) {
			console.log(err);
			return;
		}

		GameController.selectWord(function(err) {
			if(err) {
				console.log(err);
				return;
			}
			console.log(
				"=== HANGMAN ===\n"
				+ "  ______    \n |      |    \n |           \n |           \n |           \n |           \n_|_________  "
				+ "\n\nWORD: " + GameController.getDisplayText()
			);
			gameRound();
		});
	}
);

function gameRound() {
	inquirer.prompt([
		{
			name: "letterGuess",
			message: "Guess a letter:",
			type: "input",
			validate: function(value) {
				if (value.length !== 1) {
					console.log("\nPlease enter a single letter as your guess.");
					return false;
				}
				else if (!/[a-zA-Z]/.test(value)) {
					console.log("\nPlease enter a letter from the alphabet as your guess.");
					return false;
				}
				else if(!GameController.isNewGuess(value)) {
					console.log("\nYou have already guessed " + value 
						+ "\nPlease guess a different letter.");
					return false;
				}
				return true;
			}
		}
	]).then(function (answer){

		//make guess to Game
		//Game tells Word to check all Letters
		//if no matches found, then game removes life
		//if match is found, Game checks if Word is guessed, thus game is over


		GameController.makeGuess(
			answer.letterGuess,
			function(err, result) {
				if(err) {
					console.log(err);
					return;
				}

				// guess was successful
				if(result == true) {
					if(GameController.isOver()) {
						console.log(GameController.getDisplayText()
							+ "\nYou Win! ");
					}
					else {
						console.log(GameController.getDisplayText());
						gameRound();
					}
				}
				//guess was unsuccessful
				else {
					if(GameController.getTriesLeft() == 0) {
						console.log(
							"  ______    \n |      |    \n |      0    \n |     /|\\  \n |     / \\  \n |           \n_|_________  "
							+ "\n\nWORD: " + GameController.getDisplayText()
							+ "\nGame Over. Try Again?");
					}
					else {

						var outputString = "";							
						switch(GameController.getTriesLeft()) {
							case 1:
								outputString += "  ______    \n |      |    \n |      0    \n |     /|\\  \n |     /     \n |           \n_|_________  "
								break;
							case 2:
								outputString += "  ______    \n |      |    \n |      0    \n |     /|\\  \n |           \n |           \n_|_________  "
								break;
							case 3:
								outputString += "  ______    \n |      |    \n |      0    \n |     /|    \n |           \n |           \n_|_________  "
								break;
							case 4:
								outputString += "  ______    \n |      |    \n |      0    \n |      |    \n |           \n |           \n_|_________  "
								break;
							case 5:
								outputString += "  ______    \n |      |    \n |      0    \n |           \n |           \n |           \n_|_________  "
								break;
						}
						outputString += "\n\nWORD: " + GameController.getDisplayText();
						console.log(outputString);
						gameRound();
					}
				}
			}
		);
	});
}