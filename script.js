
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

function toggleMusic() {
  if (!confirm("Bạn có muốn bật nhạc không?")) return;
  const music = document.getElementById("background-music");
  const btn = document.getElementById("music-toggle");
  if (music.paused) {
    music.play();
    btn.textContent = "🔊";
  } else {
    music.pause();
    btn.textContent = "🎵";
  }
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('light-mode');
  const btn = document.getElementById("theme-toggle");
  btn.textContent = body.classList.contains("light-mode") ? "🌞" : "🌙";
}
