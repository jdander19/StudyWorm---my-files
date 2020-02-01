window.onload = function() {
    $("#pause").on("click", stop);
    // $("#reset").on("click", reset);
    $("#start").on("click", start);
  };
  var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;
var time = 0;
var lap = 1;

function reset() {

  time = 0;
  lap = 1;

  // DONE: Change the "display" div to "00:00."
  $("#display").text("00:00:00");
}
function start() {

  // DONE: Use setInterval to start the count here and set the clock to running.
  if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
  }
}
function stop() {

  // DONE: Use clearInterval to stop the count here and set the clock to not be running.
  clearInterval(intervalId);
  clockRunning = false;
}
function count() {

  // DONE: increment time by 1, remember we cant use "this" here.
  time++;

  // DONE: Get the current time, pass that into the timeConverter function,
  //       and save the result in a variable.
  var converted = timeConverter(time);
  console.log(converted);

  // DONE: Use the variable we just created to show the converted time in the "display" div.
  $("#display").text(converted);
}
function timeConverter(t) {
    var hours = 0;
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  else if (seconds === 60){
      minutes = "0" + minutes;
      seconds = "00";
  }

  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  else if (minutes === 60){
      minutes = "00";
      hours ++;
      hours = "0" + hours;
  }

  if (hours === 0){
    hours = "00";
  }

  else if (hours < 10){
      hours = "0" + hours;
  }

  return hours + ":" + minutes + ":" + seconds;
}