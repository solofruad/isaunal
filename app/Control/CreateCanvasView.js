var drawBoardToCanvas = require("./DrawBoardToCanvas.js");
var getMouseEventPositionOnElement = require("../Utility/GetMouseEventPositionOnElement.js");

var CreateCanvasView = function(board){        
    var HOLE_SPAN = 48;
    var opt = {
        paddingLeft: HOLE_SPAN*0.5,
        paddingTop: HOLE_SPAN*0.5,
        paddingRight: HOLE_SPAN*0.5,
        paddingBottom: HOLE_SPAN*0.5,
        holeSpanX: HOLE_SPAN,
        holeSpanY: HOLE_SPAN,
        holeRadius: HOLE_SPAN*0.375,
        pegRadius: HOLE_SPAN*0.3125
    };

    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", opt.paddingLeft + board.getLayoutSizeX() * opt.holeSpanX + opt.paddingRight);
    canvas.setAttribute("height", opt.paddingTop + board.getLayoutSizeY() * opt.holeSpanY + opt.paddingBottom);

    function update()
    {
        drawBoardToCanvas(
            canvas,
            canvas.getContext("2d"),
            board,
            opt,
            draggingPeg);
    }

    //
    // Board
    //

    function move(fromId, toId)
    {
        if(board.movePeg(fromId, toId)){                
            update();
            fireBoardMovedEvent();
        }
    }        
    function fireBoardMovedEvent()
    {
        var ev = document.createEvent("HTMLEvents");
        ev.initEvent("boardmoved", true, false);
        canvas.dispatchEvent(ev);
    }

    //
    // Input
    //

    var draggingPeg = null;
    function DraggingPeg(holeId, initialMousePos)
    {
        var deltaPos = {x:0, y:0};
        var dstHoleId = INVALID_HOLE_ID;

        this.getHoleId = function() { return holeId;};
        this.setMousePosition = function(pos, dstId) {
            deltaPos.x = pos.x - initialMousePos.x;
            deltaPos.y = pos.y - initialMousePos.y;
            dstHoleId = dstId;
        };
        this.getDeltaX = function(){ return deltaPos.x;};
        this.getDeltaY = function(){ return deltaPos.y;};
        this.getDstHoleId = function(){ return dstHoleId;};
    }

    function mousePosToHoleId(xy, includingInvalidHoles)
    {
        return board.findHoleAtPosition(
            (xy.x - opt.paddingLeft) / opt.holeSpanX,
            (xy.y - opt.paddingTop) / opt.holeSpanY,
            undefined,
            includingInvalidHoles);
    }

    function PlayingMode()
    {
        this.leaveMode = function()
        {
            this.onMouseLeave();
        };
        this.onMouseDown = function(ev)
        {
            var pos = getMouseEventPositionOnElement(canvas, ev);
            var holeId = mousePosToHoleId(pos);
            if(board.hasPeg(holeId)){
                draggingPeg = new DraggingPeg(holeId, pos);
                update();
            }
        };
        this.onMouseMove = function(ev)
        {
            if(draggingPeg){
                var pos = getMouseEventPositionOnElement(canvas, ev);
                var holeId = mousePosToHoleId(pos);
                draggingPeg.setMousePosition(pos, holeId);
                update();
            }
        };
        this.onMouseUp = function(ev)
        {
            if(draggingPeg){
                var dstHoleId = draggingPeg.getDstHoleId();
                if(board.hasEmptyHole(dstHoleId)){
                    move(draggingPeg.getHoleId(), dstHoleId);
                }
                draggingPeg = null;
                update();
            }
        };
        this.onMouseLeave = function(ev)
        {
            if(draggingPeg){
                draggingPeg = null;
                update();
            }
        };
    }
        
    var modeObj = new PlayingMode();
    var modeName = "Playing";
    function setMode(modeStr)
    {
        var modeCtor = PlayingMode;
        modeObj.leaveMode();
        modeObj = new modeCtor();
        modeName = modeStr;
        update();
    }
    function getMode()
    {
        return modeName;
    }


    function onMouseDown(ev){ modeObj.onMouseDown(ev);}
    function onMouseMove(ev){ modeObj.onMouseMove(ev);}
    function onMouseUp(ev){ modeObj.onMouseUp(ev);}
    function onMouseLeave(ev){ modeObj.onMouseLeave(ev);}
    function onTouchStart(ev)
    {
        onMouseDown(ev.touches[0]);
        ev.preventDefault();
    }
    function onTouchMove(ev)
    {
        onMouseMove(ev.touches[0]);
        ev.preventDefault();
    }
    function onTouchEnd(ev)
    {
        onMouseUp();
        ev.preventDefault();
    }

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mousemove", onMouseMove, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseleave", onMouseLeave, false);
    canvas.addEventListener("touchstart", onTouchStart, false);
    canvas.addEventListener("touchmove", onTouchMove, false);
    canvas.addEventListener("touchend", onTouchEnd, false);

    // Public Interface

    canvas.pegsolitaire = {
        update: update,            
        board: board,
        setMode: setMode,
        getMode: getMode
    };

    update();
    return canvas;
}  

module.exports = CreateCanvasView;