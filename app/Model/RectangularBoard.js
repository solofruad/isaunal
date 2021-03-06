var GridBoardBase = require("./GridBoardBase.js")

var RectangularBoard = function(w, h, holes){
    
    if(!holes) { holes = new Array(w*h);}
    GridBoardBase.call(this, holes);

    // Board Interface

    this.xy = function(x, y){
        if(x >= 0 && x < w && y >= 0 && y < h){
            return x + y * w;
        }
        else{
            return INVALID_HOLE_ID;
        }
    };
    this.getAdjacent = function(holeId, dir){
        if(this.hasValidHole(holeId)){
            switch(dir){
            case 0: return toX(holeId)+1 < w ? holeId+1 : INVALID_HOLE_ID;
            case 1: return toY(holeId)+1 < h ? holeId+w : INVALID_HOLE_ID;
            case 2: return toX(holeId) > 0 ? holeId-1 : INVALID_HOLE_ID;
            case 3: return toY(holeId) > 0 ? holeId-w : INVALID_HOLE_ID;
            }
        }
        return INVALID_HOLE_ID;
    };
    this.getDirCount = function(){
        return 4;
    };
    this.getHoleLayoutPositionX = function(holeId){
        return toX(holeId);
    };
    this.getHoleLayoutPositionY = function(holeId){
        return toY(holeId);
    };
    this.getLayoutSizeX = function(){
        return w-1;
    };
    this.getLayoutSizeY = function(){
        return h-1;
    };
    this.getWidth = function(){ return w;};
    this.getHeight = function(){ return h;};
    this.getSize = function(){ return Math.max(w, h);};

    // Rectangular Only

    this.fillRect = function(rectX, rectY, rectW, rectH, state){
        if(rectW <= 0 || rectH <= 0){
            return this;
        }
        var holeId = rectX + rectY * w;
        for(var yc = rectH; yc > 0; --yc){
            for(var xc = rectW; xc > 0; --xc){
                holes[holeId] = state;
                ++holeId;
            }
            holeId += w - rectW;
        }
        return this;
    };

    function toX(holeId){ return holeId % w;}
    function toY(holeId){ return Math.floor(holeId / w);}

    //return {        

        // Board Interface
        /*pullPeg: function(holeId){
            gridBoardBase.pullPeg(holeId);
        },
        eachHole: function(fun){
            gridBoardBase.eachHole(fun);
        },*/        
     /*   xy: function(x, y){
            if(x >= 0 && x < w && y >= 0 && y < h){
                return x + y * w;
            }
            else{
                return INVALID_HOLE_ID;
            }
        },
        getAdjacent: function(holeId, dir){
            if(this.hasValidHole(holeId)){
                switch(dir){
                case 0: return toX(holeId)+1 < w ? holeId+1 : INVALID_HOLE_ID;
                case 1: return toY(holeId)+1 < h ? holeId+w : INVALID_HOLE_ID;
                case 2: return toX(holeId) > 0 ? holeId-1 : INVALID_HOLE_ID;
                case 3: return toY(holeId) > 0 ? holeId-w : INVALID_HOLE_ID;
                }
            }
            return INVALID_HOLE_ID;
        },
        getDirCount: function(){
            return 4;
        },
        getHoleLayoutPositionX: function(holeId){
            return toX(holeId);
        },
        getHoleLayoutPositionY: function(holeId){
            return toY(holeId);
        },
        getLayoutSizeX: function(){
            return w-1;
        },
        getLayoutSizeY: function(){
            return h-1;
        },
        getWidth: function(){ return w;},
        getHeight: function(){ return h;},
        getSize: function(){ return Math.max(w, h);},

        // Rectangular Only

        fillRect: function(rectX, rectY, rectW, rectH, state){
            if(rectW <= 0 || rectH <= 0){
                return this;
            }
            var holeId = rectX + rectY * w;
            for(var yc = rectH; yc > 0; --yc){
                for(var xc = rectW; xc > 0; --xc){
                    holes[holeId] = state;
                    ++holeId;
                }
                holeId += w - rectW;
            }
            return this;
        },

        toX: function(holeId){ return holeId % w;},
        toY: function(holeId){ return Math.floor(holeId / w);}
    };*/
}

module.exports = RectangularBoard;