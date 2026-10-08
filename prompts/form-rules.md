# 랜딩 입력폼 생성 규칙 (전 업종 공통)

업종이 바뀌어도 이 규칙대로 폼을 만들면 DB 접수가 정상 동작합니다.
**name 값과 form 태그만 지키면** 디자인과 라벨 글자는 자유입니다.

---

## 1. form 태그

```html
<form method="post" action="apply.html" name="자유롭게">
```

- `method="post"`, `action="apply.html"` **고정** (바꾸면 접수 안 됨)
- form의 `name`, `id`, `class`는 자유
- `apply.html`은 **랜딩 파일과 같은 폴더**의 apply.html로 전송됩니다.

---

## 2. 고정 name (모든 업종 공통)

| 항목 | name | 비고 |
| --- | --- | --- |
| 이름 | `name` | |
| 전화번호 앞자리 (010 등) | `tel1` | select 권장 : 010 011 016 017 018 019 |
| 전화번호 가운데 | `tel2` | `pattern="[0-9]{3,4}"` `maxlength="4"` `inputmode="numeric"` |
| 전화번호 끝자리 | `tel3` | `pattern="[0-9]{4}"` `maxlength="4"` `inputmode="numeric"` |
| 개인정보 동의 | `agree1` | value `Y` 고정 |

- **`tel` / `hp` (한 칸짜리 긴 전화번호)는 사용하지 않습니다.** 변수 값 오류가 납니다. 전화번호는 반드시 3칸(tel1·tel2·tel3)으로 나눕니다.

---

## 3. 자유 항목 : option1 ~ option9

업종마다 필요한 질문(채무금액, 시술 부위, 보험 종류, 희망 지역 등)은 option 번호에 넣어서 보냅니다.
**option 번호마다 저장되는 글자 수가 다르므로** 값의 길이에 맞는 번호를 고릅니다.

| name | 저장 가능 글자 수 | 어울리는 용도 |
| --- | --- | --- |
| `option1` | 약 10자 | 짧은 선택값 (금액 구간, 예/아니오 등) |
| `option2` | 약 10자 | 짧은 선택값 |
| `option3` | 약 10자 | 짧은 선택값 |
| `option4` | 약 10자 | 짧은 선택값 (통화 가능 시간 등) |
| `option5` | **약 85자** | 긴 글 (문의 내용, 상담 내용 등 textarea) |
| `option6` | 약 33자 | 중간 길이. **중복 선택(체크박스) 가능 → `name="option6[]"`** |
| `option7` | 약 33자 | 중간 길이 (주소, 희망 지역 등) |
| `option8` | 약 10자 | 짧은 선택값 |
| `option9` | 약 10자 | 짧은 선택값 |

- 쓰지 않는 option 번호는 넣지 않아도 됩니다.
- **value(전송 값)는 짧게** 만듭니다. 화면에 보이는 글자(라벨)와 value는 달라도 됩니다.
  ```html
  <!-- 화면엔 길게, 전송은 짧게 (option1 = 약 10자) -->
  <label><input type="radio" name="option1" value="5천~7천" required><span>5,000만원 ~ 7,000만원</span></label>
  ```
- "없음" 같은 선택지도 value는 그대로 `없음`으로 보냅니다.
- 여러 개를 고르는 체크박스는 **option6만** `option6[]`로 씁니다.
  ```html
  <label><input type="checkbox" name="option6[]" value="눈"> 눈</label>
  <label><input type="checkbox" name="option6[]" value="코"> 코</label>
  ```

---

## 4. 개인정보 동의 (항상 이 마크업, value `Y` 고정)

```html
<input id="policy" type="checkbox" name="agree1" value="Y" required>
<label for="policy">개인정보처리방침 동의</label>
<span id="show-Box" class="show-Box1" role="button" tabindex="0">[약관보기]</span>
```

- 처음부터 체크된 상태(`checked`)로 두지 않는 것을 권장합니다.
- [약관보기] 팝업 :

```js
document.querySelectorAll('.show-Box1').forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    var popup = window.open('https://land.withusmk.co.kr/assets/etc/file/policy.html', '개인정보이용동의', 'width=600,height=500,scrollbars=yes');
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      alert('팝업 차단이 감지되었습니다! 팝업 허용을 설정해주세요.');
    }
  });
});
```

