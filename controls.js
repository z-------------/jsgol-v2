var tickInterval;

var startBtn = document.querySelector("#start");
var stopBtn = document.querySelector("#stop");
var clearBtn = document.querySelector("#clear");
var stepBtn = document.querySelector("#step");

var wInput = document.querySelector("#winput");
var hInput = document.querySelector("#hinput");
var sInput = document.querySelector("#sinput");

var genCountElem = document.querySelector("#gencount");
var popCountElem = document.querySelector("#popcount");

var randFillBtn = document.querySelector("#randfill");
var gridToggleBtn = document.querySelector("#togglegrid");

var gridCanvasElem = document.querySelector("#gcanv");

startBtn.addEventListener("click", function(){
    if (!tickInterval) {
        tickInterval = setInterval(tick, 20);
        
        this.setAttribute("disabled", "true");
        stopBtn.removeAttribute("disabled");
    }
});

stopBtn.addEventListener("click", function(){
    clearInterval(tickInterval);
    tickInterval = false;
    
    drawAll();
    
    this.setAttribute("disabled", "true");
    startBtn.removeAttribute("disabled");
});

clearBtn.addEventListener("click", function(){
    for (var i = 0; i < currGen.length; i++) {
        for (var j = 0; j < currGen[i].length; j++) {
            currGen[i][j] = 0;
        }
    }
    
    genCount = 0;
    
    drawAll();
});

wInput.oninput = hInput.oninput = sInput.oninput = function(){
    if (Number(this.value) >= Number(this.getAttribute("min")) && Number(this.value) <= Number(this.getAttribute("max"))) {
        init(Number(wInput.value), Number(hInput.value), Number(sInput.value));
    }
};

randFillBtn.addEventListener("click", function(){
    for (var i = 0; i < currGen.length; i++) {
        for (var j = 0; j < currGen.length; j++) {
            currGen[i][j] = Math.round(Math.random());
        }
    }
    
    drawAll();
});

stepBtn.addEventListener("click", function(){
    tick();
});

gridToggleBtn.addEventListener("click", function(){
    gridCanvasElem.classList.toggle("hidden");
});

init(Number(wInput.value), Number(hInput.value), Number(sInput.value));

setInterval(function(){
    // generation count
    genCountElem.textContent = "Generation " + genCount.toString();
    
    // population count
    var matches = currGen.toString().match(new RegExp("1", "g"));
    if (matches !== null) {
        popCountElem.textContent = "Population " + matches.length;
    } else {
        popCountElem.textContent = "Population 0";
    }
}, 100);