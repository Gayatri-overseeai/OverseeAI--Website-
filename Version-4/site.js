// Oversee site shell — shared behavior
(function () {
  var btn = document.querySelector('.menu');
  var panel = document.querySelector('.mobile-panel');

  function closeMenu() {
    if (!btn || !panel) return;
    panel.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  if (btn && panel) {
    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Shell fallback: opens a pre-filled email. Replace with a POST endpoint
  // when the production form backend is available.
  var form = document.querySelector('.briefing-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var f = new FormData(form);
      var subject = 'Briefing request — ' + (f.get('organization') || 'Organization not supplied');
      var body =
        'Name: ' + (f.get('name') || '') + '\n' +
        'Organization: ' + (f.get('organization') || '') + '\n' +
        'Role: ' + (f.get('role') || '') + '\n' +
        'Email: ' + (f.get('email') || '') + '\n\n' +
        (f.get('message') || '');

      window.location.href =
        'mailto:info@oversee-ai.com?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();
