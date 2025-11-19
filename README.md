서울시 공공자전거 실시간 지도 시각화

따릉이 API + Kakao Map + Vercel Serverless

서울시 공공자전거 실시간 데이터를 활용하여 대여소 위치와 잔여 자전거 대수를 지도 위에 시각화한 프로젝트입니다.
GitHub Pages(HTTPS) 환경에서도 데이터를 호출할 수 있도록 Vercel Serverless Functions를 이용해 프록시 서버를 구성했습니다.

배포 페이지
https://yssong01.github.io/bike_rental/

1. 프로젝트 개요

본 프로젝트는 다음과 같은 기능을 제공합니다.

서울시 공공자전거 실시간 데이터를 지도 기반으로 시각화

대여소별 잔여 자전거 수에 따라 다른 색상의 마커 표시

마커 클러스터링으로 많은 수의 대여소를 효율적으로 표시

Vercel Serverless Function을 이용해 HTTP API를 HTTPS에서 안정적으로 호출

2. 주요 기술 스택

HTML / CSS / Vanilla JavaScript

Kakao Maps JavaScript API

Vercel Serverless Functions

서울시 공공데이터 API (따릉이 실시간 대여소 정보)

GitHub Pages

3. 기능 설명
3-1. 실시간 전체 데이터 자동 로딩

서울시 API는 1000개 단위로만 데이터를 제공

1~1000, 1001~2000 … 반복 호출하여 전체 데이터를 수집

모든 데이터를 합쳐서 프론트로 전달

3-2. 마커 표시 기능

잔여 자전거 대수에 따라 색상 자동 지정

자전거 수	색상
0대	빨강
1~4대	주황
5대 이상	초록

SVG 기반 원형 마커 이미지를 사용해 깔끔한 표현을 구현했습니다.

3-3. 마커 클러스터링

대량의 마커를 묶어서 표시

지도 축소 시 클러스터로 합쳐지고, 확대 시 개별 마커로 풀림

3-4. 대여소 정보 팝업

마커 클릭 시 인포윈도우 표시

대여소명, 거치대 수, 잔여 자전거 수, 거치율 등 확인 가능

4. 서버 구성 (Vercel Serverless API)

GitHub Pages는 HTTPS 기반으로 동작하지만, 서울시 공공 데이터 API는 HTTP만 지원합니다.
이 경우 Mixed Content 에러가 발생하므로 직접 호출이 불가능합니다.

이를 해결하기 위해 다음 구조를 사용했습니다.

HTTPS(Front) → HTTPS(Vercel) → HTTP(Seoul API)

Vercel에서 제공하는 Serverless Function이 중간 프록시 역할을 수행하여
GitHub Pages에서도 안전하게 데이터를 사용할 수 있습니다.

API 경로
/api/bike

파일 위치
api/bike.js

주요 기능

API 반복 호출 (1~1000, 1001~2000 …)

전체 데이터를 취합한 뒤 JSON으로 전달

total, rows 형태 응답

CORS 허용

5. 서버 코드 예시 (api/bike.js)
// api/bike.js
export default async function handler(req, res) {
  const API_KEY = "YOUR_KEY";

  const perPage = 1000;
  let start = 1;
  let end = perPage;

  let allRows = [];

  try {
    while (true) {
      const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/bikeList/${start}/${end}/`;

      const response = await fetch(url);
      if (!response.ok) break;

      const data = await response.json();
      if (!data.rentBikeStatus || !data.rentBikeStatus.row) break;

      const rows = data.rentBikeStatus.row;
      if (!rows.length) break;

      allRows = allRows.concat(rows);

      start += perPage;
      end += perPage;
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ total: allRows.length, rows: allRows });
  } catch (err) {
    res.status(500).json({ error: "Proxy error", detail: err.message });
  }
}

6. 프론트엔드 코드 요약 (index.html)
주요 역할

카카오맵 생성 및 초기화

Vercel API(/api/bike) 호출

지도 위에 마커 및 클러스터 표시

마커 색상 지정 및 클릭 이벤트 처리

7. 폴더 구조
project/
├── api/
│   └── bike.js       # Vercel Serverless Function
├── index.html        # Frontend
└── README.md

8. 설치 및 사용 방법
1. 저장소 클론
git clone https://github.com/사용자명/저장소명.git

2. Vercel 프로젝트 Import

GitHub 연결 후 자동으로 /api/bike.js 인식됨

배포하면 자동으로 API endpoint 생성됨

3. index.html 수정

Vercel API URL을 설정합니다.

const PROXY_BASE_URL = "https://your-vercel-url.vercel.app/api/bike";

4. GitHub Pages 활성화

Settings → Pages → 브랜치 선택

5. 브라우저에서 실행

웹 페이지 접속 → “데이터 불러오기” 클릭

9. 참고 사항

서울시 API는 최대 1000개씩만 제공하므로 반복 호출이 반드시 필요합니다.

Vercel Serverless 무료 요금제로 충분히 운영할 수 있습니다.

API 인증키 노출을 막으려면 Vercel 환경 변수 사용을 권장합니다.
