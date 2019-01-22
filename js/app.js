document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  const c = canvas.getContext('2d');

  // c.fillStyle = "pink";
  // c.fillRect(100, 100, 100, 100);



  let paddleHeight = 30;
  let paddleWidth = 300;
  let paddleX = (innerWidth - paddleWidth) / 2;

  let rightKey = true;
  let leftKey = true;

  //===Ball=== 
  let x = Math.random() * innerWidth;
  let dx = 4;
  let radius = 30;
  let y = Math.random() * innerHeight;
  let dy = 4;

  // function animate() {
  //   requestAnimationFrame(animate);
  //   // c.clearRect(0, 0, innerWidth, innerHeight);
  //   c.beginPath();
  //   c.arc(x, y, radius, 0, Math.PI * 2, false);
  //   c.fillStyle = "yellow";
  //   c.fill();

  //   if (x + radius > innerWidth || x - radius < 0) {
  //     dx = -dx;
  //   }

  //   if (y + radius > innerHeight || y - radius < 0) {
  //     dy = -dy;
  //   }
  //   x += dx;
  //   y += dy;

  // }

  function createBall() {
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.fillStyle = "yellow";
    c.fill();
  }

  function createPaddle() {
    c.beginPath();
    c.fillStyle = "orange";
    c.fillRect(paddleX, (innerHeight - paddleHeight), paddleWidth, paddleHeight);
    c.fill();
  }

  function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    createBall();
    createPaddle();

    if (x + radius > innerWidth || x - radius < 0) {
      dx = -dx;
    }

    if (y - radius < 0) {
      dy = -dy;
    } else if (y + radius + paddleHeight > innerHeight) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        console.log("Game over!");
        document.location.reload();
      }
    }

    x += dx;
    y += dy;


  }


  document.addEventListener("keydown", keyDownFunc, false);

  function keyDownFunc(e) {
    if (e.key === "ArrowRight") {
      rightKey = true;
    } else if (e.key === "ArrowLeft") {
      leftKey = true;
      console.log("TRUE");
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
      console.log("FALSE")
    }
  }

  setInterval(animate, 8);


  animate();
});