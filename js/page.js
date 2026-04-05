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

function setupPDFLightbox() {
  const pdfLinks = document.querySelectorAll('.pdf-link');
  
  pdfLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pdfUrl = link.getAttribute('href');
      openPDFLightbox(pdfUrl);
    });
  });
}

function openPDFLightbox(pdfUrl) {
  // Check if lightbox container exists, if not create it
  let pdfLightbox = document.getElementById('pdfLightbox');
  
  if (!pdfLightbox) {
    pdfLightbox = document.createElement('div');
    pdfLightbox.id = 'pdfLightbox';
    pdfLightbox.className = 'pdf-lightbox';
    pdfLightbox.innerHTML = `
      <div class="pdf-lightbox-content">
        <button class="pdf-lightbox-close">&times;</button>
        <iframe id="pdfFrame" src="" type="application/pdf"></iframe>
      </div>
    `;
    document.body.appendChild(pdfLightbox);
    
    // Close on background click
    pdfLightbox.addEventListener('click', (e) => {
      if (e.target === pdfLightbox) {
        pdfLightbox.classList.remove('show');
      }
    });
    
    // Close button
    pdfLightbox.querySelector('.pdf-lightbox-close').addEventListener('click', () => {
      pdfLightbox.classList.remove('show');
    });
    
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pdfLightbox.classList.contains('show')) {
        pdfLightbox.classList.remove('show');
      }
    });
  }
  
  document.getElementById('pdfFrame').src = pdfUrl;
  pdfLightbox.classList.add('show');
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
setupPDFLightbox();
