const express = require('express');
const router = express.Router();
const { db } = require('../utils/db.js'); // ../models/index.js 에서 db를 가져옵니다.
const asyncHandler = require('express-async-handler');
// const { db } = require('../models'); // DB 모델 불러오기

// 특정 댓글 수정하기
// PATCH /comments/:commentId
router.patch('/:commentId', asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  const updatedComment = await prisma.comment.update({
    where: { id: Number(commentId) },
    data: { content },
  });

  res.json(updatedComment);
}));

// 특정 댓글 삭제하기
// DELETE /comments/:commentId
router.delete('/:commentId', asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  await db.comment.delete({
    where: { id: Number(commentId) },
  });

  res.status(204).send(); // 성공했지만 보여줄 내용은 없음
}));

module.exports = router;