(function () {
  const wrap = document.querySelector('.portrait-wrap.green');
  if (!wrap) return;

  for (let i = 0; i < 5; i++) {
    const line = document.createElement('div');
    line.className = 'wind-line';
    line.style.top = 10 + Math.random() * 70 + '%';
    line.style.animationDuration = 2.6 + Math.random() * 2 + 's';
    line.style.animationDelay = i * 0.5 + Math.random() + 's';
    wrap.appendChild(line);
  }

  // Tilt follows the pointer; targets the swap wrapper if present, otherwise the image itself.
  const tiltTarget = wrap.querySelector('.portrait-swap') || wrap.querySelector('img');
  wrap.addEventListener('pointermove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltTarget.style.transform = `rotate(${px * 4}deg) translate(${px * 10}px, ${py * 6}px)`;
  });
  wrap.addEventListener('pointerleave', () => {
    tiltTarget.style.transform = '';
  });

  document.querySelectorAll('.tags span').forEach((tag, i) => {
    tag.classList.add('tag-pop');
    tag.style.transitionDelay = i * 90 + 'ms';
    requestAnimationFrame(() => requestAnimationFrame(() => tag.classList.add('is-visible')));
  });

  // Click the portrait to transform between civilian clothes and magical-girl form.
  const swap = wrap.querySelector('.portrait-swap');
  if (swap) {
    const civilian = swap.querySelector('.img-civilian');
    const magical = swap.querySelector('.img-magical');
    const label = wrap.querySelector('.swap-label');
    let isMagical = false;

    const transform = () => {
      isMagical = !isMagical;
      civilian.classList.toggle('is-hidden', isMagical);
      magical.classList.toggle('is-hidden', !isMagical);
      swap.setAttribute('aria-pressed', String(isMagical));
      if (label) label.textContent = isMagical ? 'CLICK: 私服に戻す' : 'CLICK: 変身！';
      swap.classList.remove('is-flash');
      void swap.offsetWidth;
      swap.classList.add('is-flash');
    };

    swap.addEventListener('click', transform);
    swap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        transform();
      }
    });
  }
})();

