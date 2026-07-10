// Oversee site shell — shared behavior
(function () {
  // Mobile menu
  var btn = document.querySelector('.menu');
  var panel = document.querySelector('.mobile-panel');
  if (btn && panel) {
    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        panel.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        panel.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  // Briefing form — shell fallback: opens a pre-filled email.
  // Replace with your form backend (POST endpoint) when available.
  var form = document.querySelector('.briefing-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var subject = 'Briefing request — ' + (f.get('organization') || '');
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
