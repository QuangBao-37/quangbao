
// Simple snow effect
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = 9999;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const snowflakes = [];

function createSnowflake() {
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: 0,
        opacity: Math.random(),
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 3 + 1,
        radius: Math.random() * 4 + 1
    });
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i];
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);
    }
    ctx.fill();
    moveSnowflakes();
}

function moveSnowflakes() {
    for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i];
        flake.x += flake.speedX;
        flake.y += flake.speedY;
        if (flake.y > canvas.height) {
            snowflakes[i] = {
                x: Math.random() * canvas.width,
                y: 0,
                opacity: Math.random(),
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 3 + 1,
                radius: Math.random() * 4 + 1
            };
        }
    }
}

function updateSnowfall() {
    drawSnowflakes();
    requestAnimationFrame(updateSnowfall);
}

setInterval(createSnowflake, 100);
updateSnowfall();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
