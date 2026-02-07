// Track clicks on the Telegram CTA buttons (best-effort; no error if Plausible isn't configured)
(function () {
  function track(name) {
    try {
      if (window.plausible) window.plausible(name);
    } catch (e) {}
  }

  document.addEventListener(
    'click',
    function (ev) {
      var a = ev.target && (ev.target.closest ? ev.target.closest('a') : null);
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.startsWith('tg://') || href.includes('t.me/BruceWaaynee')) {
        var k = a.getAttribute('data-plausible') || 'ContactTelegram';
        track(k);
      }
    },
    {capture: true}
  );
})();
