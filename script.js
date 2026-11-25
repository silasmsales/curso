document.addEventListener('DOMContentLoaded', () => {
  const moduleCards = Array.from(document.querySelectorAll('.module-card'));
  const toggleAllBtn = document.getElementById('toggle-all-modules');
  const stickyCta = document.getElementById('sticky-cta');
  const heroCta = document.getElementById('hero-cta');

  function setModuleState(card, open) {
    const btn = card.querySelector('.module-card__header');
    const body = card.querySelector('.module-card__body');
    if (!btn || !body) return;

    card.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    body.hidden = !open;
  }

  function syncToggleAllLabel() {
    if (!toggleAllBtn) return;
    const allOpen = moduleCards.every((card) => card.classList.contains('is-open'));
    toggleAllBtn.textContent = allOpen
      ? 'Recolher todos os módulos'
      : 'Expandir todos os módulos';
    toggleAllBtn.setAttribute('aria-expanded', String(allOpen));
  }

  moduleCards.forEach((card) => {
    const btn = card.querySelector('.module-card__header');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');
      setModuleState(card, !isOpen);
      syncToggleAllLabel();
    });
  });

  if (toggleAllBtn) {
    toggleAllBtn.addEventListener('click', () => {
      const allOpen = moduleCards.every((card) => card.classList.contains('is-open'));
      const targetState = !allOpen;
      moduleCards.forEach((card) => setModuleState(card, targetState));
      syncToggleAllLabel();
    });
  }

  // Exibe barra fixa no mobile somente quando o botão principal do topo sai da tela
  if (stickyCta && heroCta && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const shouldShow = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          stickyCta.classList.toggle('is-visible', shouldShow);
          stickyCta.setAttribute('aria-hidden', String(!shouldShow));
        });
      },
      { threshold: 0 }
    );
    observer.observe(heroCta);
  }
});
