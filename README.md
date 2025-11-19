서울시 공공자전거 실시간 지도 시각화 (따릉이 API + Kakao Map + Vercel Serverless)

서울시 공공자전거 실시간 데이터를 활용하여 대여소 위치와 잔여 자전거 대수를 지도 위에 시각화한 프로젝트입니다.
카카오맵 JavaScript API와 Vercel Serverless Functions를 이용해 전체 데이터를 HTTPS로 안정적으로 불러올 수 있도록 구성하였습니다.

https://yssong01.github.io/bike_rental/


서울시 공공자전거 실시간 지도 시각화 (따릉이 API + Kakao Map + Vercel Serverless)

서울시 공공자전거 실시간 데이터를 활용하여 대여소 위치와 잔여 자전거 대수를 지도 위에 시각화한 프로젝트입니다.
카카오맵 JavaScript API와 Vercel Serverless Functions를 이용해 전체 데이터를 HTTPS로 안정적으로 불러올 수 있도록 구성하였습니다.

1. 프로젝트 개요

서울시 공공자전거 실시간 정보를 지도 기반으로 확인할 수 있습니다.

대여소별 자전거 재고 수량에 따라 색상이 다른 마커를 자동 표시합니다.

마커 클러스터링 기능을 적용하여 많은 데이터도 빠르게 확인할 수 있습니다.

Vercel Serverless Function을 이용해 HTTP(Open API)를 HTTPS(GitHub Pages)에서 호출 가능하도록 구성하였습니다.

2. 주요 기술 스택

HTML, CSS, Vanilla JavaScript

Kakao Maps JavaScript API

Vercel Serverless Functions

서울시 공공데이터 API (따릉이 실시간 대여소 정보)

GitHub Pages

3. 기능 설명

실시간 전체 대여소 데이터 자동 로딩

1~1000, 1001~2000, … 등 페이지를 자동으로 반복 호출하여 모든 데이터를 수집합니다.

전체 데이터를 모아서 프론트에 전달합니다.

마커 표시 기능

0대: 빨강

1~4대: 주황

5대 이상: 초록

SVG 기반의 원형 이미지 마커로 구현되었습니다.

마커 클러스터링

많은 수의 대여소를 단순화하여 지도 성능을 유지합니다.

줌 레벨에 따라 자동으로 풀리거나 합쳐집니다.

대여소 정보 팝업

클릭 시 인포윈도우로 상세 정보 제공

대여소명, 거치대 수, 잔여 자전거 수, 거치율 표시

4. 서버 구성 (Vercel Serverless API)

GitHub Pages는 HTTPS 환경에서 동작하며, 서울시 OpenAPI는 HTTP만 제공되므로 Mixed Content 오류가 발생합니다. 이를 해결하기 위해 Vercel Serverless Function을 사용합니다.
HTTPS(Frontend) → HTTPS(Vercel) → HTTP(Seoul API) 방식으로 안정적인 통신이 가능합니다.

경로

/api/bike

파일 위치
api/bike.js

주요 기능

1~1000, 1001~2000 … 반복 호출로 전체 데이터 처리

JSON 형태로 total, rows 응답 제공

CORS 허용

5. 서버 코드 예시

- api/bike.js

6. 프론트엔드 코드 요약

- index.html

주요 역할

카카오맵 로드 및 초기 설정

Vercel API(/api/bike) 호출

전체 대여소 데이터를 지도 위 마커로 표시

마커 색상, 클릭 이벤트, 클러스터링 적용

7. 폴더 구조
project/
 ├── api/
 │    └── bike.js
 ├── index.html
 └── README.md

8. 설치 및 사용 방법

저장소 클론

git clone https://github.com/사용자명/저장소명.git


Vercel에 프로젝트 Import

폴더 내 /api/bike.js 자동 인식

도메인 할당 후 API endpoint 생성

index.html 수정

PROXY_BASE_URL 값을 Vercel 주소로 변경

GitHub Pages 활성화

Settings → Pages → 배포 브랜치 선택

웹페이지 접속 후 데이터 불러오기 버튼 클릭

9. 참고 사항

서울시 공공자전거 API는 1000개 단위로 데이터를 제공하므로 반드시 반복 호출이 필요합니다.

Vercel Serverless는 무료 요금제로 충분히 운영 가능합니다.

API 인증키 노출 이슈가 있으므로, 장기적으로는 .env와 Vercel 환경 변수를 사용하는 것이 좋습니다.
