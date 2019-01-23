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
  let brickRows = 4;
  let brickCols = 10;
  let brickWidth = 120;
  let brickHeight = 30;
  let brickPadding = 20;
  let brickTop = 20;
  let brickLeft = 50;

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
      bricks[col][r] = { x: 0, y: 0, value: 1 };
    }
  }



  //===Create bricks===

  function createBricks() {
    for (let col = 0; col < brickCols; col++) {
      for (let r = 0; r < brickRows; r++) {
        if (bricks[col][r].value >= 1) {
          let brickX = (col * (brickWidth + brickPadding)) + brickLeft;
          let brickY = (r * (brickHeight + brickPadding)) + brickTop;
          bricks[col][r].x = brickX;
          bricks[col][r].y = brickY;

          c.beginPath();
          if (col % 2 === 0) {
            c.fillStyle = "black";
            value = "2";
          } else {
            c.fillStyle = "red";
          }
          c.fillRect(brickX, brickY, brickWidth, brickHeight);
        }
      }
    }
  }


  function brickCollision() {
    for (let col = 0; col < brickCols; col++) {
      for (let r = 0; r < brickRows; r++) {
        let bk = bricks[col][r];
        if (x + radius > bk.x && x + radius < bk.x + brickWidth && y + radius > bk.y && y + radius < bk.y + brickHeight) {
          dy = -dy;
          bricks[col][r].value -= 1;
        }
      }
    }
  }

  //===Animate all  function===

  function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    createBricks();
    createBall();
    createPaddle();
    brickCollision();


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

  document.addEventListener("mousemove", mouseMovePaddle, false);

  function mouseMovePaddle(e) {
    if (e.clientX > 0 && e.clientX < innerWidth) {
      paddleX = e.clientX - paddleWidth / 2;
    }
  }


  setInterval(animate, 10);

  animate();
});