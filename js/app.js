document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext('2d');

  //===Paddle variables===

  let paddleHeight = 20;
  let paddleWidth = 300;
  let paddleX = ((innerWidth - paddleWidth) / 2);

  let rightKey = true;
  let leftKey = true;

  //===Ball variables===  


  let x = Math.random() * innerWidth;
  let dx = 5;
  let radius = 15;
  let y = Math.random() * innerHeight;
  let dy = 5;


  //===Brick variables===
  let brickRows = 3;
  let brickCols = 6;
  let brickWidth = 120;
  let brickHeight = 30;
  let brickPadding = 20;
  let brickTop = 30;
  let brickLeft = innerHeight / 2;

  //===Ball function===

  function createBall() {
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.fillStyle = "yellow";
    c.fill();
  }

  //===Paddle function===

  function createPaddle() {
    c.beginPath();
    c.fillStyle = "orange";
    c.fillRect(paddleX, (innerHeight - paddleHeight - 25), paddleWidth, paddleHeight);
  }


  //Create bricks array
  let bricks = [];
  for (let col = 0; col < brickCols; col++) {
    bricks[col] = [];
    for (let r = 0; r < brickRows; r++) {
      bricks[col][r] = { x: 0, y: 0 };
    }
  }



  //===Create bricks===

  function createBricks() {
    for (let col = 0; col < brickCols; col++) {
      for (let r = 0; r < brickRows; r++) {
        let brickX = (col * (brickWidth + brickPadding)) + brickLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickTop;
        bricks[col][r].x = brickX;
        bricks[col][r].y = brickY;
        c.beginPath();
        c.fillRect(brickX, brickY, brickWidth, brickHeight);
      }
    }
  }



  //===Animate all  function===

  function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    createBricks();
    createBall();
    createPaddle();


    if (x + radius > innerWidth || x - radius < 0) {
      dx = -dx;
    }

    if (y - radius < 0) {
      dy = -dy;
    } else if (y + radius + (paddleHeight + 20) > innerHeight) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        //Add lost a life alert
        //Add counter function for lives.
        console.log("Game over!");
        document.location.reload();
      }
    }

    x += dx;
    y += dy;

  }

  //===Keyboard controls function===

  document.addEventListener("keydown", keyDownFunc, false);

  function keyDownFunc(e) {
    if (e.key === "ArrowRight") {
      rightKey = true;
    } else if (e.key === "ArrowLeft") {
      leftKey = true;
    }

    if (rightKey && paddleX < innerWidth - paddleWidth) {
      paddleX += 25;
    } else if (leftKey && paddleX > 0) {
      paddleX -= 25;
    }
  }

  document.addEventListener("keyup", keyUpFunc, false);

  function keyUpFunc(e) {
    if (e.key === "ArrowRight") {
      rightKey = false;
    } else if (e.key === "ArrowLeft") {
      leftKey = false;
    }
  }

  setInterval(animate, 10);

  animate();
});