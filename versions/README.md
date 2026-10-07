# 버전 보관

| 버전 | 위치 | 설명 |
| --- | --- | --- |
| 메인 | 루트 `index.html` + `css/` + `js/` | 청록 테마, 원래 레이아웃 기반 (현재 메인) |
| 메인 (한 파일) | `versions/main-all-in-one.html` | 위 메인을 HTML 하나로 합친 것 |
| v2 | `versions/v2/` (`index.html` + `css/` + `js/`) | 섹션 디자인을 많이 바꾼 버전 (라벨 + 제목, 말풍선, 3열 비교표 등) |
| v2 (한 파일) | `versions/v2-all-in-one.html` | 위 v2를 HTML 하나로 합친 것 |
| 메인 레온 (한 파일) | `versions/main-leon-all-in-one.html` | 메인 + 법무법인 레온 푸터, 변호사 사진 영역 주석 처리, 입력폼 항목·감면 사례 변경 |
| 전환형 새 랜딩 (한 파일) | `versions/new-cv/index.html` | 레온 정보 기반 새 구성: 단계형 폼, 마감 카운트다운, 월 변제금 사례, 3초 자가진단, FAQ (네이비 + 골드) |
| 전환형 컬러 3종 | `versions/new-cv/navy-gold.html` · `green-gold.html` · `charcoal-lime.html` | 위 새 랜딩과 내용·폼은 같고 색만 다름 (네이비+골드 = index.html과 동일) |
| 메시지 버전 (한 파일) | `versions/message/index.html` | 챗봇·알림봇 느낌: 감면 영수증 히어로 → 상담 매니저와 대화하듯 답하는 신청 폼 → 사례 카드 넘기기, 지금 vs 개인회생 후 비교표, 대화형 FAQ (블루 + 옐로) |
| 깔끔형 (한 파일) | `versions/clean/index.html` | 흰 배경 + 큰 글자의 기본형 랜딩: 짧은 히어로 → 레온 입력폼(전 항목 펼침) → 사례 → 신청 조건 → 달라지는 점 → 진행 순서 → FAQ → 마감 CTA (블루 + 오렌지 버튼) |
| 입력폼 버전 (한 파일) | `versions/form/index.html` | 모든 항목을 한 번에 펼친 신청서 + 작성 진행 표시, 막대 그래프 사례, 왜 지금 상담해야 하는지 (인디고 + 코랄) |
| v2 레온 (한 파일) | `versions/v2-leon-all-in-one.html` | v2 + 법무법인 레온 푸터, 변호사 사진 영역 주석 처리, 입력폼 항목 변경 |

- 메인·v2 입력폼: `apply.html` POST, name / tel1~3 / option1·2·5·6·7 / agree1
- 메인 레온·v2 레온·전환형 새 랜딩·메시지 버전·입력폼 버전·깔끔형 입력폼: `apply.html` POST, option1(채무금액) / name / tel1~3 / option2(월소득) / option3(기혼자 유무) / option4(통화 가능 시간) / agree1
- 이미지는 두 버전 모두 `https://land.withusmk.co.kr/assets/law/채무지원/ver4/` 에서 불러옵니다.
- 무료 상담 기간은 기준일 9/23부터 2주 단위로 자동 갱신됩니다.
