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
      if (img.alt) {
        box.setAttribute('role', 'img');
        box.setAttribute('aria-label', img.alt);
      }
      img.replaceWith(box);
    }
    if (img.complete && img.naturalWidth === 0) toPlaceholder();
    else img.addEventListener('error', toPlaceholder);
  });

  /* ---------------------------------------------------------
     상담 희망 시간대 옵션
  --------------------------------------------------------- */
  var TIMES = ['09:00 ~ 10:00', '10:00 ~ 11:00', '11:00 ~ 12:00', '12:00 ~ 13:00', '13:00 ~ 14:00',
    '14:00 ~ 15:00', '15:00 ~ 16:00', '16:00 ~ 17:00', '17:00 ~ 18:00', '18:00 ~ 19:00', '시간 무관'];
  document.querySelectorAll('.js-times').forEach(function (select) {
    TIMES.forEach(function (t) { select.add(new Option(t, t)); });
  });

  /* ---------------------------------------------------------
     상담 신청 폼
  --------------------------------------------------------- */
  var form = document.getElementById('consultForm');
  var msg = form.querySelector('.rc-form__msg');

  // 연락처는 숫자만
  ['p2', 'p3'].forEach(function (name) {
    form.elements[name].addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '').slice(0, 4);
    });
  });

  function checked(name) {
    var el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var name = f.name.value.trim();
    var error = '';

    if (!name) error = '성함을 입력해 주세요.';
    else if (!/^\d{3,4}$/.test(f.p2.value) || !/^\d{4}$/.test(f.p3.value)) error = '연락처를 정확히 입력해 주세요.';
    else if (!checked('debt')) error = '채무금액을 선택해 주세요.';
    else if (!checked('asset')) error = '재산 대비 채무 여부를 선택해 주세요.';
    else if (!checked('income')) error = '월소득을 선택해 주세요.';
    else if (!f.t1.value) error = '상담 희망 시간대 1차를 선택해 주세요.';
    else if (!f.t2.value) error = '상담 희망 시간대 2차를 선택해 주세요.';
    else if (!f.agree.checked) error = '개인정보처리방침에 동의해 주세요.';

    msg.classList.toggle('is-ok', !error);
    if (error) {
      msg.textContent = error;
      return;
    }

    // TODO: 실제 접수 API 연동
    msg.textContent = name + '님, 상담 신청이 접수되었습니다. 선택하신 시간대에 연락드리겠습니다.';
    form.reset();
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
  var targets = document.querySelectorAll(
    '.rc-stats__item, .rc-worry p, .rc-who__text, .rc-who__photos, .rc-title, .rc-adv__card, ' +
    '.rc-case, .rc-steps__list li, .rc-compare__title, .rc-compare__box, .rc-benefit__cols, ' +
    '.rc-free__inner > *, .rc-bottom .rc-hero__title, .rc-bottom__btn'
  );
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('.js-count').forEach(countUp);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    targets.forEach(function (el) {
      // 형제 요소끼리 순차 등장
      var index = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = Math.min(index, 6) * 0.08 + 's';
      el.classList.add('js-reveal');
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------
     개인정보 모달
  --------------------------------------------------------- */
  var modal = document.getElementById('policyModal');
  var lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.js-policy-close').focus();
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.js-policy-open').forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });
  document.querySelectorAll('.js-policy-close').forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();
