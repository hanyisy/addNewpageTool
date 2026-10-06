document.addEventListener('DOMContentLoaded', function () {
  /* ---------------------------------------------
     이미지 자리: 이미지가 로드되면 라벨 숨김, 없으면 플레이스홀더 유지
  --------------------------------------------- */
  document.querySelectorAll('.img-slot img').forEach(function (img) {
    var slot = img.parentElement;
    function onLoad() { slot.classList.add('is-loaded'); }
    function onError() { img.remove(); }
    if (img.complete) {
      img.naturalWidth ? onLoad() : onError();
    } else {
      img.addEventListener('load', onLoad);
      img.addEventListener('error', onError);
    }
  });

  /* ---------------------------------------------
     상담 희망 시간대 옵션
  --------------------------------------------- */
  var TIMES = [
    '09:00 ~ 10:00', '10:00 ~ 11:00', '11:00 ~ 12:00', '12:00 ~ 13:00',
    '13:00 ~ 14:00', '14:00 ~ 15:00', '15:00 ~ 16:00', '16:00 ~ 17:00',
    '17:00 ~ 18:00', '18:00 ~ 19:00', '시간 무관'
  ];
  document.querySelectorAll('.js-times').forEach(function (select) {
    TIMES.forEach(function (t) { select.add(new Option(t, t)); });
  });

  /* ---------------------------------------------
     신청 폼
  --------------------------------------------- */
  var form = document.getElementById('applyForm');
  var msgEl = document.getElementById('formMsg');

  // 선택 버튼 그룹 (채무금액 / 재산 / 월소득)
  form.querySelectorAll('.opts').forEach(function (group) {
    var hidden = form.elements[group.dataset.group];
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('.opt');
      if (!btn) return;
      group.querySelectorAll('.opt').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', b === btn);
      });
      hidden.value = btn.textContent.trim();
    });
  });

  // 연락처: 숫자만, 최대 4자리
  ['p2', 'p3'].forEach(function (name) {
    form.elements[name].addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '').slice(0, 4);
    });
  });

  function showMsg(text, ok) {
    msgEl.textContent = text;
    msgEl.classList.toggle('is-ok', !!ok);
    msgEl.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var name = f.name.value.trim();
    var msg = '';

    if (!name) msg = '성함을 입력해 주세요.';
    else if (!/^\d{3,4}$/.test(f.p2.value) || !/^\d{4}$/.test(f.p3.value)) msg = '연락처를 정확히 입력해 주세요.';
    else if (!f.debt.value) msg = '채무금액을 선택해 주세요.';
    else if (!f.asset.value) msg = '재산 대비 채무 여부를 선택해 주세요.';
    else if (!f.income.value) msg = '월소득을 선택해 주세요.';
    else if (!f.t1.value) msg = '상담 희망 시간대 1차를 선택해 주세요.';
    else if (!f.t2.value) msg = '상담 희망 시간대 2차를 선택해 주세요.';
    else if (!f.agree.checked) msg = '개인정보처리방침에 동의해 주세요.';

    if (msg) {
      showMsg(msg, false);
      return;
    }

    // TODO: 실제 접수 처리 (서버 전송 등) 연결
    showMsg(name + '님, 상담 신청이 접수되었습니다. 선택하신 시간대에 연락드리겠습니다.', true);
    form.reset();
    form.querySelectorAll('input[type="hidden"]').forEach(function (h) { h.value = ''; });
    form.querySelectorAll('.opt').forEach(function (b) {
      b.classList.remove('is-active');
      b.removeAttribute('aria-pressed');
    });
  });

  /* ---------------------------------------------
     개인정보 취급방침 모달
  --------------------------------------------- */
  var modal = document.getElementById('privacy');

  function openPolicy(e) {
    e.preventDefault();
    modal.hidden = false;
    modal.querySelector('.modal__close').focus();
  }
  function closePolicy() { modal.hidden = true; }

  document.querySelectorAll('.js-open-policy').forEach(function (a) {
    a.addEventListener('click', openPolicy);
  });
  modal.querySelector('.js-close-policy').addEventListener('click', closePolicy);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closePolicy();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closePolicy();
  });
});
