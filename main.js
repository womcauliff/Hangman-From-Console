
var Game = require("./game.js");
var inquirer = require("inquirer");
var GameController = new Game(6);
GameController.buildList(
	'./possible_words.txt',
	function(err) {
		console.log("buildList callback()");
		if(err) {
			console.log(err);
			return;
		}

		GameController.selectWord(function(err) {
			console.log("selectWord callback()")
			if(err) {
				console.log(err);
				return;
			}
			console.log("word is selected. game beginning.");
			gameRound();
		});
	}
);

function gameRound() {
	console.log("gameRound()");
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
				console.log("GameController.makeGuess callback " + result);

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
						console.log("Game Over. You Lost.");
					}
					else {
						console.log(GameController.getDisplayText()
							+ "\n" + GameController.getTriesLeft() + " tries left.");
						gameRound();
					}
				}
			}
		);
	});
}