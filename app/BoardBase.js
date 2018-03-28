module.exports = {
    pushPeg : function(holeId){
        this.setPegExists(holeId, true);
        return this;
    };
    pullPeg : function(holeId){
        this.setPegExists(holeId, false);
        return this;
    };
    movePeg : function(fromId, toId){
        if(this.hasPeg(fromId) && this.hasEmptyHole(toId)){
            var dir = this.getDirFromToDist2(fromId, toId);
            if(dir != INVALID_DIR){
                var nextId = this.getAdjacent(fromId, dir);
                var nextNextId = this.getAdjacent(nextId, dir);
                if(this.hasPeg(nextId)){
                    this.pushPeg(nextNextId);
                    this.pullPeg(nextId);
                    this.pullPeg(fromId);
                    return true;
                }
            }
        }
        return false;
    };
    undoMovePeg: function(fromId, toId){
        if(this.hasEmptyHole(fromId) && this.hasPeg(toId)){
            var dir = this.getDirFromToDist2(fromId, toId);
            if(dir != INVALID_DIR){
                var nextId = this.getAdjacent(fromId, dir);
                var nextNextId = this.getAdjacent(nextId, dir);
                if(this.hasEmptyHole(nextId)){
                    this.pullPeg(nextNextId);
                    this.pushPeg(nextId);
                    this.pushPeg(fromId);
                    return true;
                }
            }
        }
        return false;
    };
    canMoveFrom: function(fromId){
            if(this.hasPeg(fromId)){
                for(var dir = 0; dir < this.getDirCount(); ++dir){
                    if(this.canMoveDir(fromId, dir)){
                        return true;
                    }
                }
            }
            return false;
        };
        tcanMoveFromTo : function(fromId, toId){
            if(this.hasPeg(fromId) && this.hasEmptyHole(toId)){
                return this.hasPeg(
                    this.getAdjacent(fromId,
                                     this.getDirFromToDist2(fromId, toId)));
            }
            return false;
        };
        canMoveDir :function(fromId, dir){
            var nextId = this.getAdjacent(fromId, dir);
            var nextNextId = this.getAdjacent(nextId, dir);
            return this.hasPeg(fromId) &&
                this.hasPeg(nextId) &&
                this.hasEmptyHole(nextNextId);
        };
        getDirFromTo : function(fromId, toId){
            for(var dir = 0; dir < this.getDirCount(); ++dir){
                var id = this.getAdjacent(fromId, dir);
                while(this.hasValidHole(id)){
                    if(id == toId){
                        return dir;
                    }
                    id = this.getAdjacent(id, dir);
                }
            }
            return INVALID_DIR;
        };
        getDirFromToDist2 : function(fromId, toId){
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
    findHoleAtPosition : function(x, y, r, includingInvalidHoles){
        if(!r){ r = 0.5;}
        var count = this.getHoleCount();
        for(var id = 0; id < count; ++id){
            if(includingInvalidHoles || this.hasValidHole(id)){
                var dx = this.getHoleLayoutPositionX(id) - x;
                var dy = this.getHoleLayoutPositionY(id) - y;
                if(dx*dx+dy*dy < r*r)
                    return id;
                
            }
        }
        return INVALID_HOLE_ID;
    };

    eachHole : function(fun, includingInvalidHoles){
        var holeCount = this.getHoleCount();
        for(var id = 0; id < holeCount; ++id){
            if(includingInvalidHoles || this.hasValidHole(id)){
                fun(id);
            }
        }
    };

}   