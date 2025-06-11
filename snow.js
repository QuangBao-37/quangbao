
var canvas = document.createElement("canvas");
canvas.id = "snow-canvas";
document.body.appendChild(canvas);

var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var numFlakes = 250;
var flakes = [];

for (var i = 0; i < numFlakes; i++) {
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 2,
    d: Math.random() + 1,
    alpha: 0.6 + Math.random() * 0.4,
    alphaChange: 0.02 + Math.random() * 0.02
  });
}

function drawFlakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  for (var i = 0; i < numFlakes; i++) {
    var f = flakes[i];
    ctx.fillStyle = "rgba(255, 0, 0," + f.alpha.toFixed(2) + ")";
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  moveFlakes();
}

var angle = 0;

function moveFlakes() {
  angle += 0.01;
  for (var i = 0; i < numFlakes; i++) {
    var f = flakes[i];
    f.y += Math.pow(f.d, 2) + 1;
    f.x += Math.sin(angle) * 2;

    f.alpha += f.alphaChange;
    if (f.alpha <= 0 || f.alpha >= 1) {
      f.alphaChange *= -1;
    }

    if (f.y > canvas.height) {
      flakes[i] = {
        x: Math.random() * canvas.width,
        y: 0,
        r: f.r,
        d: f.d,
        alpha: 0.6 + Math.random() * 0.4,
        alphaChange: f.alphaChange
      };
    }
  }
}

setInterval(drawFlakes, 25);
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
