# PandaMarket BE Sprint Mission 4

## 1. 프로젝트 개요
중고 거래 API 서버를 구현합니다.  
현재 필수 요구사항 중 아래 기능들이 모두 완료된 상태입니다.

## 2. 완료된 필수 기능

| 기능                                                         | 상태         |
|------------------------------------------------------------|------------|
| 1. 회원가입 API (`POST /users/signup`)                           | ✅   |
| 2. 로그인 API (`POST /users/login`) (비밀번호 비교 + JWT 발급)      | ✅    |
| 3. 인증 미들웨어 (JWT 확인)                                      | ✅   |
| 4. 상품/게시글/댓글 작성 시 로그인 필요 (인증 미들웨어 적용)          | ✅   |
| 5. 내 정보 조회/수정/삭제 (`GET`/`PATCH`/`DELETE /users/me`)   | ✅   |
| 6. `POST`/`PUT` 요청 시 로그인 유저만 가능 (컨트롤러 레벨 권한 검사) | ✅   |

---

## 3. 기술 스택
- **Node.js** & **Express**  
- **Prisma** (PostgreSQL)  
- **JWT** (토큰 기반 인증)  
- **bcrypt** (비밀번호 해싱)  

---

## 4. 프로젝트 구조

```text
sprint-mission-4/
├── prisma/       # Prisma 스키마 & 마이그레이션
├── src/
│   ├── controllers/  # 각종 비즈니스 로직 처리
│   ├── middlewares/  # 인증·인가·에러 핸들러
│   ├── routers/      # 라우터 정의
│   ├── structs/      # 요청·응답 DTO
│   └── lib/          # 공통 유틸리티
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 5. 향후 구현 예정 기능
Refresh Token 로직

좋아요(Like) 기능

상품/게시글/댓글 상세 조회 시 필터링 & 정렬

이미지 업로드 심화 요구사항