(function () {
  const items = document.querySelectorAll('.reveal');
  items.forEach((el, i) => el.style.setProperty('--d', i));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((el) => io.observe(el));
})();
