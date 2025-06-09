# 권은혜의 Sprint 3

## 데이터 베이스 셋업 

```shell
docker-compose up -d
```
> docker compose를 통해 PostgreSQL 17을 Background에서 실행합니다


```shell
npx prisma migrate dev --name "0_init"
```
# 🛒 중고마켓 API - Sprint3 미션

[https://two-sprint3-mission.onrender.com](https://two-sprint3-mission.onrender.com)

Node.js와 PostgreSQL을 이용한 중고마켓 및 자유게시판 API 서버입니다.  
상품 및 게시글 등록, 댓글 기능, 이미지 업로드, 유효성 검증, 에러 처리, 배포까지 구현했습니다.

---

## 📚 프로젝트 개요

- **주제**: 중고마켓 및 자유게시판 백엔드 API 개발
- **기술 스택**:
  - Node.js, Express.js
  - PostgreSQL
  - Sequelize (ORM)
  - Multer (이미지 업로드)
  - CORS, dotenv
- **배포**: [Render](https://render.com)

---

## 📁 폴더 구조
/src
├── controllers
├── routes
├── models
├── middlewares
├── utils
├── seeders
└── app.js
.env

---

## 🔌 API 엔드포인트

### 📦 Product (중고마켓)

- **상품 등록**: `POST /api/products`
- **상품 목록 조회**: `GET /api/products?offset=0&limit=10&sort=recent&search=키워드`
- **상품 상세 조회**: `GET /api/products/:id`
- **상품 수정**: `PATCH /api/products/:id`
- **상품 삭제**: `DELETE /api/products/:id`

### 📰 Article (자유게시판)

- **게시글 등록**: `POST /api/articles`
- **게시글 목록 조회**: `GET /api/articles?offset=0&limit=10&sort=recent&search=키워드`
- **게시글 상세 조회**: `GET /api/articles/:id`
- **게시글 수정**: `PATCH /api/articles/:id`
- **게시글 삭제**: `DELETE /api/articles/:id`

### 💬 Comments

- **댓글 등록 (상품)**: `POST /api/products/:id/comments`
- **댓글 등록 (게시글)**: `POST /api/articles/:id/comments`
- **댓글 목록 조회**: `GET /api/products/:id/comments?cursor=123`
- **댓글 수정**: `PATCH /api/comments/:id`
- **댓글 삭제**: `DELETE /api/comments/:id`

### 🖼 이미지 업로드

- **이미지 업로드**: `POST /api/upload`
  - FormData로 이미지 전송
  - 반환 예시: `{ imageUrl: "/uploads/filename.jpg" }`

---

## 🧪 유효성 검증

- 상품 등록 시: name, description, price 필수
- 게시글 등록 시: title, content 필수
- 실패 시 400 Bad Request 반환

---

## ❗ 에러 핸들링

- 400: 잘못된 요청
- 404: 리소스를 찾을 수 없음
- 500: 서버 내부 오류
- 공통 에러 미들웨어에서 처리

---

## 🔐 환경 변수 (.env)

```env
PORT=3000
DATABASE_URL=postgres://...
🚀 배포
Render.com로 배포

PostgreSQL 또한 Render에서 관리

CORS 설정 포함
