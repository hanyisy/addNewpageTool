# 랜딩 페이지 작업 규칙 (채무조정지원센터 · 개인회생 무료 상담)

사용자는 디자이너 겸 퍼블리셔입니다. 순수 HTML / CSS / JS로 모바일 우선 광고 랜딩을 만듭니다.
대화와 결과물은 한국어로, 설명은 짧고 쉽게 씁니다.

## 일하는 방식

- 의견만 묻는 질문("~나을까?", "~어때?")에는 **바로 적용하지 말고** 의견만 답합니다. 적용은 요청할 때만 합니다.
- 새 버전은 `versions/<이름>/index.html`에 **한 파일**로 만듭니다(CSS·JS 인라인). 만들거나 바꾸면 `versions/README.md` 표에도 반영합니다.
- 작업이 끝나면 테스트하고, 390px 전체 화면 캡처와 함께 결과를 보여줍니다.
- 비교용 미리보기(색 바꾸기 등)는 파일을 고치지 않고 캡처로만 보여줄 수 있습니다.

## 입력폼 (가장 중요)

- 폼 태그는 항상 `<form method="post" action="apply.html" name="...">` 입니다. **action은 고정**이고 name은 자유입니다.
- **폼 전송에 JS로 관여하지 않습니다.** submit 가로채기, fetch, preventDefault 등은 오류가 나므로 쓰지 않습니다.
  유효성 검사는 브라우저 기본 기능(`required`, `pattern`)에만 맡깁니다.
  (단계형·챗봇형처럼 질문을 나눠 보여주는 건 괜찮습니다. 숨은 칸이 비어 있으면 `invalid` 이벤트로 그 칸을 펼쳐 브라우저 경고가 보이게 합니다.)
- JS가 꺼져 있어도 모든 항목이 보이고 신청할 수 있어야 합니다(점진적 향상).
- 연락처 칸은 숫자만 입력되도록 input 이벤트로 거르는 것만 허용합니다.

### 레온 폼 (현재 기본 · 최신 버전은 모두 이것)

순서와 name, value를 그대로 지킵니다. 보이는 글자(라벨)는 디자인에 맞게 바꿔도 되지만 **value는 바꾸지 않습니다.**

| 순서 | 항목 | name | value |
| --- | --- | --- | --- |
| 1 | 채무금액 (라디오) | `option1` | `2천~5천` / `5천~7천` / `7천~1억` / `1억이상` |
| 2 | 성함 | `name` | 텍스트 |
| 3 | 연락처 | `tel1` (select: 010 011 016 017 018 019) / `tel2` (`pattern="[0-9]{3,4}"`, maxlength 4) / `tel3` (`pattern="[0-9]{4}"`, maxlength 4) | |
| 4 | 월소득 (라디오) | `option2` | `200만원미만` / `300만원미만` / `300만원이상` / `없음` |
| 5 | 기혼자 유무 (라디오) | `option3` | `있음` / `없음` |
| 6 | 통화 가능 시간 (select) | `option4` | `09시11시` / `12시14시` / `14시16시` / `16시19시` / `언제든가능` (첫 option은 `value=""`) |
| 7 | 개인정보 동의 | `agree1` | `Y` |

- "없음"은 그대로 `없음`으로 전송합니다.
- 기본 문구 : 폼 위 "채무 2천만원 이상이라면 **1분이면 신청 완료**", 버튼 "지금 무료상담 신청하기".

### 동의 · 약관 마크업 (그대로 사용)

```html
<input id="policy" type="checkbox" name="agree1" value="Y" required>
<label for="policy">개인정보처리방침 동의</label>
<span id="show-Box" class="show-Box1" role="button" tabindex="0">[약관보기]</span>
```

`.show-Box1`을 누르면 팝업을 엽니다(푸터의 "개인정보 취급방침" 링크도 같은 클래스).

