// Đồng hồ
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText =
        now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Nhạc nền bật/tắt
const music = document.getElementById('bg-music');
const toggle = document.getElementById('music-toggle');
toggle.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        toggle.innerText = '🔊';
    } else {
        music.pause();
        toggle.innerText = '🔇';
    }
});
