//initial setup
var numberOfSquares = 6;
var colors = [];
var answer; //picked color

//select all the squares
var squares = document.querySelectorAll(".square");
var display = document.querySelector("#question");
display.textContent = answer;
var resetButton = document.querySelector("#reset");
var gameModes = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  //loop thru the two mode buttons and then add event listeners
  for(var i = 0; i < gameModes.length; i++) {
    //for the background color of the button when clicked
    gameModes[i].addEventListener("click", function(){
      gameModes[0].classList.remove("selected");
      gameModes[1].classList.remove("selected");
      this.classList.add("selected");
      //check which button it is
      if(this.textContent === "Easy") {
        numberOfSquares = 3;
      } else {
        numberOfSquares = 6;
      }
      reset();
    });
  }
}

function setupSquares() {
  //loop througth the squares and add add Event Listeners
  for(var i = 0; i < squares.length; i++) {
    //add an event to each square
    squares[i].addEventListener("click", function(){
      var chosen = this.style.backgroundColor;
      if(chosen === answer){
        //if correct, set the text "Correct" in the white stripe
        document.querySelector("#message").textContent = "Correct!";
        //set the reset button to say "Play Again" which is basically new color
        resetButton.textContent = "Play Again";
        changeColors(chosen);
        //change the background color of h1 to the picked color
        document.querySelector("#header").style.backgroundColor = chosen;
      } else {
        //incorrect
        document.querySelector("#message").textContent = "Incorrect, try again";
        this.style.backgroundColor = "#232323";
      }
    });
  }
}

//refactored codes
function reset() {
  //generate new colors based on the number of squares (modes)
  colors = generateRandomColor(numberOfSquares);
  //pick an answer
  answer = colorPicker();
  //set the header text for the new color
  display.textContent = answer.toUpperCase();
  //reset the text in the stripe bar
  document.querySelector("#message").textContent = "";
  //change the colors of the squares
  for(var i = 0; i < squares.length; i++) {
    //check if there is a color in the square
    if(colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  //reset the header color
  document.querySelector("#header").style.backgroundColor = "#232323";
  //set the "Play Again" text back to "New Color"
  resetButton.textContent = "New Color";
}

//reset button
resetButton.addEventListener("click", function(){
  reset();
});

/* Refactored */

// //easy mode
// easyMode.addEventListener("click", function(){
//   //when clicked, the CSS selected class will be added to the class list
//   easyMode.classList.add("selected");
//   hardMode.classList.remove("selected");
//   //generate only 3 new colors and pick one as answer
//   numberOfSquares = 3;
//   colors = generateRandomColor(numberOfSquares);
//   answer = colorPicker();
//   //change the text in the header to reflect the new picked color
//   question.textContent = answer.toUpperCase();
//   //reassign the colors to the squares
//   //the bottom three set to display "none"
//   for(var i = 0; i < squares.length; i++) {
//     if(i < 3) {
//       squares[i].style.backgroundColor = colors[i];
//     } else {
//       squares[i].style.display = "none";
//     }
//   }
// });
//
// //hard mode
// hardMode.addEventListener("click", function(){
//   hardMode.classList.add("selected");
//   easyMode.classList.remove("selected");
//   //generate 6 new colors and pick one as answer
//   numberOfSquares = 6;
//   colors = generateRandomColor(numberOfSquares);
//   answer = colorPicker();
//   //change the text in the header to reflect the new picked color
//   question.textContent = answer.toUpperCase();
//   //reassign the colors to the squares
//   //the bottom three set to display "none"
//   for(var i = 0; i < squares.length; i++) {
//     squares[i].style.backgroundColor = colors[i];
//     squares[i].style.display = "block";
//   }
// });

function changeColors(color) {
  //loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

//pick a color out of the 3 or 6 depending on modes
function colorPicker() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// numColor is the number of random colors to generate
function generateRandomColor(numColor) {
  var colors = [];
  for(var i = 0; i < numColor; i++) {
    //get a random color and push it to the colors array and then return it
    colors.push(randomColor());
  }
  return colors;
}

function randomColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  return "rgb(" + red + ", " + green + ", " + blue +")";
}
