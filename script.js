const player = document.getElementById("player");
const fallingBox = document.getElementById("fallingBox");
const scoreDisplay = document.getElementById("score");
const missDisplay = document.getElementById("miss");
const timeDisplay = document.getElementById("time");
const highScoreDisplay = document.getElementById("highScore");
const gameOverScreen = document.getElementById("gameOverScreen");
const gameOverText = document.getElementById("gameOverText");

let playerX = 175;
let fallingX = 100;
let fallingY = 0;
let score = 0;
let miss = 0;
let timeLeft = 30;
let fallSpeed = 5;
let dropInterval = 30;
let gameRunning = false;

let gameInterval;
let timerInterval;

let highScore = 0;

function loadHighScore() {
  const savedScore = localStorage.getItem("highScore");
  if (savedScore) {
    highScore = parseInt(savedScore);
    highScoreDisplay.textContent = highScore;
  }
}

function saveHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.textContent = highScore;
  }
}

function movePlayer(event) {
  if (!gameRunning) return;
  if (event.key === "ArrowLeft" && playerX > 0) {
    playerX -= 25;
  } else if (event.key === "ArrowRight" && playerX < 350) {
    playerX += 25;
  }
  player.style.left = playerX + "px";
}

function dropBox() {
  fallingY += fallSpeed;
  fallingBox.style.top = fallingY + "px";
  fallingBox.style.left = fallingX + "px";

  if (fallingY >= 440 && fallingY <= 490) {
    if (Math.abs(fallingX - playerX) <= 50) {
      score++;
      scoreDisplay.textContent = score;

      timeLeft++;
      timeDisplay.textContent = timeLeft;

      if (fallSpeed < 20) {
        fallSpeed += 0.3;
      }

      resetBox();
    }
  }

  if (fallingY > 500) {
    miss++;
    missDisplay.textContent = miss;
    if (miss >= 5) {
      endGame("Bạn đã thua do để rớt quá nhiều!");
    }
    resetBox();
  }
}

function resetBox() {
  fallingY = 0;
  fallingX = Math.floor(Math.random() * 350);
}

function updateTimer() {
  timeLeft--;
  timeDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    endGame("Hết giờ! Điểm của bạn là: " + score);
  }
}

function endGame(message) {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  gameRunning = false;

  saveHighScore();

  gameOverText.textContent = message;
  gameOverScreen.style.display = "flex";
}

function startGame() {
  // Reset trạng thái
  score = 0;
  miss = 0;
  timeLeft = 30;
  fallSpeed = 5;
  playerX = 175;
  fallingY = 0;
  fallingX = Math.floor(Math.random() * 350);

  scoreDisplay.textContent = "0";
  missDisplay.textContent = "0";
  timeDisplay.textContent = "30";
  player.style.left = playerX + "px";
  fallingBox.style.top = "0px";
  gameOverScreen.style.display = "none";

  gameRunning = true;
  gameInterval = setInterval(dropBox, dropInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

document.addEventListener("keydown", movePlayer);

window.onload = () => {
  loadHighScore();
  startGame();
};
