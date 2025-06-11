
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

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('light-mode');
  const btn = document.getElementById("theme-toggle");
  btn.textContent = body.classList.contains("light-mode") ? "🌞" : "🌙";
}

function updateDateTime() {
  const now = new Date();
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const dateString = `${days[now.getDay()]}, ${now.getDate().toString().padStart(2, '0')}/${
    (now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} - ${
    now.getHours().toString().padStart(2, '0')}:${
    now.getMinutes().toString().padStart(2, '0')}:${
    now.getSeconds().toString().padStart(2, '0')}`;
  document.getElementById("datetime-display").textContent = dateString;
}
setInterval(updateDateTime, 1000);
updateDateTime();