```js
var popup = window.open('https://land.withusmk.co.kr/assets/etc/file/policy.html', '개인정보이용동의', 'width=600,height=500,scrollbars=yes');
if (!popup || popup.closed || typeof popup.closed === 'undefined') {
  alert('팝업 차단이 감지되었습니다! 팝업 허용을 설정해주세요.');
}
```

### 전 업종 공통 name 규칙

다른 업종 폼도 같은 규칙입니다. 자세한 내용은 `prompts/form-rules.md`.

- 고정 : `name`(이름), `tel1`·`tel2`·`tel3`(전화번호 3칸), `agree1`(동의, value `Y`). 한 칸짜리 `tel`/`hp`는 쓰지 않음(변수 값 오류).
- 자유 항목 `option1`~`option9`, 번호마다 저장 글자 수가 다름 :
  option1~4 · option8 · option9 약 10자 / option5 약 85자 / option6 · option7 약 33자.
- 중복 선택(체크박스)은 `option6[]`만 사용.

### 예전 폼 (루트 메인 · v2 에서만 사용)

name / tel1~3 / option1·2·5·6·7 / agree1.

## 레이아웃 · 단위

- `.wrap { max-width: 800px; margin: auto; container-type: inline-size; }` 한 줄짜리 모바일 레이아웃입니다.
- **글자 크기는 `cqw`** 를 씁니다(화면 폭에 맞춰 자동으로 줄어듦). px로 따로 맞추지 않습니다.
- **세로 간격은 `lh`·%**, **가로 간격은 %·`em`** 을 씁니다.
- body 글자 크기 단계 (lh 기준값) :

```css
body { font-size: 30px; line-height: 1.5; }
@media (min-width: 661px) and (max-width: 730px) { body { font-size: 28px; } }
@media (min-width: 591px) and (max-width: 660px) { body { font-size: 24px; } }
@media (min-width: 536px) and (max-width: 590px) { body { font-size: 21px; } }
@media (min-width: 466px) and (max-width: 535px) { body { font-size: 20px; } }
@media (min-width: 405px) and (max-width: 465px) { body { font-size: 18px; } }
@media (min-width: 350px) and (max-width: 404px) { body { font-size: 16px; } }
@media (max-width: 349px) { body { font-size: 13px; } }
```

- 글꼴 : Pretendard (`https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css`). 명조가 필요하면 Google Fonts Noto Serif KR.
- `word-break: keep-all;`, 320 / 390 / 800px에서 가로 넘침이 없어야 합니다.
- 색은 `:root` 변수로 모아 두어 색만 바꾼 버전을 쉽게 만들 수 있게 합니다.
- 라디오를 버튼 모양으로 만들 때 동그라미가 함께 있으면 글자는 **왼쪽 정렬**합니다.

## 이미지

- 기본 경로 : `https://land.withusmk.co.kr/assets/law/%EC%B1%84%EB%AC%B4%EC%A7%80%EC%9B%90/ver4/`
  - 직업 사진 : `ver4/jobs/job-01-teacher.jpg` ~ `job-12-construction.jpg` (800×1000)
  - 상담 사진 : `ver4/stats-bg.jpg`
- 저장소 `images/`에 같은 파일이 있습니다(테스트용).
- 사진 위에 특정 사례(A씨 등) 설명을 붙여 사진 속 인물이 그 사람처럼 보이게 하지 않습니다.

## 내용 · 문구

- 대상과 광고 중심 : **채무 2천만원 이상**, **개인회생 무료 상담**. "진단 결과"가 아니라 "무료 상담 전화를 드려요" 방향입니다.
- 브랜드 : 헤더 "채무조정지원센터", 푸터는 아래 그대로.

```
상호명 : 법무법인 레온
사업장 소재지 : 경기도 부천시 원미구 상일로 130, 11층
사업자번호 : 426-87-03573
※ 본 페이지의 감면율(최대 95%) 및 이자 면제 등은 법원의 심사 결과 및
개인의 소득, 재산, 채무 상황에 따라 달라질 수 있으며, 확정된 결과를 보장하지 않습니다.
© 법무법인 레온 All rights reserved.
```

