/* Bruce Automation — premium wow effects (minimal JS)
   Package B (Apple-like story):
   - Scroll reveal (IntersectionObserver)
   - Cursor spotlight (desktop only)
   - Featured plan shimmer
   - Progress indicator
   - Sticky story steps (IO-driven)
   - Masked text reveal (hero)
   Respects prefers-reduced-motion.
*/
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.toggle('reduce-motion', !!reduce);

  // Masked text reveal (hero / key headings)
  (function () {
    var els = document.querySelectorAll('.maskText');
    if (!els.length) return;

    els.forEach(function (el) {
      if (el.getAttribute('data-masked') === '1') return;
      el.setAttribute('data-masked', '1');

      // Preserve inline tags (<b>) by wrapping only text nodes.
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      var texts = [];
      while (walker.nextNode()) {
        var n = walker.currentNode;
        if (!n.nodeValue || !n.nodeValue.trim()) continue;
        texts.push(n);
      }
      texts.forEach(function (n) {
        var words = n.nodeValue.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        words.forEach(function (w) {
          if (/^\s+$/.test(w)) {
            frag.appendChild(document.createTextNode(w));
          } else {
            var span = document.createElement('span');
            span.className = 'maskWord';
            span.textContent = w;
            frag.appendChild(span);
          }
        });
        n.parentNode.replaceChild(frag, n);
      });

      el.classList.add('maskReady');
    });
  })();

  // Scroll reveal (IntersectionObserver)
  if (!reduce && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('section.section, .card, .hero, .hr, .frame');
    targets.forEach(function (el) {
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
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  // Cursor spotlight (desktop only)
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

  // Featured plan shimmer hook
  var featured = document.querySelector('.card--featured');
  if (featured) featured.classList.add('planShimmer');

  // Progress indicator
  (function () {
    var bar = document.querySelector('.progress__bar');
    if (!bar) return;
    if (reduce) {
      bar.style.transform = 'scaleX(0)';
      return;
    }

    var ticking = false;
    function update() {
      ticking = false;
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop || 0;
      var height = (doc.scrollHeight - doc.clientHeight) || 1;
      var p = Math.max(0, Math.min(1, scrollTop / height));
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  // Sticky story steps (Apple-like narrative)
  (function () {
    var steps = document.querySelectorAll('.storyStep');
    if (!steps.length) return;

    var nEl = document.querySelector('[data-story-step="n"]');
    var tEl = document.querySelector('[data-story-step="t"]');
    var dEl = document.querySelector('[data-story-step="d"]');

    function setActive(stepEl) {
      steps.forEach(function (s) {
        s.classList.toggle('is-active', s === stepEl);
      });
      if (nEl) nEl.textContent = stepEl.getAttribute('data-step') || '';
      if (tEl) tEl.textContent = stepEl.getAttribute('data-title') || '';
      if (dEl) dEl.textContent = stepEl.getAttribute('data-desc') || '';
    }

    setActive(steps[0]);

    if (reduce || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(
      function (entries) {
        // pick the most visible intersecting step
        var best = null;
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        });
        if (best) setActive(best.target);
      },
      { threshold: [0.25, 0.45, 0.65], rootMargin: '-15% 0px -55% 0px' }
    );

    steps.forEach(function (s) {
      io.observe(s);
    });
  })();
})();
