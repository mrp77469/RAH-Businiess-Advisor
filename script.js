/* ==========================================================================
   Rah — Business Advisory Website — shared behavior
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
        q.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Business Ideas filter tabs ---------- */
  var tabs = document.querySelectorAll('.filter-tabs button');
  var ideaCards = document.querySelectorAll('[data-category]');
  if (tabs.length && ideaCards.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var filter = tab.getAttribute('data-filter');
        ideaCards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- Generic form validation ---------- */
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field');
        var value = input.value.trim();
        var ok = value.length > 0;
        if (input.type === 'email' && ok) {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
        if (input.type === 'tel' && ok) {
          ok = /^[0-9+\-\s()]{7,}$/.test(value);
        }
        if (field) {
          field.classList.toggle('invalid', !ok);
        }
        if (!ok) valid = false;
      });

      var successBox = form.parentElement.querySelector('.form-success') || form.querySelector('.form-success');
      if (valid) {
        form.reset();
        form.querySelectorAll('.invalid').forEach(function (f) { f.classList.remove('invalid'); });
        if (successBox) {
          successBox.classList.add('show');
          successBox.setAttribute('role', 'status');
          setTimeout(function () { successBox.classList.remove('show'); }, 6000);
        }
      } else if (successBox) {
        successBox.classList.remove('show');
      }
    });
  });

  /* ---------- Newsletter form ---------- */
  document.querySelectorAll('.newsletter form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var msg = form.parentElement.querySelector('.newsletter-msg');
      var valid = input && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (msg) {
        msg.textContent = valid ? 'Thanks — check your inbox to confirm your subscription.' : 'Please enter a valid email address.';
        msg.style.color = valid ? 'var(--green-dark)' : '#B3261E';
      }
      if (valid) form.reset();
    });
  });

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll('.current-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

});
