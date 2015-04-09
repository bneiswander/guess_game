/* Need to 
1. let user know if they are warmer or cooler based on 
previous response
2. get layout alignment correct
3. not allow empty submissions
4. transition animations 
5. disable form submission after game over instead of .hide()
6. Space between guesses in []
7. have buttons stop being stuck down
8. set minimum width for hint button
9. Refactor
*/
var randomNumber,
	guesses = [];
	guessesLeft = 5,
	won = false;

var randomGenerator = function(){
	randomNumber = Math.floor(Math.random() * 100);
}
var feedbackUpdate = function(hotCold, highLow, color){
	$("#feedback").text("You are " + hotCold + ", guess " + highLow);
	$(".jumbotron").animate({backgroundColor: color}, "slow");
}
var guessLeftUpdate = function(left){
	var updateColor = function(color){
		$("#guesses_Left").animate({backgroundColor: color}, "slow");
	}
	if(left == 4){
		updateColor("#D5DFDC");
	}
	if(left == 3){
		updateColor("#B1B8B6");
	}
	if(left == 2){
		updateColor("#8C9290");
	}
	if(left == 1){
		updateColor("#4F5251");
		$("#guesses_Left").css("color", "white");

	}
	if(left == 0){
		updateColor("black");
	}
}

//Initialize Game
randomGenerator();


$(document).ready(function(){
	//Set Guesses Left and Answer in HTML
	$("#guesses_Left").text(guessesLeft);
	$("#Answer").text(randomNumber).hide();

	//Hint Handler
	$("#Hint").on("click", function(){
		$("#Answer").toggle();
		$(this).blur();
	});

	//New Game Handler
	$("#NewGame").on("click", function(){
		location.reload();
		$(this).blur();
	});

	//Form Submission
	$("form").submit(function(event){
		var guessValue = $("#yourGuess").val();
		//Prevent page reload
		event.preventDefault();
		$("#Submit").blur();
		//Empty submit, Game Over, Won
		if(guessValue == "" || guessesLeft == 0 || won){
			return;
		}
		//Check for previous guess
		for(var i = 0; i < guesses.length; i++){
			if(guesses[i] == (" " + guessValue)){ 
				$("#feedback").text("You already guessed that!");
				return;
			}	
		}
		//Add guess to guesses, update prompt
		guesses.push(" " + guessValue);
		$("#prompt").text(guesses);
		//Decrement guessesLeft, update guesses_left
		guessesLeft--;
		$("#guesses_Left").text(guessesLeft);
		guessLeftUpdate(guessesLeft);

		//Correct Handler
		if(guessValue == randomNumber){
			$("#feedback").text("CORRECT! 😎");
			$(".jumbotron").animate({backgroundColor: "forestgreen"}, "slow");
			won = true;
		} 
		//Game Over Handler
		else if(guessesLeft <= 0){
			$("#feedback").text("YOU LOSE! 😱 It was " + randomNumber.toString());
			$(".jumbotron").animate({backgroundColor: "black"}, "slow");
		} 
		//Cold
		else if((guessValue - randomNumber) >= 30){
			feedbackUpdate("cold", "lower ⍗", "royalblue");
		} else if((guessValue - randomNumber) <= -30){
			feedbackUpdate("cold", "higher ⍐", "royalblue");
		} 
		//Warm
		else if((guessValue - randomNumber) < 30 &&
				(guessValue - randomNumber) >= 10){
			feedbackUpdate("warm", "lower ⍗", "darkorange");
		} else if((guessValue - randomNumber) > -30 &&
				  (guessValue - randomNumber) <= -10){
			feedbackUpdate("warm", "higher ⍐", "darkorange");
		} 
		//Hot
		else if((guessValue - randomNumber) < 10 &&
				  (guessValue - randomNumber) >= 5){
			feedbackUpdate("hot", "lower ⍗", "orangered");
		} else if((guessValue - randomNumber) > -10 &&
				  (guessValue - randomNumber) <= -5){
			feedbackUpdate("hot", "higher ⍐", "orangered");
		} 
		//Super Hot
		else if((guessValue - randomNumber) < 5 &&
				(guessValue - randomNumber) > 0){
			feedbackUpdate("🔥", "lower ⍗", "red");
		} else if((guessValue - randomNumber) > -5 &&
				  (guessValue - randomNumber) < 0){
			feedbackUpdate("🔥", "higher ⍐", "red");
		}	
	})

});