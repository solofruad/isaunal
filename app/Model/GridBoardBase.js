var BoardBase = require("./BoardBase.js")


var GridBoardBase = function(holes){
    
    BoardBase.call(this);

    // Board Interface

    this.getHoleCount = function(){
        return holes.length;
    };
    this.hasValidHole = function(holeId){
        return holes[holeId] !== undefined;
    };
    this.hasEmptyHole = function(holeId){
        return holes[holeId] === false;
    };
    this.hasPeg = function(holeId){
        return holes[holeId] === true;
    };

    this.setPegExists = function(holeId, peg){
        if(this.hasValidHole(holeId)){
            holes[holeId] = peg === true;
        }
        return this;
    };
}

module.exports = GridBoardBase;