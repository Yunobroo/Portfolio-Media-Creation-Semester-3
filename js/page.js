function updateTime() {
  const timeElement = document.getElementById('time');

  if (!timeElement) return;

  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  timeElement.textContent = timeString;
}

function setupExpandableCards() {
  const cards = document.querySelectorAll('[data-card]');

  cards.forEach((card) => {
    const toggle = card.querySelector('[data-toggle]');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');

      cards.forEach((otherCard) => {
        otherCard.classList.remove('expanded');
      });

      if (!isExpanded) {
        card.classList.add('expanded');
      }
    });
  });
}
function setupLightbox() {
  const images = document.querySelectorAll('.lightbox-img, .image-grid img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');

  if (!lightbox || !lightboxImage) return;

  images.forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImage.src = img.src;
      lightbox.classList.add('show');
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('show');
    }
  });
} 
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Backspace') {
    window.location.href = 'index.html';
  }
});

setInterval(updateTime, 1000);
updateTime();
setupExpandableCards();
setupLightbox();
