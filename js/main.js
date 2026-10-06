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
     무료 상담 기간 자동 갱신 (2주 단위)
     기준일(data-start)부터 data-days 일씩 끊어서 오늘이 속한 기간을 표시
     예) 기준 9/23, 14일 → 9/23~10/6, 10/7~10/20, 10/21~11/3 ...
  --------------------------------------------- */
  var DAY = 24 * 60 * 60 * 1000;
  function toLocalDate(str) {            // 'YYYY-MM-DD' → 그 날 0시 (현지 시간)
    var p = str.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function fmt(d) { return (d.getMonth() + 1) + '월 ' + d.getDate() + '일'; }

  document.querySelectorAll('.js-period').forEach(function (el) {
    var start = toLocalDate(el.dataset.start);
    var days = parseInt(el.dataset.days, 10) || 14;
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var passed = Math.round((today - start) / DAY);          // 서머타임 오차 보정용 round
    var cycle = Math.floor(passed / days);
    var from = new Date(start.getFullYear(), start.getMonth(), start.getDate() + cycle * days);
    var to = new Date(from.getFullYear(), from.getMonth(), from.getDate() + days - 1);
    el.textContent = fmt(from) + ' ~ ' + fmt(to);
  });

  // 올해 연도 자동 표시
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
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
