PandaMarket BE Sprint Mission 4

프로젝트 개요

중고 거래 API 서버를 구현하며, 현재 필수 요구사항 중 아래 기능들이 완료되었습니다.

완료된 기능 목록

회원가입 API (POST /users/signup)

로그인 API (POST /users/login) (비밀번호 비교 및 JWT 발급)

JWT 인증 미들웨어 (보호된 라우트 접근 시 토큰 확인)

상품/게시글/댓글 작성 시 로그인 필요 (인증 미들웨어 적용)

내 정보 조회/수정/삭제 (GET/PATCH/DELETE /users/me)

POST/PUT 요청 시 로그인 유저만 가능 (컨트롤러 레벨 권한 검사)

기술 스택

Node.js + Express

Prisma (PostgreSQL)

JWT (토큰 기반 인증)

bcrypt (비밀번호 해싱)

설치 및 실행

리포지토리 클론

git clone <repository-url>
cd sprint-mission-4

의존성 설치

npm install

환경 변수 설정

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
JWT_SECRET=your_jwt_secret

데이터베이스 마이그레이션

npx prisma migrate dev --name init

개발 서버 실행

npm run dev

프로젝트 구조

src/
├─ controllers/
├─ middlewares/
├─ routers/
├─ structs/
├─ lib/
app.js

향후 구현 예정 기능

Refresh Token 로직

좋아요(Like) 기능

상품/게시글/댓글 상세 조회 필터링 및 정렬

이미지 업로드 및 기타 심화 요구사항