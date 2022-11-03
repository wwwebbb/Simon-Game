var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 1;
var started = false;

$(document).keydown(() => {
  if (!started) {
    $("h1").text(`Level ${level}`).removeClass("text-animation");
    nextSequence();
    started = true;
  }
});

//Automated Next Sequence function
function nextSequence() {
  //Reset userClickedPattern and update the level
  userClickedPattern = [];
  $("h1").text(`Level ${level++}`);

  //Uses 0-3 value to determine color from 'buttonColors' array to push into "gamePattern" array
  var randomChosenColor = buttonColors[Math.round(Math.random() * 3)];
  gamePattern.push(randomChosenColor);

  //Animate randomly chosen color using jQuery
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//User Click
$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1, userChosenColor);
  animatePress(userChosenColor);
});

//Check answer function
function checkAnswer(currentLevel, clickColor) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    playSound(clickColor);
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
    //Game over
  } else {
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1")
      .text("Game Over, Press Any Key to Restart")
      .addClass("text-animation");
    startOver();
  }
}

//Sound Function
function playSound(name) {
  new Audio(`sounds/${name}.mp3`).play();
}

//Animation Function
function animatePress(currentColor) {
  $(`.${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`.${currentColor}`).removeClass("pressed");
  }, 100);
}

//Game reset function
function startOver() {
  level = 1;
  started = false;
  gamePattern = [];
}
