var createCanvasView = require("./CreateCanvasView.js");
var createEnglishBoard = require("../Model/CreateEnglishBoard.js");
var newElem = require("../Utility/NewElem.js");

var CreateGameBox = function(opt){

	var gameDiv = newElem("div");               

    // canvas            
    var newCanvas = createCanvasView(createEnglishBoard());                
    gameDiv.appendChild(newCanvas);                        
    return gameDiv;	
}

module.exports = CreateGameBox;