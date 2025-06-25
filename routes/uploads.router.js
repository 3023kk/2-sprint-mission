// routes/uploads.router.js (최종)

import express from 'express';
import upload from '../middlewares/multer.middleware.js'; // 'upload'를 default로 가져옴

const router = express.Router();

// 'uploadSingle'이 아니라 'upload.single('image')'를 사용합니다.
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '이미지 파일이 첨부되지 않았습니다.' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ imageUrl });
});

export default router;