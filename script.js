const body = document.body;
const splash = document.querySelector('.splash');
const startButton = document.querySelector('[data-start]');
const timeDisplay = document.querySelector('.status-time');

// Gère le thème auto (clair / sombre) selon l'heure locale.
const applyAutoTheme = () => {
  const now = new Date();
  const hour = now.getHours();
  const isDaytime = hour >= 7 && hour < 19;

  body.classList.toggle('theme-light', isDaytime);
  body.classList.toggle('theme-dark', !isDaytime);
};

const updateTime = () => {
  if (!timeDisplay) return;
  const now = new Date();
  timeDisplay.textContent = now.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if (body.classList.contains('theme-auto')) {
    applyAutoTheme();
  }
  updateTime();

  const tick = () => {
    updateTime();
    if (body.classList.contains('theme-auto')) {
      applyAutoTheme();
    }
  };

  const clockInterval = window.setInterval(tick, 60000);
  tick();

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      tick();
    }
  });

  const revealDesktop = () => {
    body.classList.add('is-desktop');
    body.classList.remove('is-welcome');
  };

  const autoRevealTimeout = window.setTimeout(() => {
    if (!body.classList.contains('is-desktop')) {
      revealDesktop();
    }
  }, 10000);

  startButton?.addEventListener('click', () => {
    revealDesktop();
    window.clearTimeout(autoRevealTimeout);
  });

  window.addEventListener('load', () => {
    window.setTimeout(() => {
      body.classList.remove('is-launching');
      splash?.setAttribute('aria-hidden', 'true');
    }, 1200);
  });

  window.addEventListener('beforeunload', () => {
    window.clearInterval(clockInterval);
  });
});

console.log('Bienvenue sur StarYAM Desktop 🚀');
