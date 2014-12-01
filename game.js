function JSONcopy(arr) {
    return JSON.parse(JSON.stringify(arr));
}

var canvas = document.querySelector("#main");
var ctx = canvas.getContext("2d");

var width, height, cellSize, aWidth, aHeight, currGen, genCount;

function init(w, h, s) {
    width = w;
    height = h;

    cellSize = s;

    aWidth = width * cellSize;
    aHeight = height * cellSize;

    currGen = new Array(width);

    for (var i = 0; i < currGen.length; i++) {
        currGen[i] = new Array(height);
        for (var j = 0; j < currGen[i].length; j++) {
            currGen[i][j] = 0;
        }
    }

    canvas.width = width * cellSize;
    canvas.height = height * cellSize;

    var gridCanvas = document.querySelector("#gcanv");
    gridCanvas.width = canvas.width;
    gridCanvas.height = canvas.height;

    var gCtx = gridCanvas.getContext("2d");

    gCtx.strokeStyle = "#ccc";

    for (var i = 0; i < aWidth; i += cellSize) {
        gCtx.beginPath();
        gCtx.moveTo(i, 0);
        gCtx.lineTo(i, aHeight);
        gCtx.stroke();
    }

    for (var i = 0; i < aHeight; i += cellSize) {
        gCtx.strokeStyle = "#ccc";
        gCtx.beginPath();
        gCtx.moveTo(0, i);
        gCtx.lineTo(aWidth, i);
        gCtx.stroke();
    }
    
    genCount = 0;

    drawAll();
}

function drawCell(x, y, alive) {
    if (alive === 1) {
        ctx.fillStyle = "black";
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    } else {
        ctx.fillStyle = "white";
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
}

function drawAll() {
    for (var i = 0; i < currGen.length; i++) {
        for (var j = 0; j < currGen[i].length; j++) {
            drawCell(i, j, currGen[i][j]);
        }
    }
}

var offsets = [
    [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
];

function neighbors(x, y) {
    var count = 0;

    for (var i = 0; i < offsets.length; i++) {
        var offsetx = x + offsets[i][0];
        var offsety = y + offsets[i][1];

        if (offsetx >= 0 && offsety >= 0 && offsetx < width && offsety < height && currGen[offsetx][offsety] === 1) {
            count += 1;
        }
    }

    return count;
}

function tick() {
    var nextGen = JSONcopy(currGen);

    for (var i = 0; i < currGen.length; i++) {
        for (var j = 0; j < currGen[i].length; j++) {
            if (neighbors(i, j) == 3) {
                nextGen[i][j] = 1;
            } else if (neighbors(i, j) != 2) {
                nextGen[i][j] = 0;
            }
        }
    }

    genCount += 1;
    
    currGen = JSONcopy(nextGen);
    drawAll();
}

canvas.addEventListener("click", function(e) {
    var x = Math.ceil((e.pageX - canvas.getClientRects()[0].left) / aWidth * width);
    var y = Math.ceil((e.pageY - canvas.getClientRects()[0].top) / aHeight * height);

    if (currGen[x - 1][y - 1]) {
        currGen[x - 1][y - 1] = 0;
    } else {
        currGen[x - 1][y - 1] = 1;
    }

    drawAll();
});