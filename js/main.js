(function () {
  'use strict';

  /* ---------------------------------------------------------
     이미지가 없을 때 자리표시 박스로 교체
  --------------------------------------------------------- */
  document.querySelectorAll('img[data-placeholder]').forEach(function (img) {
    function toPlaceholder() {
      var box = document.createElement('div');
      box.className = img.className + ' img-placeholder';
      box.textContent = img.getAttribute('data-placeholder');
      box.setAttribute('role', 'img');
      box.setAttribute('aria-label', img.alt);
      img.replaceWith(box);
    }
    if (img.complete && img.naturalWidth === 0) toPlaceholder();
    else img.addEventListener('error', toPlaceholder);
  });

  /* ---------------------------------------------------------
     숫자 카운트업
  --------------------------------------------------------- */
  function countUp(el) {
    var to = parseInt(el.getAttribute('data-to'), 10);
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased).toLocaleString('ko-KR');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------------------------------------------------------
     스크롤 등장 애니메이션
  --------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('.js-count').forEach(countUp);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    // 같은 부모 안의 요소는 순차적으로 등장
    reveals.forEach(function (el) {
      var siblings = Array.prototype.filter.call(el.parentNode.children, function (c) {
        return c.classList.contains('reveal');
      });
      el.style.transitionDelay = (siblings.indexOf(el) * 0.1) + 's';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
    document.querySelectorAll('.js-count').forEach(function (el) {
      el.textContent = parseInt(el.getAttribute('data-to'), 10).toLocaleString('ko-KR');
    });
  }

  /* ---------------------------------------------------------
     개인정보 모달
  --------------------------------------------------------- */
  var modal = document.getElementById('privacyModal');
  var lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal__close').focus();
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.js-privacy-open').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });
  modal.querySelectorAll('.js-privacy-close').forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  /* ---------------------------------------------------------
     상담 신청 폼
  --------------------------------------------------------- */
  // 휴대폰 번호는 숫자만 입력
  function onlyNumber(value) {
    return value.replace(/\D/g, '').slice(0, 11);
  }

  document.querySelectorAll('.consult-form').forEach(function (form) {
    function field(name) { return form.querySelector('[name="' + name + '"]'); }
    var nameInput = field('name');
    var phone = field('phone');
    var house = field('house');
    var debt = field('debt');
    var agree = field('agree');

    phone.addEventListener('input', function () {
      phone.value = onlyNumber(phone.value);
    });

    form.querySelectorAll('input, select').forEach(function (field) {
      field.addEventListener('input', function () { field.classList.remove('is-error'); });
      field.addEventListener('change', function () { field.classList.remove('is-error'); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var checks = [
        { el: nameInput, ok: nameInput.value.trim().length >= 2, msg: '이름을 입력해 주세요.' },
        { el: phone, ok: /^01\d{8,9}$/.test(phone.value), msg: '휴대폰 번호를 정확히 입력해 주세요.' },
        { el: house, ok: !!house.value, msg: '자택소유 여부를 선택해 주세요.' },
        { el: debt, ok: !!debt.value, msg: '채무금액을 선택해 주세요.' },
        { el: agree, ok: agree.checked, msg: '개인정보 수집 및 이용에 동의해 주세요.' }
      ];

      for (var i = 0; i < checks.length; i++) {
        if (!checks[i].ok) {
          checks[i].el.classList.add('is-error');
          alert(checks[i].msg);
          checks[i].el.focus();
          return;
        }
      }

      var data = {
        name: nameInput.value.trim(),
        phone: phone.value,
        house: house.value,
        debt: debt.value
      };

      // TODO: 실제 접수 API / 구글시트 / 메일 연동 시 이 부분을 교체하세요.
      console.log('[상담신청]', data);
      alert(data.name + '님, 상담 신청이 접수되었습니다.\n빠른 시간 내에 연락드리겠습니다.');
      form.reset();
    });
  });
})();
