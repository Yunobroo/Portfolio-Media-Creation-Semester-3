 // Game data
const games = [
  {
    id: 'lo1',
    code: 'LO1',
    title: 'Learning Outcome 1',
    subtitle: 'Conceptualize, design, and develop professional media products',
    description: 'You create engaging concepts and translate them into professional validated media products by applying user-centered design principles, visual design techniques and by exploring emerging trends and developments in media, design and technologies.',
    completion: 5,
    achievements: 12,
    hours: 24,
    icon: '🎯',
    gradient: 'linear-gradient(to bottom right, rgba(30, 58, 138, 0.4), rgba(67, 56, 202, 0.4), rgba(107, 33, 168, 0.4))'
  },
  {
    id: 'lo2',
    code: 'LO2',
    title: 'Learning Outcome 2',
    subtitle: 'Transferable production',
    description: 'You create professional documentation and use version control for your products in a personal and team context. You communicate design decisions and recommendations to relevant stakeholders.',
    completion: 72,
    achievements: 9,
    hours: 18,
    icon: '🚀',
    gradient: 'linear-gradient(to bottom right, rgba(107, 33, 168, 0.4), rgba(219, 39, 119, 0.4), rgba(220, 38, 38, 0.4))'
  },
  {
    id: 'lo3',
    code: 'LO3',
    title: 'Learning Outcome 3',
    subtitle: 'Creative iterations',
    description: 'You present the successive iterations of your creative process, and the connections between them, of your methodically substantiated, iterative design and development process.',
    completion: 90,
    achievements: 15,
    hours: 32,
    icon: '⚡',
    gradient: 'linear-gradient(to bottom right, rgba(6, 95, 70, 0.4), rgba(20, 184, 166, 0.4), rgba(6, 182, 212, 0.4))'
  },
  {
    id: 'lo4',
    code: 'LO4',
    title: 'Learning Outcome 4',
    subtitle: 'Professional standard ',
    description: 'Both individually and in teams, you apply a relevant methodological approach used in the professional field to formulate project goals, involve stakeholders, conduct applied research, provide advice, make decisions, and deliver reports. In doing so, you keep in view the relevant ethical, intercultural, and sustainable aspects.',
    completion: 65,
    achievements: 8,
    hours: 15,
    icon: '🔥',
    gradient: 'linear-gradient(to bottom right, rgba(194, 65, 12, 0.4), rgba(220, 38, 38, 0.4), rgba(219, 39, 119, 0.4))'
  },
  {
    id: 'lo5',
    code: 'LO5',
    title: 'Learning Outcome 5',
    subtitle: 'Personal leadership ',
    description: 'You are aware of your own strengths and weaknesses, both in the field of ICT and in your personal development. You choose actions in line with your core values to promote your personal growth and develop your learning attitude.',
    completion: 78,
    achievements: 11,
    hours: 28,
    icon: '💎',
    gradient: 'linear-gradient(to bottom right, rgba(67, 56, 202, 0.4), rgba(59, 130, 246, 0.4), rgba(6, 182, 212, 0.4))'
  },
  {
    id: 'projects',
    code: 'PROJ',
    title: 'Projects',
    subtitle: 'Portfolio Showcase',
    description: 'Explore a collection of completed projects demonstrating skills and expertise.',
    completion: 100,
    achievements: 20,
    hours: 45,
    icon: '🎨',
    gradient: 'linear-gradient(to bottom right, rgba(219, 39, 119, 0.4), rgba(236, 72, 153, 0.4), rgba(220, 38, 38, 0.4))'
  },
  {
    id: 'about',
    code: 'INFO',
    title: 'About Me',
    subtitle: 'Personal Background',
    description: 'Learn more about my journey, skills, and professional background.',
    completion: 100,
    achievements: 5,
    hours: 0,
    icon: '👤',
    gradient: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.4), rgba(67, 56, 202, 0.4))'
  },
  {
    id: 'personal',
    code: 'PERS',
    title: 'Personal Projects',
    subtitle: 'Side Ventures',
    description: 'Check out my personal projects and experimental work outside the curriculum.',
    completion: 55,
    achievements: 7,
    hours: 22,
    icon: '🎮',
    gradient: 'linear-gradient(to bottom right, rgba(220, 38, 38, 0.4), rgba(234, 88, 12, 0.4), rgba(250, 204, 21, 0.4))'
  }
];

