
var Game = require("./game.js");

var GameController = new Game();
GameController.buildList('./possible_words.txt');

GameController.selectWord();
console.log(GameController.getSecretWord().getDisplayText());
GameController.selectWord();
console.log(GameController.getSecretWord().getDisplayText());
GameController.selectWord();
console.log(GameController.getSecretWord().getDisplayText());