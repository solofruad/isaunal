var BoardBase = require("./BoardBase.js")

var GridBoardBase = function(holes){
    BoardBase.call(this);
    
    return {        

        // Board Interface

        getHoleCount : function(){
            return holes.length;
        },
        hasValidHole : function(holeId){
            return holes[holeId] !== undefined;
        },
        hasEmptyHole : function(holeId){
            return holes[holeId] === false;
        },
        hasPeg : function(holeId){
            return holes[holeId] === true;
        },
        setPegExists : function(holeId, peg){
            if(this.hasValidHole(holeId)){
                holes[holeId] = peg === true;
            }
            return this;
        };
    }
}

module.exports = GridBoardBase;