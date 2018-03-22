    function BoardBase()
    {
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
    }