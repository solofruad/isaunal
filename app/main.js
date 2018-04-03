var createGameBox = require("./Control/CreateGameBox.js");
var $ = require("jquery");

window.INVALID_HOLE_ID = -1;
window.INVALID_DIR = -1;   

$(document).ready(function() {
	var URL= window.location;
    var d = document.getElementById("reset"); 
    d.setAttribute("href", URL); 
	$("#gameBoard").append(createGameBox({}));
});