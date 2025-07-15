// app.js

import express from 'express';
import 'dotenv/config';
import productsRouter from './routes/products.router.js';
import uploadsRouter from './routes/uploads.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// ✅ 정적 파일 제공: /uploads/파일명 으로 접근
app.use('/uploads', express.static('uploads'));

// ✅ API 라우터 연결
app.use('/api/products', productsRouter); 
app.use('/api/uploads', uploadsRouter);

// ✅ 에러 처리
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: '서버 내부에서 에러가 발생했습니다.' });
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
