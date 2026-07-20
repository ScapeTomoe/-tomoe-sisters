(function () {
  const wrap = document.querySelector('.portrait-wrap.blue');
  if (!wrap) return;

  const scan = document.createElement('div');
  scan.className = 'scan-line';
  wrap.appendChild(scan);

  const readout = document.createElement('p');
  readout.className = 'readout';
  readout.innerHTML = 'ANALYZING TARGET<span class="cursor"></span>';
  wrap.appendChild(readout);

  function fireScan() {
    scan.classList.remove('is-active');
    // reflow to restart the animation
    void scan.offsetWidth;
    scan.classList.add('is-active');
  }

  function fireReticle() {
    const r = document.createElement('div');
    r.className = 'reticle is-active';
    r.style.left = 15 + Math.random() * 60 + '%';
    r.style.top = 15 + Math.random() * 55 + '%';
    wrap.appendChild(r);
    setTimeout(() => r.remove(), 1700);
  }

  fireScan();
  setInterval(fireScan, 5200);
  setInterval(fireReticle, 1400);

  document.querySelectorAll('.specs dd[data-count]').forEach((dd) => {
    const target = parseInt(dd.dataset.count, 10);
    const suffix = dd.dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.round(target / 24));
    const timer = setInterval(() => {
      current = Math.min(target, current + step);
      dd.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 35);
  });

  // Click the portrait to toggle her "反転" (Reversal) enhanced form.
  const swap = wrap.querySelector('.portrait-swap');
  if (swap) {
    const civilian = swap.querySelector('.img-civilian');
    const reversed = swap.querySelector('.img-magical');
    const label = wrap.querySelector('.swap-label');
    let isReversed = false;

    const toggle = () => {
      isReversed = !isReversed;
      civilian.classList.toggle('is-hidden', isReversed);
      reversed.classList.toggle('is-hidden', !isReversed);
      swap.setAttribute('aria-pressed', String(isReversed));
      wrap.classList.toggle('is-reversed', isReversed);
      readout.innerHTML = isReversed
        ? 'REVERSAL: ACTIVE<span class="cursor"></span>'
        : 'ANALYZING TARGET<span class="cursor"></span>';
      if (label) label.textContent = isReversed ? 'CLICK: 解除' : 'CLICK: 反転発動！';
      swap.classList.remove('is-flash');
      void swap.offsetWidth;
      swap.classList.add('is-flash');
    };

    swap.addEventListener('click', toggle);
    swap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  }
})();

