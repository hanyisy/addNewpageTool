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
     스크롤 등장 효과 (AOS)
     AOS를 못 불러오면 data-aos 를 지워서 내용이 숨겨진 채로 남지 않게 함
  --------------------------------------------- */
  if (window.AOS) {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
    // 이미지가 늦게 로드되면 위치가 바뀌므로 다시 계산
    window.addEventListener('load', function () { AOS.refresh(); });
  } else {
    document.querySelectorAll('[data-aos]').forEach(function (el) {
      el.removeAttribute('data-aos');
    });
  }

  /* ---------------------------------------------
     통계 숫자 카운트업 (화면에 보이면 0부터 올라감)
  --------------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var countUp = function (el) {
      var target = parseInt(el.dataset.count, 10);
      var suffix = el.dataset.suffix || '';
      var duration = 1500;
      var start = null;
      function step(now) {
        if (!start) start = now;
        var p = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('ko-KR') + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) {
      el.textContent = '0' + (el.dataset.suffix || '');
      io.observe(el);
    });
  }

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
