var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Check if the key is pressed for starting the game
$(document).keypress(function() {
  // It checks if the game is started
  if (!started) {
    // Set heading text to current level
    $("#level-title").text("Level " + level);
    // start the sequence
    nextSequence();
    started = true;
  }
});

// Check if a button is pressed
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  // Add the color of the pressed button
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // After a user has clicked and chosen their answer,
  // passes in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    // Check if the most recent user answer is the same as the game pattern.
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      // Check if the user got the most recent answer right
      if (userClickedPattern.length === gamePattern.length){

        // Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playSound("wrong");
      $("body").addClass("game-over");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      // reset the starting values
      startOver();
    }

}

function nextSequence() {

  // reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
