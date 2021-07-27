
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var first=0;

var level=0;

$(document).keydown(function() {
    if(first===0)
    {
        first=1;
        $("h1").text("Level "+level);
        nextSequence();
    }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

    userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level++;
  $("h1").text("Level "+level);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

    var self = $("#"+currentColour);

    self.addClass("pressed");

    setTimeout(function(){
        self.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Fail");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level=0;
    gamePattern=[];
    first=0;
}