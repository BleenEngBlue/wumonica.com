/* Same logic as wumonica.com: dark by default, light only if theme_v2 === 'light'. External file so the strict CSP stays valid. */
(function () {
  var d = document.documentElement;
  var t = 'dark';
  try { if (localStorage.getItem('theme_v2') === 'light') t = 'light'; } catch (e) {}
  d.setAttribute('data-theme', t);
  document.addEventListener('DOMContentLoaded', function () {
    var b = document.getElementById('theme-toggle');
    if (!b) return;
    /* Toggle-button pattern (WCAG 4.1.2): the name stays constant ("Dark theme") and
       aria-pressed reports whether dark is active — same contract as Header.tsx. */
    function sync() {
      var dark = d.getAttribute('data-theme') === 'dark';
      b.setAttribute('aria-pressed', dark ? 'true' : 'false');
      b.textContent = 'Dark theme';
    }
    sync();
    b.addEventListener('click', function () {
      var next = d.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      d.setAttribute('data-theme', next);
      try { localStorage.setItem('theme_v2', next === 'light' ? 'light' : 'dark'); } catch (e) {}
      sync();
    });
  });
})();
