var GridBoardBase = require("./GridBoardBase.js")

var BoardBase = function(){
    
    this.pushPeg = function(holeId){
        this.setPegExists(holeId, true);
        return this;
    };
    this.pullPeg = function(holeId){
        this.setPegExists(holeId, false);
        return this;
    };
    this.movePeg = function(fromId, toId){
        if(this.hasPeg(fromId) && this.hasEmptyHole(toId)){
            var dir = this.getDirFromToDist2(fromId, toId);
            if(dir != INVALID_DIR){
                var nextId = this.getAdjacent(fromId, dir);
                var nextNextId = this.getAdjacent(nextId, dir);
                if(this.hasPeg(nextId)){
                    this.pullPeg(fromId);
                    this.pullPeg(nextId);
                    this.pushPeg(nextNextId);
                    return true;
                }
            }
        }
        return false;
    };        

    this.canMoveFromTo = function(fromId, toId){
        if(this.hasPeg(fromId) && this.hasEmptyHole(toId)){
            return this.hasPeg(
                this.getAdjacent(fromId,
                                 this.getDirFromToDist2(fromId, toId)));
        }
        return false;
    };        
    this.getDirFromToDist2 = function(fromId, toId){
        if(this.hasValidHole(fromId) && this.hasValidHole(toId)){
            for(var dir = 0; dir < this.getDirCount(); ++dir){
                var nextNextId = this.getAdjacent(this.getAdjacent(fromId, dir), dir);
                if(nextNextId == toId){
                    return dir;
                }
            }
        }
        return INVALID_DIR;
    };
    this.findHoleAtPosition = function(x, y, r, includingInvalidHoles){
        if(!r){ r = 0.5;}
        var count = this.getHoleCount();
        for(var id = 0; id < count; ++id){
            if(includingInvalidHoles || this.hasValidHole(id)){
                var dx = this.getHoleLayoutPositionX(id) - x;
                var dy = this.getHoleLayoutPositionY(id) - y;
                if(dx*dx+dy*dy < r*r){
                    return id;
                }
            }
        }
        return INVALID_HOLE_ID;
    };      
    this.eachHole = function(fun, includingInvalidHoles){
        var holeCount = this.getHoleCount();
        for(var id = 0; id < holeCount; ++id){
            if(includingInvalidHoles || this.hasValidHole(id)){
                fun(id);
            }
        }
    };
}

module.exports = BoardBase;