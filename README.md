# 🚴 서울시 공공자전거 실시간 대여정보 시각화

서울시 공공자전거(따릉이) 실시간 대여소 정보를 지도 위에 시각적으로 표현하는 웹 애플리케이션입니다.

[![Deploy](https://img.shields.io/badge/demo-live-brightgreen)](https://yssong01.github.io/bike_rental/)
[![GitHub](https://img.shields.io/badge/github-repo-blue)](https://github.com/yssong01/bike_rental)
[![Vercel](https://img.shields.io/badge/vercel-deployed-black)](https://vercel.com)

## 🎬 사용 방법

**[🚀 Live Demo](https://yssong01.github.io/bike_rental/)** 클릭 → **데이터 불러오기** → **원하는 마커 클릭** → **말풍선 정보 확인**

---

## 📌 프로젝트 개요

GitHub Pages 환경에서 따릉이 실시간 대여소 데이터를 표시하기 위해 **Vercel Serverless Functions(VSF)**를 활용하여 **HTTP → HTTPS Proxy**를 구성한 프로젝트입니다.

### 🔐 문제 상황 및 해결

```
❌ 문제:
   서울시 API는 HTTP만 지원
   GitHub Pages는 HTTPS만 지원
   → Mixed Content 오류로 직접 호출 불가

✅ 해결:
   GitHub Pages (HTTPS)
        ↓
   Vercel Serverless (HTTPS Proxy)
        ↓
   Seoul OpenAPI (HTTP)
```

### ✨ 프로젝트 특징

- 🗺️ **카카오 지도 JS API** - `config.js`로 키 분리 관리
- 🎨 **스타일 분리** - `style.css`로 UI 코드 모듈화
- 💬 **고급 말풍선** - CustomOverlay + 애니메이션 + 토글 기능
- 🔐 **보안 강화** - Vercel Environment Variables로 API Key 보호

---

## 🎯 주요 기능

| 기능 | 설명 |
|-----|------|
| 🗺️ **실시간 지도 시각화** | Kakao Maps 기반 대여소 위치 표시 |
| 🎨 **마커 색상 구분** | 잔여 자전거 수에 따라 자동 색상 적용 (0 대/ 1 ~ 4 대 / 5 대 이상) |
| 📊 **클러스터링 적용** | 수천 개의 대여소를 효율적으로 표기 |
| 🔍 **클릭 말풍선** | 클릭 시 상세 정보 표시 |
| ❌ **토글 기능** | 다시 클릭하면 말풍선 닫힘 |
| 🔄 **자동 페이징** | 전체 데이터 자동 병합 (1 ~ 1000, 1001 ~ 2000...) |
| 🔐 **환경 변수** | 서울 OpenAPI Key를 Vercel에서 안전하게 관리 |

### 🌟 말풍선 UI 고급 기능

- ✅ 자동 가로폭 조정 (컨텐츠 길이에 맞춤)
- ✅ 말풍선 꼬리(Arrow) 스타일 적용
- ✅ 배경 반투명 처리
- ✅ Hover 시 scale-up + 그림자 강조
- ✅ 등장/사라짐 애니메이션
- ✅ 텍스트 줄바꿈 방지 (`white-space: nowrap`)

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| **Frontend** | HTML, CSS, JavaScript |
| **Map API** | Kakao Maps JavaScript API |
| **Data API** | 서울시 공공자전거 실시간 API |
| **Backend** | Vercel Serverless Functions |
| **Hosting** | GitHub Pages |
| **보안** | Environment Variables |

---

## 📂 프로젝트 구조

```
bike_rental/
├── api/
│   └── bike.js              # Vercel HTTPS→HTTP Proxy + 전체 데이터 병합
├── css/
│   └── style.css            # 지도/말풍선 UI 스타일 분리
├── js/
│   └── config.js            # Kakao JS API Key (도메인 기반 보안)
├── index.html               # 메인 페이지 (동적 Kakao SDK 로드)
└── README.md
```

---

## 🎨 프론트엔드 기능 상세

### 1️⃣ 지도 + 마커 + 클러스터링

- Kakao Maps SDK를 동적으로 로드
- 재고 수량에 따라 색상 구분된 SVG 원형 마커 생성
- 마커 클릭 시 CustomOverlay 말풍선 표시
- 다시 클릭하면 말풍선이 닫히는 **Toggle 기능** 적용
- 클러스터링으로 성능 개선

#### 마커 색상 규칙

| 재고 수량 | 마커 색상 | 재고 |
|----------|---------|------|
| 0대 | 🔴 빨강 | 없음 |
| 1~4대 | 🟠 주황 | 부족 |
| 5대 이상 | 🟢 초록 | 충분 |

### 2️⃣ 맞춤형 말풍선 (CustomOverlay)

현재 말풍선은 다음 기능을 모두 포함합니다:

- ✔️ 말풍선 자동 가로폭
- ✔️ 텍스트 줄바꿈 방지 (`white-space: nowrap`)
- ✔️ 꼬리(arrow) 스타일
- ✔️ 헤더/본문 분리된 UI
- ✔️ Hover 시 scale-up + 그림자 강조
- ✔️ 나타날 때 "살짝 커지면서 올라오는" 애니메이션
- ✔️ 사라질 때 "축소 + 투명도 감소" 애니메이션

---

## 🔧 Vercel 서버 측 기능

### 1️⃣ 전체 페이지 자동 통합

서울시 OpenAPI는 1,000개 단위 페이징이므로:

```
1~1000 → 1001~2000 → 2001~3000 → ...
```

Vercel 서버에서 자동 반복 호출하여 하나의 배열(`rows`)로 만들어 프론트에 전달합니다.

### 2️⃣ 환경 변수로 API Key 보호

**Vercel Dashboard → Environment Variables**

```
Key: SEOUL_API_KEY
Value: <서울_오픈API_키>
```

`api/bike.js`에서는 다음과 같이 로드합니다:

```javascript
const API_KEY = process.env.SEOUL_API_KEY;
```

---

## ⚙️ 환경 변수 설정

### ✔️ 로컬 개발 시

프로젝트 루트에 `.env.local` 생성:

```env
SEOUL_API_KEY=여기에_서울_키
```

`.gitignore`에 추가:

```
.env
.env.local
.env.*.local
```

### ✔️ Vercel 배포 시

1. Dashboard → **Settings** → **Environment Variables**
2. **Key**: `SEOUL_API_KEY`
3. **Value**: 입력 후 **Save**
4. 신규 Deployment 자동 생성됨

---

## 🏗️ 서버 아키텍처

```
┌─────────────────────────────┐
│  GitHub Pages (Frontend)    │
│  HTTPS ✅                    │
└──────────────┬──────────────┘
               │
               ↓
┌─────────────────────────────┐
│  Vercel Serverless          │
│  HTTPS Proxy + CORS ✅      │
└──────────────┬──────────────┘
               │
               ↓
┌─────────────────────────────┐
│  Seoul Public API           │
│  HTTP (OpenAPI)             │
└─────────────────────────────┘
```

---

## 🚀 설치 및 배포

### 1. Git 클론

```bash
git clone https://github.com/yssong01/bike_rental.git
cd bike_rental
```

### 2. Vercel 배포

1. [vercel.com](https://vercel.com) 접속 후 로그인
2. **New Project** → GitHub repo 선택
3. `/api/bike.js` 자동 인식 확인
4. **Deploy** 클릭
5. 배포 후 주소 확인:
   ```
   https://<your-vercel>.vercel.app/api/bike
   ```

### 3. index.html 수정

Vercel 주소를 `PROXY_BASE_URL`에 입력:

```javascript
const PROXY_BASE_URL = "https://<your-vercel>.vercel.app/api/bike";
```

### 4. GitHub Pages 설정

1. GitHub 저장소 → **Settings**
2. **Pages** 메뉴 선택
3. **Source**에서 브랜치 선택 → **Save**
4. 접속: `https://your-id.github.io/bike_rental/`

### 5. 환경 변수 설정

Vercel Dashboard에서:

1. **Settings** → **Environment Variables**
2. `SEOUL_API_KEY` 추가
3. 재배포 (자동)

---

## 🌐 API 정보

### 서울시 공공자전거 실시간 API

- **출처**: [서울 열린데이터 광장](https://data.seoul.go.kr/dataList/OA-15493/A/1/datasetView.do)
- **Format**: XML/JSON
- **Paging**: 1,000개 단위
- **Update**: 실시간

### 카카오맵 API

- **SDK**: JavaScript API
- **가이드**: [Kakao Maps API 문서](https://apis.map.kakao.com/web/guide/)
- **요구사항**: JavaScript 키 + 도메인 등록 필수

---

## 📝 참고 사항

- 서울시 공공자전거 API는 1,000개 단위 페이징이 필수입니다
- Vercel 무료 요금제로 충분히 운영 가능합니다
- API 인증키는 환경 변수로 관리하는 것을 권장합니다
- 카카오맵 API 키는 **도메인 등록**이 필요합니다
- Mixed Content 오류 방지를 위해 Proxy 서버 필수

---

## 🎓 학습 포인트

이 프로젝트를 통해 배울 수 있는 것들:

- ✅ HTTP ↔ HTTPS 문제 해결 (Proxy 패턴)
- ✅ Serverless Functions 활용
- ✅ 환경 변수 보안 관리
- ✅ 대용량 데이터 페이징 처리
- ✅ Kakao Maps API 통합
- ✅ CustomOverlay 커스터마이징
- ✅ CSS 애니메이션 및 인터랙션

---

## 🚀 데모

**Live Demo**: [https://yssong01.github.io/bike_rental/](https://yssong01.github.io/bike_rental/)

---

## 📄 라이선스

이 프로젝트는 서울시 공공데이터와 카카오맵 API를 활용합니다. 각 서비스의 이용 약관을 준수해야 합니다.

---

## 👨‍💻 개발자

**yssong01** - [GitHub Profile](https://github.com/yssong01)

---
