drawBoardToCanvas(canvas, ctx, board, opt, draggingPeg, drawInvalidHoles)
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

    }