- 감면 사례 (숫자 그대로 사용) :

| 사례 | 조정 전 | 갚을 금액 · 기간 | 한 달 | 감면율 | 기타 |
| --- | --- | --- | --- | --- | --- |
| A씨 직장인 40대 남성 · 장기 연체로 신용불량 | 1억5천만원 | 900만원 · 36개월 | 25만원 | 94% | 부양가족 3인 · 월 소득 약 290만원 |
| B씨 사업자 30대 여성 · 사업 실패 | 6억원 | 1200만원 · 60개월 | 20만원 | 98% | 부양가족 3인 · 월 소득 392만원 |
| C씨 직장인 30대 남성 · 주식·코인 투자 손실 | 1억1천만원 | 792만원 · 36개월 | 22만원 | 93% | 부양가족 1인 · 월 소득 226만원 |

- 신뢰 숫자 : 누적 상담 30,000건 / 원금 최대 95% 감면 / 평균 접수 3일 이내 / 상담 비용 0원 / 1:1 비밀 보장.
- 신청 조건 3가지 : 꾸준한 소득(직장인·사업자·프리랜서·아르바이트·일용직) / 재산보다 빚이 많음(연체 전·중 모두 가능) / 최근 5년 안에 면책받은 적 없음.
- 사례 아래에는 "실제 사례이며, 결과는 법원의 심사와 개인의 소득·재산·채무 상황에 따라 다릅니다." 고지를 둡니다.
- 과장 표현("다들", 결과 보장 등), 가짜 후기·가짜 댓글·가짜 조회수, 실제 언론사처럼 꾸미기는 하지 않습니다.
- 헤드라인은 감성 문구보다 **구체적인 숫자("월 25만원")** 쪽이 반응이 좋다고 판단했습니다.

## 자주 쓰는 기능

- **무료 상담 기간 2주 자동 갱신** : `<b class="js-period" data-start="2026-09-23" data-days="14">`. 기준일부터 14일 단위로 오늘이 속한 기간을 표시하고, 마감은 마지막 날 24시입니다. (타이머는 버전에 따라 뺄 수 있습니다. 깔끔형·리포트형은 타이머 없음.)
- **연도 자동** : `.js-year`.
- **스크롤 등장** : AOS `https://unpkg.com/aos@2.3.4/dist/aos.css` / `aos.js` (`once: true`). AOS를 못 불러오면 `data-aos` 속성을 지워 내용이 숨은 채로 남지 않게 합니다.
- **숫자 카운트업** : `data-count`, `data-suffix` + IntersectionObserver.
- **하단 고정 버튼** : 신청 폼이 화면에 보이면 숨깁니다(IntersectionObserver).

## 테스트

- Playwright + Chromium : `executablePath: '/opt/pw-browsers/chromium'` (`playwright install` 하지 않음).
- 외부 네트워크가 막혀 있으면 `ver4/` 이미지 요청을 저장소 `images/`로 연결해서 테스트합니다.
- 확인할 것 :
  1. 실제 전송 값(POST 본문)이 위 name/value와 같은지
  2. 동의하지 않거나 빈칸이 있으면 전송이 막히는지
  3. JS가 꺼져도 모든 항목이 보이는지
  4. 320 / 390 / 800px에서 가로 넘침이 없는지
- 전체 화면 캡처는 sticky 요소(헤더·하단 버튼)를 static으로 바꾸고 찍어야 화면 중간에 겹치지 않습니다.

## 버전 목록

`versions/README.md`를 봅니다. 현재 컨펌 후보 : 영수증형(`receipt`), 챗봇형(`chatbot`), 깔끔형(`clean`), 리포트형(`news`).
