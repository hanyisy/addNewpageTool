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
| 깔끔형 (한 파일) | `versions/clean/index.html` | 타이머 없는 잡지형 랜딩: 큰 숫자 히어로(월 25만원) → 레온 입력폼(전 항목 펼침) → 사례 표 → 달라지는 점 → 신청 조건 → 진행 순서 → FAQ (크림 + 딥그린 + 형광펜 강조) |
| 리포트형 (한 파일) | `versions/news/index.html` | 센터가 내는 뉴스레터·전단지 느낌: 명조 제목 "1억 5천만원 빚, 월 25만원으로 줄었다" → A씨 이야기 → 본문 속 레온 입력폼 → 사례 표 → 진행 순서 → Q&A (흑백 + 딥그린) |
| 영수증형 (한 파일) | `versions/receipt/index.html` | 메시지 버전과 같은 구성(감면 영수증 히어로, 사례 넘기기, 비교표, 대화형 FAQ)인데 신청 폼만 레온 입력폼 펼친 형태 |
| 챗봇형 (한 파일) | `versions/chatbot/index.html` | 연한 하늘 배경 + 흰/파랑 말풍선. 안내 카드 뒤 [지금 상담 신청하기] / [좀 더 알아볼게요] 두 갈래. 알아보기에서 사례·신청 조건·비용/비밀 중 골라 보고(본 건 빠진 채 다시 질문), 신청을 시작하면 질문 4개 + 연락처 폼. 폼 아래는 신청 보내기 폼이 나온 뒤 안 본 주제만 AOS로 등장 |
| 씨에스 블루 (한 파일) | `versions/cs-blue/index.html` | 법무법인 씨에스용 그린 테마 랜딩을 블루 테마(기준색 #007bff)로 바꾼 것. 구조·문구·폼은 받은 원본 그대로 |
| 입력폼 버전 (한 파일) | `versions/form/index.html` | 모든 항목을 한 번에 펼친 신청서 + 작성 진행 표시, 막대 그래프 사례, 왜 지금 상담해야 하는지 (인디고 + 코랄) |
| v2 레온 (한 파일) | `versions/v2-leon-all-in-one.html` | v2 + 법무법인 레온 푸터, 변호사 사진 영역 주석 처리, 입력폼 항목 변경 |

- 메인·v2 입력폼: `apply.html` POST, name / tel1~3 / option1·2·5·6·7 / agree1
- 메인 레온·v2 레온·전환형 새 랜딩·메시지 버전·입력폼 버전·깔끔형·리포트형·영수증형·챗봇형 입력폼: `apply.html` POST, option1(채무금액) / name / tel1~3 / option2(월소득) / option3(기혼자 유무) / option4(통화 가능 시간) / agree1
- 이미지는 두 버전 모두 `https://land.withusmk.co.kr/assets/law/채무지원/ver4/` 에서 불러옵니다.
- 무료 상담 기간은 기준일 9/23부터 2주 단위로 자동 갱신됩니다.
