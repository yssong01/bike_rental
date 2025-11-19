# 🚴 서울시 공공자전거 실시간 대여정보 시각화

## 🎬 실제 작동 화면 → (https://yssong01.github.io/bike_rental/)

</div>

서울시 공공자전거(따릉이) 실시간 대여소 정보를 지도 위에 시각적으로 표현하는 웹 애플리케이션입니다.

[![Deploy](https://img.shields.io/badge/demo-live-brightgreen)](https://yssong01.github.io/bike_rental/)
[![GitHub](https://img.shields.io/badge/github-repo-blue)](https://github.com/yssong01/bike_rental)

## 📌 프로젝트 개요

GitHub Pages 환경에서 서울시 공공자전거 실시간 대여소 정보(위치, 재고 수량)를 지도 위에 시각적으로 표현합니다. Vercel Serverless Functions를 활용하여 HTTP(OpenAPI)를 HTTPS(GitHub Pages)에서 안전하게 호출할 수 있도록 구성했습니다.

### 🎯 주요 기능

- 🗺️ **실시간 지도 시각화** - 카카오맵 기반 대여소 위치 표시
- 🎨 **색상별 재고 구분** - 잔여 자전거 수에 따른 직관적인 마커 색상
- 📊 **마커 클러스터링** - 수천 개의 대여소를 효율적으로 표시
- 🔄 **자동 데이터 로딩** - 전체 대여소 정보 자동 수집
- 💡 **상세 정보 팝업** - 클릭 시 대여소별 상세 정보 제공

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| **Frontend** | HTML, CSS, JavaScript |
| **Map API** | Kakao Maps JavaScript API |
| **Data API** | 서울시 공공데이터 API (따릉이) |
| **Backend** | Vercel Serverless Functions |
| **Hosting** | GitHub Pages |

## 📂 프로젝트 구조

```
bike_rental/
├── api/
│   └── bike.js              # Vercel Serverless Function
├── index.html               # 메인 웹페이지
└── README.md               # 프로젝트 문서
```

## 🎨 기능 상세

### 1️⃣ 실시간 데이터 수집

서울시 OpenAPI는 1,000개 단위로 페이징되어 있습니다. Vercel 서버에서 다음과 같이 자동 처리합니다:

- 1~1000, 1001~2000, 2001~3000... 반복 호출
- 전체 데이터 통합 후 프론트엔드로 일괄 전달
- CORS 허용 헤더 적용

### 2️⃣ 마커 색상 구분

잔여 자전거 수에 따라 자동으로 색상이 변경됩니다:

| 재고 수량 | 마커 색상 | 의미 |
|----------|---------|------|
| 0대 | 🔴 빨강 | 대여 불가 |
| 1~4대 | 🟠 주황 | 재고 부족 |
| 5대 이상 | 🟢 초록 | 대여 가능 |

### 3️⃣ 마커 클러스터링

- 수천 개의 대여소를 자동 그룹화
- 지도 확대 시 자동으로 개별 마커 표시
- 성능 최적화로 부드러운 지도 조작

### 4️⃣ 대여소 정보 팝업

마커 클릭 시 다음 정보를 표시합니다:

- 대여소명
- 거치대 수
- 잔여 자전거 수
- 거치율

## 🔧 설치 및 배포

### 1. 저장소 클론

```bash
git clone https://github.com/yssong01/bike_rental.git
cd bike_rental
```

### 2. Vercel 프로젝트 설정

1. [Vercel](https://vercel.com) 접속 후 로그인
2. **New Project** 클릭
3. GitHub 저장소 Import
4. `/api/bike.js` 자동 인식 확인
5. **Deploy** 클릭

배포 완료 후 제공되는 Vercel API 엔드포인트를 복사합니다.

### 3. 프론트엔드 설정

`index.html` 파일에서 `PROXY_BASE_URL` 값을 수정합니다:

```javascript
const PROXY_BASE_URL = 'https://your-vercel-project.vercel.app';
```

### 4. GitHub Pages 활성화

1. GitHub 저장소 → **Settings**
2. **Pages** 메뉴 선택
3. **Source**에서 배포할 브랜치 지정 (예: `main`)
4. **Save** 클릭

### 5. 웹페이지 접속

`https://your-username.github.io/bike_rental/` 접속 후 **데이터 불러오기** 버튼을 클릭합니다.

## 🌐 API 정보

### 서울시 공공자전거 실시간 대여정보

- **URL**: [서울 열린데이터 광장](https://data.seoul.go.kr/dataList/OA-15493/A/1/datasetView.do)
- **Format**: XML
- **Update**: 실시간

### 카카오맵 API

- **Guide**: [Kakao Maps API 문서](https://apis.map.kakao.com/web/guide/)
- **Key**: JavaScript 키 필요

## 🏗️ 서버 아키텍처

GitHub Pages는 HTTPS만 지원하지만, 서울시 공공데이터 API는 HTTP로 제공됩니다. Mixed Content 오류를 해결하기 위해 다음과 같은 구조를 사용합니다:

```
Frontend (GitHub Pages, HTTPS)
    ↓
Vercel Serverless (HTTPS Proxy)
    ↓
Seoul OpenAPI (HTTP)
```

### API 엔드포인트

- **경로**: `/api/bike`
- **Method**: GET
- **Response**: 
  ```json
  {
    "total": 3000,
    "rows": [...]
  }
  ```

## ⚙️ 환경 변수 설정 (선택사항)

API 키 보안을 위해 환경 변수 사용을 권장합니다:

**Vercel Dashboard → Settings → Environment Variables**

```
SEOUL_API_KEY=your_api_key_here
KAKAO_API_KEY=your_kakao_key_here
```

## 📝 참고 사항

- 서울시 공공자전거 API는 1,000개 단위 페이징이 필수입니다
- Vercel 무료 요금제로 충분히 운영 가능합니다
- API 인증키는 환경 변수로 관리하는 것을 권장합니다
- 카카오맵 API 키는 도메인 등록이 필요합니다

## 🚀 데모

**Live Demo**: [https://yssong01.github.io/bike_rental/](https://yssong01.github.io/bike_rental/)

## 📄 라이선스

이 프로젝트는 서울시 공공데이터와 카카오맵 API를 활용합니다. 각 서비스의 이용 약관을 준수해야 합니다.

## 👨‍💻 개발자

**yssong01** - [GitHub Profile](https://github.com/yssong01)
