# React Native + Atomic Design 프로젝트

## 프로젝트 구조

```
src/
├── components/
│   ├── atoms/          # 가장 기본적인 컴포넌트들
│   │   ├── text/
│   │   │   └── Text.js
│   │   ├── button/
│   │   │   └── Button.js
│   │   ├── image/
│   │   ├── input/
│   │   └── common/
│   ├── molecules/      # Atoms를 조합한 컴포넌트들
│   ├── organisms/      # Molecules를 조합한 복잡한 컴포넌트들
│   └── templates/      # 페이지의 레이아웃 정의
├── pages/              # 실제 화면들
├── navigation/         # 네비게이션 설정
├── assets/            # 이미지, 폰트 등 정적 자원
├── stores/            # 상태 관리 (Zustand)
└── utils/             # 유틸리티 함수들

## 실행 방법

1. 패키지 설치: `npm install`
2. 안드로이드 실행: `npm run android`
3. iOS 실행: `npm run ios`
```
