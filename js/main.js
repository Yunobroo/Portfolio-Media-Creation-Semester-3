const items = document.querySelectorAll('.item');
const carousel = document.getElementById('carousel');
const wrapper = document.querySelector('.carousel-wrapper');

const detailsPanel = document.getElementById('detailsPanel');
const detailTitle = document.getElementById('detailTitle');
const hoursPlayed = document.getElementById('hoursPlayed');
const progressPercent = document.getElementById('progressPercent');
const progressFill = document.getElementById('progressFill');
const achievementList = document.getElementById('achievementList');

let selected = 0;
let detailsVisible = false;

const sectionData = [
  {
    title: 'Media Creation Projects',
    hours: 125,
    progress: 82,
    achievements: [
      'Edited branded short-form content for multiple formats',
      'Built motion graphics and title sequences',
      'Improved visual consistency across creative projects'
    ]
  },
  {
    title: 'School Projects',
    hours: 94,
    progress: 76,
    achievements: [
      'Completed major coursework with strong presentation quality',
      'Worked in teams to research and prototype ideas',
      'Delivered polished assignments under deadlines'
    ]
  },
  {
    title: 'Personal Projects',
    hours: 147,
    progress: 91,
    achievements: [
      'Built self-initiated design and coding experiments',
      'Explored UI animation and interaction systems',
      'Improved front-end skills through hands-on projects'
    ]
  },
  {
    title: 'About Me',
    hours: 999,
    progress: 100,
    achievements: [
      'Creative developer focused on UI and presentation',
      'Learns fast and builds independently',
      'Interested in design systems, motion, and clean interaction'
    ]
  }
];

function renderDetails() {
  const current = sectionData[selected];

  detailTitle.textContent = current.title;
  hoursPlayed.textContent = `${current.hours} hours played`;
  progressPercent.textContent = `${current.progress}%`;

  achievementList.innerHTML = '';

  current.achievements.forEach((achievement) => {
    const li = document.createElement('li');
    li.textContent = achievement;
    achievementList.appendChild(li);
  });

  progressFill.style.width = '0%';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progressFill.style.width = `${current.progress}%`;
    });
  });
}

function showDetails() {
  renderDetails();
  detailsPanel.classList.add('show');
  detailsVisible = true;
}

function hideDetails() {
  detailsPanel.classList.remove('show');
  detailsVisible = false;
}

function updateCarousel() {
  items.forEach((item, index) => {
    item.classList.toggle('active', index === selected);
  });

  const currentItem = items[selected];
  const wrapperWidth = wrapper.offsetWidth;
  const itemCenter = currentItem.offsetLeft + currentItem.offsetWidth / 2;
  const offset = itemCenter - wrapperWidth / 2;

  carousel.style.transform = `translateX(${-offset}px)`;

  if (detailsVisible) {
    renderDetails();
  }
}

function openSelectedPage() {
  const link = items[selected].dataset.link;
  if (link) {
    window.location.href = link;
  }
}

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    selected = index;
    updateCarousel();
    openSelectedPage();
  });
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    selected = (selected + 1) % items.length;
    updateCarousel();
  }

  if (e.key === 'ArrowLeft') {
    selected = (selected - 1 + items.length) % items.length;
    updateCarousel();
  }

  if (e.key === 'ArrowUp') {
    showDetails();
  }

  if (e.key === 'ArrowDown') {
    hideDetails();
  }

  if (e.key === 'Enter') {
    openSelectedPage();
  }
});

function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  document.getElementById('time').textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

window.addEventListener('load', updateCarousel);
window.addEventListener('resize', updateCarousel);