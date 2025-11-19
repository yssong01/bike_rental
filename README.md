서울시 공공자전거 실시간 지도 시각화

따릉이 API · Kakao Map · Vercel Serverless 기반 프로젝트

GitHub Pages 환경에서 서울시 공공자전거 실시간 대여소 정보를 지도 위에 시각적으로 표현하는 프로젝트입니다.
Vercel Serverless Functions를 이용해 HTTP(OpenAPI)를 HTTPS(GitHub Pages)에서 불러올 수 있도록 구성했습니다.

배포 페이지
https://yssong01.github.io/bike_rental/

1. 프로젝트 개요

본 프로젝트는 다음 기능을 제공합니다.

서울시 공공자전거 실시간 데이터를 지도 기반으로 시각화

대여소별 잔여 자전거 수에 따라 색상 구분 마커 자동 표시

마커 클러스터링을 통한 대용량 데이터 성능 유지

Vercel Serverless Functions로 HTTP API를 HTTPS 환경에서 안정적으로 호출

2. 주요 기술 스택

HTML / CSS / Vanilla JavaScript

Kakao Maps JavaScript API

Vercel Serverless Functions

서울시 공공데이터 API (따릉이 실시간 대여소 정보)

GitHub Pages

3. 기능 설명
3-1. 실시간 전체 데이터 자동 로딩

서울시 OpenAPI는 1,000개 단위 페이징 제공

1~1000, 1001~2000 … 자동 반복 호출하여 전체 데이터 수집

Vercel 서버에서 통합 후 프론트로 일괄 전달

3-2. 마커 표시 기능

0대 → 빨강

1~4대 → 주황

5대 이상 → 초록

SVG 기반의 원형 마커 이미지로 직관적인 색 정보 제공

3-3. 마커 클러스터링

수천 개의 대여소를 자동 그룹화

지도 확대 시 자동으로 개별 마커로 풀림

3-4. 대여소 정보 팝업

마커 클릭 시 InfoWindow 표시

대여소명 / 거치대 수 / 잔여 자전거 수 / 거치율 확인 가능

4. 서버 구성 (Vercel Serverless API)

GitHub Pages는 HTTPS 환경이지만 서울시 공공자전거 API는 HTTP만 제공 중입니다.
이를 그대로 호출하면 Mixed Content 오류가 발생합니다.

따라서 다음 구조로 구성하여 HTTPS로 통신합니다.

Frontend(GitHub Pages, HTTPS)
→ Vercel Serverless(HTTPS Proxy)
→ Seoul OpenAPI(HTTP)

4-1. 경로

/api/bike

4-2. 역할

1~1000, 1001~2000, … 반복 호출

전체 데이터를 통합 후 JSON 형태로 { total, rows } 반환

CORS 허용 처리

5. 프론트엔드 주요 역할

Kakao Map 초기화 및 설정

Vercel API(/api/bike) 호출

지도 위에 마커 및 클러스터 표시

마커 색상/이벤트/팝업 구현

6. 폴더 구조
project/
├── api/
│   └── bike.js
├── index.html
└── README.md

7. 설치 및 사용 방법
7-1. 저장소 클론
git clone https://github.com/사용자명/저장소명.git

7-2. Vercel 프로젝트 Import

/api/bike.js 자동 인식 후 Serverless Function 생성

배포 후 API 엔드포인트 제공

7-3. 프론트 설정

index.html 내 PROXY_BASE_URL 값을 Vercel API 주소로 변경

7-4. GitHub Pages 활성화

Settings → Pages → 배포 브랜치 지정

7-5. 웹페이지 접속

배포 URL 접속 → 데이터 불러오기 버튼 클릭

8. 참고 사항

서울시 공공자전거 API는 반드시 1000개 단위 반복 호출이 필요합니다.

Vercel 무료 요금제로 충분히 운영 가능합니다.

API 인증키 노출이 우려된다면, .env, 환경 변수 사용을 권장합니다.
