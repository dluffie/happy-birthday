/* ============================================================
   Birthday Page — Interactive Scripts
   ============================================================ */

(function () {
  'use strict';

  // ----- Floating Particles ----- //
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = [
      'rgba(255, 77, 138, 0.35)',   // pink
      'rgba(255, 215, 0, 0.3)',     // gold
      'rgba(255, 179, 208, 0.4)',   // light pink
      'rgba(255, 241, 168, 0.35)',  // soft yellow
      'rgba(92, 61, 46, 0.15)',     // subtle chocolate
      'rgba(255, 255, 255, 0.5)',   // white
    ];

    const PARTICLE_COUNT = 30;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el = document.createElement('div');
      el.classList.add('particle');

      const size = Math.random() * 10 + 4;         // 4–14px
      const left = Math.random() * 100;              // 0–100vw
      const duration = Math.random() * 12 + 10;      // 10–22s
      const delay = Math.random() * 14;              // stagger start
      const color = colors[Math.floor(Math.random() * colors.length)];

      el.style.width  = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left   = `${left}%`;
      el.style.background = color;
      el.style.animationDuration = `${duration}s`;
      el.style.animationDelay   = `${delay}s`;

      container.appendChild(el);
    }
  }

  // ----- Scroll Reveal: Message Card ----- //
  function initScrollReveal() {
    const card = document.getElementById('messageCard');
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(card);
  }

  // ----- Cursor-follow soft glow ----- //
  function initGlowFollow() {
    const glow = document.querySelector('.hero__glow');
    if (!glow) return;

    const hero = document.querySelector('.hero');

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = `${x}px`;
      glow.style.top  = `${y}px`;
      glow.style.transform = 'translate(-50%, -50%)';
    });

    hero.addEventListener('mouseleave', () => {
      glow.style.left = '50%';
      glow.style.top  = '50%';
    });
  }

  // ----- Click Confetti Burst ----- //
  function initConfettiBurst() {
    const btn = document.getElementById('ctaBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      burstConfetti(btn);
    });
  }

  function burstConfetti(origin) {
    const rect = origin.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const emojis = ['🎉', '✨', '🎊', '🎈', '💖', '⭐', '🎂'];

    for (let i = 0; i < 14; i++) {
      const el = document.createElement('div');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.position = 'fixed';
      el.style.left = `${cx}px`;
      el.style.top  = `${cy}px`;
      el.style.fontSize = `${Math.random() * 16 + 12}px`;
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9999';
      el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.opacity = '1';
      document.body.appendChild(el);

      const angle = (Math.PI * 2 * i) / 14;
      const distance = Math.random() * 120 + 60;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 40; // bias upward

      requestAnimationFrame(() => {
        el.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg) scale(0.5)`;
        el.style.opacity = '0';
      });

      setTimeout(() => el.remove(), 1200);
    }
  }

  // ----- Video Loading State ----- //
  function initVideoLoader() {
    const video = document.getElementById('cakeVideo');
    const loader = document.getElementById('cakeLoader');
    if (!video || !loader) return;

    function hideLoader() {
      loader.classList.add('hidden');
    }

    // Hide loader when video has enough data to play through
    video.addEventListener('canplaythrough', hideLoader, { once: true });

    // Also listen for 'playing' as a fallback (some mobile browsers)
    video.addEventListener('playing', hideLoader, { once: true });

    // Safety fallback — hide after 8 seconds no matter what
    setTimeout(hideLoader, 8000);

    // If video is already ready (cached), hide immediately
    if (video.readyState >= 4) {
      hideLoader();
    }
  }

  // ----- Init everything ----- //
  document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initScrollReveal();
    initGlowFollow();
    initConfettiBurst();
    initVideoLoader();
  });
})();
