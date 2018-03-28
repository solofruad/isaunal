module.exports = 
 {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    var left = opt.paddingLeft;
    var top = opt.paddingTop;
    var holeSpanX = opt.holeSpanX;
    var holeSpanY = opt.holeSpanY;
    var holeRadius = opt.holeRadius;
    var pegRadius = opt.pegRadius;

    // Invalid Holes
    if(drawInvalidHoles){
        board.eachHole(function(holeId){
            if(!board.hasValidHole(holeId)){
                var holeX = left + board.getHoleLayoutPositionX(holeId) * holeSpanX;
                var holeY = top  + board.getHoleLayoutPositionY(holeId) * holeSpanY;
                ctx.beginPath();
                ctx.moveTo(holeX-pegRadius, holeY);
                ctx.lineTo(holeX+pegRadius, holeY);
                ctx.moveTo(holeX, holeY-pegRadius);
                ctx.lineTo(holeX, holeY+pegRadius);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }, true);
    }
    // Hole
    board.eachHole(function(holeId){
        var holeX = left + board.getHoleLayoutPositionX(holeId) * holeSpanX;
        var holeY = top  + board.getHoleLayoutPositionY(holeId) * holeSpanY;
        ctx.beginPath();
        ctx.arc(holeX, holeY, holeRadius, 0, Math.PI*2, false);
        if(draggingPeg && holeId == draggingPeg.getDstHoleId() && board.canMoveFromTo(draggingPeg.getHoleId(), holeId)){
            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;
        }
        else{
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
        }
        ctx.stroke();
    });

    // Peg
    board.eachHole(function(holeId){
        if(board.hasPeg(holeId)){
            var pegX = left + board.getHoleLayoutPositionX(holeId) * holeSpanX;
            var pegY = top  + board.getHoleLayoutPositionY(holeId) * holeSpanY;
            if(draggingPeg && holeId == draggingPeg.getHoleId()){
                pegX += draggingPeg.getDeltaX();
                pegY += draggingPeg.getDeltaY();
            }
            ctx.beginPath();
            ctx.arc(pegX, pegY, pegRadius, 0, Math.PI*2, false);
            ctx.fillStyle = "black";
            ctx.fill();
        }
    });

}