  const playBoard = document.querySelector(".play-board");
  const scoreElement = document.querySelector(".score");
  const highScoreElement = document.querySelector(".high-score");

  let gameOver = false;
  let foodX, foodY;
  let snakeX = 6, snakeY = 6;
  let snakeBody = [];
  let velocityX = 0, velocityY = 0;
  let setIntervalId;
  let score = 0;
  let username = localStorage.getItem("username");

  let highScore = localStorage.getItem(`${username}-high-score-normal`) || 0;
  highScoreElement.innerText = `High Score: ${highScore}`;

  const changeFoodPosition = () => {
    foodX = Math.floor(Math.random()*12) + 1;
    foodY = Math.floor(Math.random()*12) + 1;
  };

  const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
  };

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

    if (snakeX === foodX && snakeY === foodY) {
      changeFoodPosition();
      snakeBody.push([foodX, foodY]); 
      score++;

      highScore = score >= highScore ? score : highScore;
      localStorage.setItem(`${username}-high-score-normal`, highScore);
      scoreElement.innerText = `Score: ${score}`;
      highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; 

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 12 || snakeY <= 0 || snakeY > 12){
      gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
      if(i === 0){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
      } else {
        htmlMarkup += `<div class="body" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
      }
      if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
        gameOver = true;
      }
    }

    playBoard.innerHTML = htmlMarkup;
  };

  changeFoodPosition();
  setIntervalId = setInterval(initGame, 125);
  document.addEventListener("keydown", changeDirection);

  document.getElementById("account").innerHTML = username + "'s account";
