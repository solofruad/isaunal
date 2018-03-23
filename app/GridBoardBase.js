var BoardBase = require("./BoardBase.js")

module.exports = {
	BoardBase.call(this);

    // Board Interface

    getHoleCount: function(){
        return holes.length;
    };
    hasValidHole: function(holeId){
        return holes[holeId] !== undefined;
    };
    hasEmptyHole: function(holeId){
        return holes[holeId] === false;
    };
    hasPeg: function(holeId){
        return holes[holeId] === true;
    };

    setHoleState: function(holeId, stateUndefinedOrFlaseOrTrue){
        if(holeId >= 0 && holeId < holes.length){
            holes[holeId] = typeof(stateUndefinedOrFlaseOrTrue) == "boolean" ? stateUndefinedOrFlaseOrTrue : undefined;
        }
    };
    getHoleState: function(holeId){
        return holes[holeId];
    };
    setPegExists: function(holeId, peg){
        if(this.hasValidHole(holeId)){
            holes[holeId] = peg === true;
        }
        return this;
    };
}