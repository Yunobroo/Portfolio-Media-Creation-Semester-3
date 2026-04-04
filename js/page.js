function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  document.getElementById('time').textContent = timeString;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Backspace') {
    window.location.href = 'index.html';
  }
});

setInterval(updateTime, 1000);
updateTime();