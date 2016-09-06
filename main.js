
var Game = require("./game.js");

var GameController = new Game();

GameController.selectWord();
console.log(GameController.getSecretWord().displaytext);
GameController.selectWord();
console.log(GameController.getSecretWord().displaytext);
GameController.selectWord();
console.log(GameController.getSecretWord().displaytext);