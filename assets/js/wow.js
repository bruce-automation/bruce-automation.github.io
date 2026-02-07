/* Bruce Automation — premium wow effects (minimal JS)
   - Scroll reveal (IntersectionObserver)
   - Cursor spotlight (desktop only)
   - Featured plan shimmer
   Respects prefers-reduced-motion.
*/
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.toggle('reduce-motion', !!reduce);

  // 1) Scroll reveal
  if (!reduce && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('section.section, .card, .hero, .hr');
    targets.forEach(function (el) {
      // Avoid double-adding
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -10% 0px' }
    );

    targets.forEach(function (el) {
      io.observe(el);
    });
  } else {
    // No motion: show all
    var all = document.querySelectorAll('.reveal');
    all.forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  // 2) Cursor spotlight (desktop only)
  if (!reduce && window.matchMedia && !window.matchMedia('(hover: none)').matches) {
    var raf = 0;
    window.addEventListener(
      'pointermove',
      function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          var x = (e.clientX / window.innerWidth) * 100;
          var y = (e.clientY / window.innerHeight) * 100;
          document.documentElement.style.setProperty('--mx', x.toFixed(2) + '%');
          document.documentElement.style.setProperty('--my', y.toFixed(2) + '%');
        });
      },
      { passive: true }
    );
  }

  // 3) Featured plan shimmer: add class hook if found
  var featured = document.querySelector('.card--featured');
  if (featured) featured.classList.add('planShimmer');
})();
