  const playBoard = document.querySelector(".play-board");
  const scoreElement = document.querySelector(".score");
  const highScoreElement = document.querySelector(".high-score");

  let gameOver = false;
  let foodX, foodY;
  let snakeX = 5, snakeY = 10;
  let snakeBody = [];
  let velocityX = 0, velocityY = 0;
  let setIntervalId;
  let score = 0;

  // Getting high score from local storage
  let highScore = localStorage.getItem("high-score") || 0;
  highScoreElement.innerText = `High Score: ${highScore}`;

  //Passing a random 0-30 value as food position 
  const changeFoodPosition = () => {
    foodX = Math.floor(Math.random()*30) + 1;
    foodY = Math.floor(Math.random()*30) + 1;
  };

  //Clear timer and reload page when game over
  const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
  };

  //Changing velocity value based on key press
  const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1) {
      velocityX = 0;
      velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
      velocityX = 0;
      velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
      velocityX = -1;
      velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
      velocityX = 1;
      velocityY = 0;
    }
    initGame();
  };

  const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;

    //Checking if the snake hit the food
    if (snakeX === foodX && snakeY === foodY) {
      changeFoodPosition();
      snakeBody.push([foodX, foodY]); //Pushing food position to snake body array
      score++;

      highScore = score >= highScore ? score : highScore;
      localStorage.setItem("high-score", highScore);
      scoreElement.innerText = `Score: ${score}`;
      highScoreElement.innerText = `High Score: ${highScore}`;
    }

    //Shifting forward the values of the elements in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; //Setting first element of the snake body to current snake position

    //Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;

    //Set gameOver to true if snake's head is out of the wall
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
      gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
      if(i === 0){
        //Add div for each part of snakes body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
      } else {
        htmlMarkup += `<div class="body" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
      }
      //Set gameOver to true if the snake's head hits its body
      if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
        gameOver = true;
      }
    }

    playBoard.innerHTML = htmlMarkup;
  };

  changeFoodPosition();
  setIntervalId = setInterval(initGame, 125);
  document.addEventListener("keydown", changeDirection);