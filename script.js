// Scores for each player
var scores, roundScores, activePlayer, gamePlaying;
init();

document
  .querySelector(".btn--roll")
  .addEventListener("click", function (event) {
    //Check if the game is playing
    if (gamePlaying) {
      //Generating random number
      var dice = Math.floor(Math.random() * 6) + 1;

      //Display the result
      var diceDOM = document.querySelector(".dice");
      diceDOM.style.display = "block";
      diceDOM.src = "dice-" + dice + ".png";

      //Update the round score only if the rolled number was not 1
      if (dice !== 1) {
        //Add score
        //roundScores += dice;
        scores[activePlayer] += dice;
        if (scores[activePlayer] >= 100) {
          endGame();
          return;
        }
        document.querySelector("#score--" + activePlayer).textContent =
          scores[activePlayer];
        //Update current dice
        document.querySelector("#current--" + activePlayer).textContent = dice;
      } else {
        //Update the activePlayer
        nextPlayer();
      }
    }
  });

document.querySelector(".btn--hold").addEventListener("click", function () {
  //Check if the game is playing
  if (gamePlaying) {
    //Update the UI
    document.querySelector("#score--" + activePlayer).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      endGame();
      return;
    }
    //Next Player
    nextPlayer();
  }
});

function nextPlayer() {
  //scores[activePlayer] = roundScores;
  activePlayer = activePlayer == 0 ? 1 : 0;
  //roundScores = 0;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
  document.querySelector(".dice").style.display = "none";
}

function endGame() {
  gamePlaying = false;
  document.querySelector("#score--" + activePlayer).textContent =
    scores[activePlayer];
  document.querySelector("#name--" + activePlayer).textContent = "Winner!";

  document.querySelector(".player--0").classList.remove("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.querySelector(".dice").style.display = "none";
  document
    .querySelector(".player--" + activePlayer)
    .classList.add("player--winner");

  document.querySelector(".player--" + activePlayer).classList.remove("active");
  scores = [0, 0];
}

document.querySelector(".btn--new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  //roundScores = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score--0").textContent = 0;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  document.getElementById("name--0").textContent = "Player 1";
  document.getElementById("name--1").textContent = "Player 2";
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.remove("active");
  document.querySelector(".player--1").classList.remove("active");
  document.querySelector(".player--0").classList.add("active");
}
