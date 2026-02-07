(function(){
  // Minimal consent gate for GA4.
  // Stores a single key in localStorage (consent choice). Customize to a CMP later if needed.
  var KEY = 'analytics_consent';

  function hasConsent(){
    try { return localStorage.getItem(KEY) === 'granted'; } catch(e){ return false; }
  }

  function setConsent(v){
    try { localStorage.setItem(KEY, v ? 'granted' : 'denied'); } catch(e) {}
  }

  function loadGA4(){
    if (!window.__GA4_ID__) return;
    if (window.__ga4_loaded__) return;
    window.__ga4_loaded__ = true;

    var s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(window.__GA4_ID__);
    document.head.appendChild(s1);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', window.__GA4_ID__, { anonymize_ip: true });
  }

  function mountBanner(){
    var el = document.createElement('div');
    el.className = 'consent';
    el.innerHTML = ''
      + '<div class="consent__inner">'
      + '  <div class="consent__text">We use analytics to improve the site. You can opt in to GA4 (cookies/identifiers) or keep privacy-first measurement only.</div>'
      + '  <div class="consent__actions">'
      + '    <button class="btn2 consent__btn" data-choice="deny">Decline</button>'
      + '    <button class="btn consent__btn" data-choice="accept">Accept</button>'
      + '  </div>'
      + '</div>';

    el.addEventListener('click', function(e){
      var b = e.target && e.target.closest && e.target.closest('.consent__btn');
      if (!b) return;
      var choice = b.getAttribute('data-choice');
      if (choice === 'accept'){
        setConsent(true);
        loadGA4();
      } else {
        setConsent(false);
      }
      el.remove();
    });

    document.body.appendChild(el);
  }

  if (hasConsent()){
    loadGA4();
  } else {
    // Show banner only if no prior choice
    try {
      var existing = localStorage.getItem(KEY);
      if (!existing) mountBanner();
    } catch(e){
      mountBanner();
    }
  }
})();
