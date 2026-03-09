(function() {
  var container = document.getElementById('hero-name');
  if (!container) return;

  var text = container.textContent.trim();
  container.innerHTML = '';
  var chars = [];

  for (var i = 0; i < text.length; i++) {
    var span = document.createElement('span');
    var isSpace = text[i] === ' ';
    span.className = 'char' + (isSpace ? ' space' : '');
    span.textContent = text[i];
    container.appendChild(span);

    chars.push({
      el: span,
      isSpace: isSpace,
      ox: isSpace ? 0 : (Math.random() - 0.5) * 18,
      oy: isSpace ? 0 : (Math.random() - 0.5) * 12,
      or: isSpace ? 0 : (Math.random() - 0.5) * 10,
      vx: 0, vy: 0, vr: 0,
      spring: 0.01 + Math.random() * 0.015,
      damp: 0.95 + Math.random() * 0.03,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.0015 + Math.random() * 0.003,
    });
  }

  function tick() {
    for (var i = 0; i < chars.length; i++) {
      var c = chars[i];
      if (c.isSpace) continue;

      c.phase += c.phaseSpeed;

      var driftX = Math.sin(c.phase) * 0.018;
      var driftY = Math.cos(c.phase * 0.7) * 0.012;
      var driftR = Math.sin(c.phase * 1.3) * 0.006;

      c.vx += driftX - c.ox * c.spring;
      c.vy += driftY - c.oy * c.spring;
      c.vr += driftR - c.or * c.spring;

      c.vx *= c.damp;
      c.vy *= c.damp;
      c.vr *= c.damp;

      c.ox += c.vx;
      c.oy += c.vy;
      c.or += c.vr;

      c.el.style.transform = 'translate(' + c.ox.toFixed(2) + 'px,' + c.oy.toFixed(2) + 'px) rotate(' + c.or.toFixed(2) + 'deg)';
    }
    requestAnimationFrame(tick);
  }

  function repel(mx, my) {
    var rect = container.getBoundingClientRect();
    for (var i = 0; i < chars.length; i++) {
      var c = chars[i];
      if (c.isSpace) continue;
      var cr = c.el.getBoundingClientRect();
      var cx = cr.left + cr.width / 2 - rect.left;
      var cy = cr.top + cr.height / 2 - rect.top;
      var dx = cx - mx;
      var dy = cy - my;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 60 && dist > 0) {
        var f = (1 - dist / 60) * 0.45;
        c.vx += (dx / dist) * f;
        c.vy += (dy / dist) * f;
      }
    }
  }

  container.addEventListener('mousemove', function(e) {
    var rect = container.getBoundingClientRect();
    repel(e.clientX - rect.left, e.clientY - rect.top);
  });

  container.addEventListener('touchmove', function(e) {
    var rect = container.getBoundingClientRect();
    repel(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
  }, { passive: true });

  tick();

  // Say hi toggle
  var trigger = document.getElementById('say-hi-trigger');
  if (trigger) {
    trigger.addEventListener('click', function() {
      trigger.parentElement.classList.toggle('open');
    });
  }
})();
