# Aegis Mypage

단국대학교 정보보안동아리 Aegis의 마이페이지 웹 애플리케이션입니다.

## 📋 프로젝트 개요

React와 TypeScript를 기반으로 구축된 단일 페이지 애플리케이션(SPA)으로, 동아리 회원들의 포인트 관리, 쿠폰 시스템, 포인트샵, 랭킹 등의 기능을 제공합니다.

## 🚀 주요 기능

### 🏠 홈 페이지
- 사용자 프로필 및 활동 요약
- 빠른 액세스 대시보드

### 💰 포인트 시스템
- 포인트 잔액 조회
- 포인트 적립/사용 내역
- 포인트 뽑기 시스템 (3D 가챠 머신)

### 🎁 쿠폰 & 뽑기
- 보유 쿠폰 관리
- 쿠폰 사용 내역
- 뽑기 아이템 관리

### 🛒 포인트샵
- 포인트로 아이템 구매
- 상품 카탈로그 및 가챠 리스트

### 🏆 랭킹 시스템
- 회원 포인트 랭킹
- 개인 순위 확인

### 🔐 인증 시스템
- 자동 로그인 상태 관리
- 권한 기반 페이지 접근 제어

## 🛠 기술 스택

### Frontend
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **React Router DOM** - 클라이언트 사이드 라우팅
- **Tailwind CSS** - 스타일링
- **React Three Fiber** - 3D 그래픽스 (가챠 머신)
- **React Icons** - 아이콘 컴포넌트
- **React Toastify** - 알림 시스템

### Development
- **Vite** - 빌드 도구 및 개발 서버
- **Biome** - 코드 품질 관리
- **PostCSS** - CSS 후처리
- **Axios** - HTTP 클라이언트

## 📁 프로젝트 구조

```
src/
├── api/           # API 통신 로직
├── components/    # 재사용 가능한 UI 컴포넌트
├── contexts/      # React Context (인증 등)
├── hooks/         # 커스텀 React 훅
├── pages/         # 페이지 컴포넌트
├── assets/        # 정적 자산
├── constants/     # 상수 정의
├── model/         # 데이터 모델/타입
├── style/         # 스타일 파일
├── utils/         # 유틸리티 함수
└── App.tsx        # 메인 앱 컴포넌트
```

## 🚀 시작하기

### 필수 요구사항
- Node.js (권장: 최신 LTS 버전)
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **프로덕션 빌드**
   ```bash
   npm run build
   ```

4. **빌드 미리보기**
   ```bash
   npm run preview
   ```

5. **린트 검사**
   ```bash
   npm run lint
   ```

6. **정리**
   ```bash
   npm run clean
   ```

## 🔗 라우팅

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | Home | 메인 대시보드 |
| `/category/points` | Points | 포인트 관리 |
| `/category/giftbox/coupons` | Coupons | 쿠폰 관리 |
| `/category/giftbox/history` | History | 사용 내역 |
| `/category/pointshop` | PointShop | 포인트샵 |
| `/category/ranking` | Ranking | 랭킹 |
| `/login/auth` | LoginAuth | 로그인 |
| `/login/unauthorized` | UnAuthorized | 권한 없음 |

## 🔒 인증 시스템

AuthContext를 통해 전역 인증 상태를 관리하며, 페이지 접근 시 자동으로 인증 상태를 확인합니다.

## 🎮 3D 기능

Three.js 기반의 React Three Fiber를 사용하여 포인트 뽑기용 3D 가챠 머신을 구현했습니다.

## 🐳 Docker 지원

프로젝트에는 Docker 설정이 포함되어 있어 컨테이너화된 배포가 가능합니다.

## 📝 라이선스

이 프로젝트는 단국대학교 정보보안동아리 Aegis의 내부 프로젝트입니다.
