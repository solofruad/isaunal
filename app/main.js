var createGameBox = require("./Control/CreateGameBox.js");
var $ = require("jquery");

window.INVALID_HOLE_ID = -1;
window.INVALID_DIR = -1;   

$(document).ready(function() {
	$("#gameBoard").append(createGameBox({}))
});