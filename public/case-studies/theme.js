/* Same logic as wumonica.com: dark by default, light only if theme_v2 === 'light'. External file so the strict CSP stays valid. */
(function () {
  var d = document.documentElement;
  var t = 'dark';
  try { if (localStorage.getItem('theme_v2') === 'light') t = 'light'; } catch (e) {}
  d.setAttribute('data-theme', t);
  document.addEventListener('DOMContentLoaded', function () {
    var b = document.getElementById('theme-toggle');
    if (!b) return;
    function sync() {
      var light = d.getAttribute('data-theme') === 'light';
      b.setAttribute('aria-pressed', light ? 'true' : 'false');
      b.textContent = light ? 'Light theme' : 'Dark theme';
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