---

## 5. 전송 · 유효성 검사

- **폼 전송에 JS로 관여하지 않습니다.** (오류 남)
  submit 이벤트 가로채기, `preventDefault`, `fetch`, `XMLHttpRequest`, 자체 검사 스크립트 사용 금지.
- 검사는 브라우저 기본 기능만 씁니다 : 모든 항목에 `required`, 연락처는 `pattern`.
- 허용되는 JS : 연락처 칸에 숫자만 남기기, 약관 팝업, (단계형 폼일 때) 화면 전환.
  ```js
  document.querySelectorAll('[name=tel2],[name=tel3]').forEach(function (inp) {
    inp.addEventListener('input', function () { inp.value = inp.value.replace(/[^0-9]/g, ''); });
  });
  ```
- 질문을 한 단계씩 보여주는 폼이라도 **JS가 꺼지면 모든 항목이 보여야** 합니다.

---

## 6. 기본 틀 (복사해서 시작)

```html
<form method="post" action="apply.html" name="applyForm">

  <!-- 업종별 질문 : option1~9 (글자 수 확인) -->
  <p>질문 1</p>
  <label><input type="radio" name="option1" value="짧은값A" required><span>보이는 글자 A</span></label>
  <label><input type="radio" name="option1" value="짧은값B" required><span>보이는 글자 B</span></label>

  <!-- 이름 -->
  <input type="text" name="name" placeholder="성함" autocomplete="name" required>

  <!-- 연락처 (3칸 고정) -->
  <select name="tel1" required>
    <option>010</option><option>011</option><option>016</option><option>017</option><option>018</option><option>019</option>
  </select>
  <input type="text" name="tel2" inputmode="numeric" maxlength="4" pattern="[0-9]{3,4}" title="숫자 3~4자리" required>
  <input type="text" name="tel3" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" title="숫자 4자리" required>

  <!-- 선택 상자 예시 (첫 option은 빈 값) -->
  <select name="option4" required>
    <option value="">- 선택 -</option>
    <option value="오전">오전</option>
    <option value="오후">오후</option>
  </select>

  <!-- 긴 글 예시 (option5 = 약 85자) -->
  <textarea name="option5" maxlength="85" placeholder="문의 내용"></textarea>

  <!-- 개인정보 동의 -->
  <input id="policy" type="checkbox" name="agree1" value="Y" required>
  <label for="policy">개인정보처리방침 동의</label>
  <span id="show-Box" class="show-Box1" role="button" tabindex="0">[약관보기]</span>

  <button type="submit">무료 상담 신청하기</button>
</form>
```

---

## 7. 업종별 배치 예시

| 업종 | option1 | option2 | option3 | option4 | option5 | option6[] |
| --- | --- | --- | --- | --- | --- | --- |
| 개인회생 (레온) | 채무금액 `2천~5천` | 월소득 `300만원미만` | 기혼 `있음` | 통화시간 `09시11시` | - | - |
| 성형·피부 | 연령대 `30대` | 성별 `여` | - | 통화시간 | 문의 내용 | 관심 부위 `눈`,`코` |
| 보험 | 나이 `45` | 성별 | 가입 여부 `있음` | 통화시간 | - | 관심 보험 `실손`,`암` |
| 대출 | 희망 금액 `3천만원` | 직업 `직장인` | 신용 `중` | 통화시간 | - | - |

(예시는 배치 방법을 보여주는 것입니다. 실제 질문은 업종에 맞게 정합니다.)

---

## 8. 체크리스트 (올리기 전)

- [ ] form 태그 `method="post" action="apply.html"` 그대로인가
- [ ] 이름 `name`, 연락처 `tel1`·`tel2`·`tel3` 3칸인가 (`tel`/`hp` 한 칸 사용 X)
- [ ] option 번호별 글자 수 안에 value가 들어가는가 (1~4·8·9 약 10자 / 5 약 85자 / 6·7 약 33자)
- [ ] 중복 선택은 `option6[]`만 썼는가
- [ ] 동의 `agree1` value `Y`, `required` 있는가
- [ ] 전송을 막거나 가로채는 JS가 없는가
- [ ] 실제 서버에 테스트 신청 1건 → 관리자 화면에서 값·한글 깨짐 확인
