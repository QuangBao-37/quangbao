
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  document.getElementById('clock').innerText = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

let isPlaying = true;
function toggleAudio() {
  const audio = document.getElementById("background-audio");
  const btn = document.getElementById("audio-btn");
  if (isPlaying) {
    audio.pause();
    btn.textContent = "🔈 Bật nhạc";
  } else {
    audio.play();
    btn.textContent = "🔊 Tắt nhạc";
  }
  isPlaying = !isPlaying;
}
