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
    icon: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(to bottom right, rgba(0, 36, 90, 0.5), rgba(0, 70, 145, 0.45), rgba(44, 118, 255, 0.48))'
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
    icon: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=200&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(to bottom right, rgba(0, 30, 80, 0.5), rgba(0, 70, 160, 0.5), rgba(0, 110, 215, 0.5))'
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
    icon: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(to bottom right, rgba(0, 40, 100, 0.5), rgba(10, 100, 170, 0.5), rgba(6, 160, 216, 0.5))'
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
    icon: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(to bottom right, rgba(0, 35, 90, 0.5), rgba(0, 75, 170, 0.5), rgba(0, 110, 230, 0.5))'
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
    icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(to bottom right, rgba(0, 35, 95, 0.5), rgba(0, 78, 165, 0.5), rgba(6, 148, 220, 0.5))'
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
    icon: 'https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?w=200&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(to bottom right, rgba(0, 40, 120, 0.5), rgba(0, 85, 190, 0.45), rgba(10, 140, 230, 0.5))'
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
    icon: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(to bottom right, rgba(0, 40, 120, 0.5), rgba(0, 80, 180, 0.4), rgba(0, 140, 225, 0.4))'
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
    icon: 'https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=200&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(to bottom right, rgba(0, 38, 90, 0.5), rgba(0, 88, 170, 0.45), rgba(12, 144, 240, 0.5))'
  }
];

// State
let selectedIndex = 0;
let showDetails = false;
let gamepadIndex = null;
let prevGamepadButtons = [];
let lastAxisMove = 0;
let lastDpadMove = 0;

// Config
const AXIS_DEADZONE = 0.65; // reduce over-responsiveness
const INPUT_COOLDOWN_MS = 150;
const ACTION_BUTTONS = [0, 1, 2, 3]; // common A/Cross, B/Circle, X/Square, Y/Triangle

// Initialize
function init() {
  renderCards();
  renderIndicators();
  updateDisplay();
  updateTime();
  setInterval(updateTime, 1000);

  document.addEventListener('keydown', handleKeyPress);
  window.addEventListener('gamepadconnected', onGamepadConnected);
  window.addEventListener('gamepaddisconnected', onGamepadDisconnected);
  window.requestAnimationFrame(pollGamepad);

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
          <div class="card-icon">
            <img src="${game.icon}" alt="${game.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
          </div>
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
  panel.classList.toggle('expanded', showDetails);
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
      
    case 'Enter':
      e.preventDefault();
      const game = games[selectedIndex];
      if (game && game.id) {
        window.location.href = `${game.id}.html`;
      }
      break;
  }
}

function onGamepadConnected(event) {
  gamepadIndex = event.gamepad.index;
  console.log('Gamepad connected:', event.gamepad.id);
}

function onGamepadDisconnected() {
  console.log('Gamepad disconnected');
  gamepadIndex = null;
  prevGamepadButtons = [];
}

function pollGamepad() {
  // Auto-detect controller if connection event did not fire
  if (gamepadIndex === null) {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let i = 0; i < pads.length; i++) {
      if (pads[i]) {
        gamepadIndex = i;
        console.log('Auto-detected gamepad index', i, pads[i].id);
        break;
      }
    }
  }

  if (gamepadIndex === null) {
    window.requestAnimationFrame(pollGamepad);
    return;
  }

  const gamepad = navigator.getGamepads()[gamepadIndex];
  if (gamepad) {
    const b = gamepad.buttons;
    const axes = gamepad.axes || [];
    const pressed = (idx) => b[idx] && b[idx].pressed;

    // D-pad or left-stick horizontal
    const horiz = axes[0] || 0;
    const now = Date.now();

    const tryMoveLeft = () => {
      if (now - lastAxisMove < INPUT_COOLDOWN_MS && now - lastDpadMove < INPUT_COOLDOWN_MS) return;
      selectedIndex = (selectedIndex - 1 + games.length) % games.length;
      updateDisplay();
      lastAxisMove = now;
      lastDpadMove = now;
    };

    const tryMoveRight = () => {
      if (now - lastAxisMove < INPUT_COOLDOWN_MS && now - lastDpadMove < INPUT_COOLDOWN_MS) return;
      selectedIndex = (selectedIndex + 1) % games.length;
      updateDisplay();
      lastAxisMove = now;
      lastDpadMove = now;
    };

    if (pressed(14) && !prevGamepadButtons[14]) {
      tryMoveLeft();
    }
    if (pressed(15) && !prevGamepadButtons[15]) {
      tryMoveRight();
    }

    if (horiz < -AXIS_DEADZONE && !prevGamepadButtons.__leftAxis) {
      tryMoveLeft();
      prevGamepadButtons.__leftAxis = true;
    } else if (horiz > AXIS_DEADZONE && !prevGamepadButtons.__rightAxis) {
      tryMoveRight();
      prevGamepadButtons.__rightAxis = true;
    } else if (Math.abs(horiz) < AXIS_DEADZONE) {
      prevGamepadButtons.__leftAxis = false;
      prevGamepadButtons.__rightAxis = false;
    }

    if (pressed(13) && !prevGamepadButtons[13]) {
      toggleDetails(true);
    }
    if (pressed(12) && !prevGamepadButtons[12]) {
      toggleDetails(false);
    }

    const actionPressed = ACTION_BUTTONS.some(idx => pressed(idx) && !prevGamepadButtons[idx]);
    if (actionPressed) {
      const game = games[selectedIndex];
      if (game && game.id) {
        window.location.href = `${game.id}.html`;
      }
    }

    prevGamepadButtons = b.map(btn => btn && btn.pressed);
  }

  window.requestAnimationFrame(pollGamepad);
}

// Start app
init();