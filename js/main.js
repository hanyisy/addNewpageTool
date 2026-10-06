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
     개인정보 취급방침 팝업
  --------------------------------------------- */
  document.querySelectorAll('.show-Box1').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var popup = window.open(
        'https://land.withusmk.co.kr/assets/etc/file/policy.html',
        '개인정보이용동의',
        'width=600,height=500,scrollbars=yes'
      );
      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        alert('팝업 차단이 감지되었습니다! 팝업 허용을 설정해주세요.');
      }
    });
  });
});
