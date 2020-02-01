console.log("timer.js linked");
// Timer functionality 

var time = document.getElementById('timerButton');
var start = document.getElementById('timerButton');
// var pause = document.getElementById('pause');
var stop = document.getElementById('timerButton');
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;
// addedTime is a decimal / float so that we could see the fractional changes
var addedSeconds = 0,
    addedMinutes = 0,
    addedHours = 0,
    addedTime = 0.01,
    newTime = 0;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    time.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

$("#timerButton").on("click", function (event) {
    event.preventDefault();
    $("#timerButton").empty().append("Stop");
    clearTimeout(t);
    timer();
    console.log("Start");
});

// $("#timerButton").on("click", function () {
//   clearTimeout(t);
//   $("#timerButton").empty().append("Start");
// });

$("#timerButton").on("click", function () {

    console.log("seconds: " + seconds + " minutes: " + minutes + " hours: " + hours);
    //send the values to go get added
    add(hours, minutes, seconds);
    //console.log("stop");
    $("#timerButton").empty().append("Start");
    clearInterval(t);
    time.textContent = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
});