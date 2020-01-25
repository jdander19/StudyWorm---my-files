//TIMER
console.log("timer.js connected");

var time = document.getElementById('timer');
var start = document.getElementById('start');
var pause = document.getElementById('pause');
var stop = document.getElementById('stop');
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;
// addedTime is a decimal / float so that we could see the fractional changes
var addedSeconds = 0, addedMinutes = 0, addedHours = 0, addedTime = 0.01, newTime = 0;


function add()
{
    seconds++;
    if (seconds >= 60)
    {
        seconds = 0;
        minutes++;
        if (minutes >= 60)
        {
            minutes = 0;
            hours++;
        }
    }

    time.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer()
{
      t = setTimeout(add, 1000);
}


$("#start").on("click", function(event) {
        event.preventDefault();
        $("#start").empty().append("Start");
        clearTimeout(t);
        timer();
        console.log("Start");
    });

$("#pause").on("click", function(){
    clearTimeout(t);
    $("#start").empty().append("Start");
});

$("#stop").on("click", function() {

    console.log("seconds: " + seconds + " minutes: " + minutes + " hours: " + hours);
    //send the values to go get added
    sum(hours, minutes, seconds);
    //console.log("stop");
    $("#start").empty().append("Start");
    clearInterval(t);
    time.textContent = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;


 });
 //End of TIMER