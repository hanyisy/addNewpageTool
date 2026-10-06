/* 폼 전송·유효성 검사는 브라우저 기본 동작(required / pattern)에 맡깁니다. */
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
     개인정보 취급방침 모달 (약관 페이지를 iframe으로 표시)
  --------------------------------------------- */
  var modal = document.getElementById('privacy');
  var frame = modal.querySelector('.modal__frame');

  function openPolicy(e) {
    e.preventDefault();
    if (frame.getAttribute('src') !== frame.dataset.src) frame.src = frame.dataset.src;
    modal.hidden = false;
    modal.querySelector('.modal__close').focus();
  }
  function closePolicy() { modal.hidden = true; }

  document.querySelectorAll('.js-open-policy').forEach(function (el) {
    el.addEventListener('click', openPolicy);
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') openPolicy(e);
    });
  });
  modal.querySelector('.js-close-policy').addEventListener('click', closePolicy);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closePolicy();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closePolicy();
  });
});
