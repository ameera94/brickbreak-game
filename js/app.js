document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  var c = canvas.getContext('2d');

  var x = Math.random() * innerWidth;

  var dx = 4;
  var radius = 30;
  var y = Math.random() * innerHeight;
  var dy = 4;

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.fillStyle = "yellow";
    c.fill();

    if (x + radius > innerWidth || x - radius < 0) {
      dx = -dx;
    }

    if (y + radius > innerHeight || y - radius < 0) {
      dy = -dy;
    }
    x += dx;
    y += dy;

  }

  animate();


});