// State
let selectedIndex = 0;
let showDetails = false;

// Initialize
function init() {
  renderCards();
  renderIndicators();
  updateDisplay();
  updateTime();
  setInterval(updateTime, 1000);
  
  document.addEventListener('keydown', handleKeyPress);

  // ✅ CHANGED: Play button now loads page
  document.getElementById('playButton').addEventListener('click', () => {
    const game = games[selectedIndex];
    if (game && game.id) {
      window.location.href = `${game.id}.html`;
    }
  });
}

// Update clock
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  document.querySelector('.status-time').textContent = timeStr;
}

// Render cards
function renderCards() {
  const wrapper = document.getElementById('cardsWrapper');
  wrapper.innerHTML = '';
  
  games.forEach((game, index) => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.dataset.index = index;
    
    card.innerHTML = `
      <div class="card-container">
        <div class="card-background" style="background: ${game.gradient}"></div>
        <div class="card-content">
          <div class="card-icon">${game.icon}</div>
          <h2 class="card-title">${game.title}</h2>
          <p class="card-subtitle">${game.subtitle}</p>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => {
      selectedIndex = index;
      updateDisplay();
    });
    
    wrapper.appendChild(card);
  });
}

// Render indicators
function renderIndicators() {
  const container = document.getElementById('indicators');
  container.innerHTML = '';
  
  games.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    indicator.addEventListener('click', () => {
      selectedIndex = index;
      updateDisplay();
    });
    container.appendChild(indicator);
  });
}

// Update display
function updateDisplay() {
  const cards = document.querySelectorAll('.game-card');
  const indicators = document.querySelectorAll('.indicator');
  const selectedGame = games[selectedIndex];
  
  cards.forEach((card, index) => {
    const offset = index - selectedIndex;
    const isSelected = index === selectedIndex;
    const isVisible = Math.abs(offset) <= 2;
    
    if (!isVisible) {
      card.style.opacity = '0';
      card.style.pointerEvents = 'none';
      return;
    }
    
    card.style.opacity = isSelected ? '1' : '0.4';
    card.style.transform = `
      translateX(${offset * 420}px) 
      scale(${isSelected ? 1 : 0.8})
      rotateY(${offset * -15}deg)
    `;
    card.style.zIndex = isSelected ? '10' : '5';
    card.style.pointerEvents = 'auto';
    
    if (isSelected) {
      card.classList.add('selected');
      if (!card.querySelector('.shine')) {
        const shine = document.createElement('div');
        shine.className = 'shine';
        card.querySelector('.card-container').appendChild(shine);
      }
    } else {
      card.classList.remove('selected');
      const shine = card.querySelector('.shine');
      if (shine) shine.remove();
    }
  });
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === selectedIndex);
  });
  
  document.querySelector('.background-layer').style.background = selectedGame.gradient;
  
  updateDetailsPanel(selectedGame);
}

// Update details
function updateDetailsPanel(game) {
  document.getElementById('gameCode').textContent = game.code;
  document.getElementById('gameHours').textContent = `${game.hours} hours played`;
  document.getElementById('gameTitle').textContent = game.title;
  document.getElementById('gameDescription').textContent = game.description;
  document.getElementById('gameAchievements').textContent = game.achievements;
  document.getElementById('progressText').textContent = `${game.completion}% Complete`;
  
  setTimeout(() => {
    document.getElementById('progressFill').style.width = `${game.completion}%`;
  }, 100);
}

// Toggle details
function toggleDetails(show) {
  showDetails = show;
  const panel = document.getElementById('detailsPanel');
  panel.classList.toggle('show', showDetails);
}

// Handle keyboard
function handleKeyPress(e) {
  switch(e.key) {
    case 'ArrowRight':
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % games.length;
      updateDisplay();
      break;
      
    case 'ArrowLeft':
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + games.length) % games.length;
      updateDisplay();
      break;
      
    case 'ArrowDown':
      e.preventDefault();
      toggleDetails(true);
      break;
      
    case 'ArrowUp':
      e.preventDefault();
      toggleDetails(false);
      break;
      
    // ✅ CHANGED: Enter now loads page
    case 'Enter':
      e.preventDefault();
      const game = games[selectedIndex];
      if (game && game.id) {
        window.location.href = `${game.id}.html`;
      }
      break;
  }
}

// Start app
init();