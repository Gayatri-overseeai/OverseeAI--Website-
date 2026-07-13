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

  // Estate diagram — connective flow lines + focus highlighting
  var dia = document.querySelector('.estate-diagram');
  if (dia) {
    var grid = dia.querySelector('.estate-grid');
    var sources = [].slice.call(dia.querySelectorAll('.source-item'));
    var systems = [].slice.call(dia.querySelectorAll('.system-item'));
    var center = dia.querySelector('.translation-box');
    if (grid && center && sources.length && systems.length) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'estate-lines');
      svg.setAttribute('aria-hidden', 'true');
      dia.insertBefore(svg, dia.firstChild);
      var paths = [], nodes = [];
      var sKeys = sources.map(function (_, i) { return 's' + i; });
      var yKeys = systems.map(function (_, i) { return 'y' + i; });
      var allKeys = sKeys.concat(yKeys);

      function mk(tag, attrs) {
        var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
      }
      function addPath(a, b, key) {
        var mx = (a.x + b.x) / 2;
        var d = 'M' + a.x + ' ' + a.y + ' C ' + mx + ' ' + a.y + ', ' + mx + ' ' + b.y + ', ' + b.x + ' ' + b.y;
        var p = mk('path', { d: d, 'class': 'flow-path', 'data-key': key });
        svg.appendChild(p); paths.push(p);
        [[a.x, a.y], [b.x, b.y]].forEach(function (pt) {
          var c = mk('circle', { cx: pt[0], cy: pt[1], r: 2.4, 'class': 'flow-node', 'data-key': key });
          svg.appendChild(c); nodes.push(c);
        });
      }
      function build() {
        while (svg.firstChild) svg.removeChild(svg.firstChild);
        paths = []; nodes = [];
        if (window.innerWidth <= 1040) return;
        var db = dia.getBoundingClientRect();
        svg.setAttribute('viewBox', '0 0 ' + db.width + ' ' + db.height);
        var cb = center.getBoundingClientRect();
        sources.forEach(function (el, i) {
          var b = el.getBoundingClientRect();
          addPath(
            { x: b.right - db.left, y: b.top - db.top + b.height / 2 },
            { x: cb.left - db.left, y: cb.top - db.top + cb.height * (i + 1) / (sources.length + 1) },
            's' + i
          );
        });
        systems.forEach(function (el, i) {
          var b = el.getBoundingClientRect();
          addPath(
            { x: cb.right - db.left + 34, y: cb.top - db.top + cb.height * (i + 1) / (systems.length + 1) },
            { x: b.left - db.left, y: b.top - db.top + b.height / 2 },
            'y' + i
          );
        });
      }
      function setHot(keys, items) {
        dia.classList.add('focused');
        paths.concat(nodes).forEach(function (p) {
          p.classList.toggle('hot', keys.indexOf(p.getAttribute('data-key')) > -1);
        });
        sources.concat(systems).concat([center]).forEach(function (el) {
          el.classList.toggle('hot', items.indexOf(el) > -1);
        });
      }
      function clearHot() {
        dia.classList.remove('focused');
        paths.concat(nodes).forEach(function (p) { p.classList.remove('hot'); });
        sources.concat(systems).concat([center]).forEach(function (el) { el.classList.remove('hot'); });
      }
      function wire(el, keys, items) {
        el.setAttribute('tabindex', '0');
        el.addEventListener('mouseenter', function () { setHot(keys, items); });
        el.addEventListener('mouseleave', clearHot);
        el.addEventListener('focus', function () { setHot(keys, items); });
        el.addEventListener('blur', clearHot);
      }
      sources.forEach(function (el, i) { wire(el, ['s' + i].concat(yKeys), [el, center].concat(systems)); });
      systems.forEach(function (el, i) { wire(el, ['y' + i].concat(sKeys), [el, center].concat(sources)); });
      wire(center, allKeys, [center].concat(sources).concat(systems));

      dia.classList.add('js-anim');
      var reveal = function () {
        dia.classList.add('revealed');
        setTimeout(function () { dia.classList.add('settled'); }, 2100);
      };
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { reveal(); io.disconnect(); } });
        }, { threshold: 0.25 });
        io.observe(dia);
      } else { reveal(); }
      var rt;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 150); });
      build();
    }
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
