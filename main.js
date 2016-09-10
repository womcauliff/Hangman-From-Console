
var Game = require("./game.js");
var inquirer = require("inquirer");
var GameController = new Game();
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
		console.log(answer.letterGuess);
		gameRound();
	});
}