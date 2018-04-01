var RectangularBoard = require("./RectangularBoard.js")

var CreateEnglishBoard = function(){
   
    var board = new RectangularBoard(7,7);
    board.fillRect(2,0,3,7, true);
    board.fillRect(0,2,7,3, true);
    board.pullPeg(board.xy(3,3));
    return board;
}    

module.exports = CreateEnglishBoard;