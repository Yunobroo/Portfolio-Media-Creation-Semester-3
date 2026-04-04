const items = document.querySelectorAll('.item');
const carousel = document.getElementById('carousel');
const wrapper = document.querySelector('.carousel-wrapper');

const achievementsPanel = document.getElementById('achievementsPanel');
const achievementTitle = document.getElementById('achievementTitle');
const achievementList = document.getElementById('achievementList');

let selected = 0;
let achievementsVisible = false;

const achievementsData = [
  {
    title: 'Media Creation Projects',
    achievements: [
      'Produced short-form video edits for social platforms',
      'Designed branded thumbnails and motion graphics',
      'Built a consistent visual style across multiple projects'
    ]
  },
  {
    title: 'School Projects',
    achievements: [
      'Completed major coursework projects with strong results',
      'Worked in teams to research, present, and prototype ideas',
      'Applied design and technical skills in real assignments'
    ]
  },
  {
    title: 'Personal Projects',
    achievements: [
      'Created self-directed experiments to improve coding skills',
      'Built small creative concepts from scratch',
      'Explored UI design, interaction, and visual identity'
    ]
  },
  {
    title: 'About Me',
    achievements: [
      'Creative developer with interest in design and interaction',
      'Comfortable learning fast and building ideas independently',
      'Focused on clean visuals, usability, and presentation'
    ]
  }
];

function renderAchievements() {
  const current = achievementsData[selected];
  achievementTitle.textContent = current.title + ' Achievements';
  achievementList.innerHTML = '';

  current.achievements.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    achievementList.appendChild(li);
  });
}

function showAchievements() {
  renderAchievements();
  achievementsPanel.classList.add('show');
  achievementsVisible = true;
}

function hideAchievements() {
  achievementsPanel.classList.remove('show');
  achievementsVisible = false;
}

function updateUI() {
  items.forEach((item, index) => {
    item.classList.toggle('active', index === selected);
  });

  const item = items[selected];
  const wrapperWidth = wrapper.offsetWidth;
  const itemCenter = item.offsetLeft + item.offsetWidth / 2;
  const offset = itemCenter - wrapperWidth / 2;

  carousel.style.transform = `translateX(${-offset}px)`;

  if (achievementsVisible) {
    renderAchievements();
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    selected = (selected + 1) % items.length;
    updateUI();
  }

  if (e.key === 'ArrowLeft') {
    selected = (selected - 1 + items.length) % items.length;
    updateUI();
  }

  if (e.key === 'ArrowUp') {
    showAchievements();
  }

  if (e.key === 'ArrowDown') {
    hideAchievements();
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

window.addEventListener('load', updateUI);
window.addEventListener('resize', updateUI);