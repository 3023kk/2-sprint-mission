
const express = require('express');
const router = express.Router();
const { db } = require('../utils/db.js'); // ../models/index.js 에서 db를 가져옵니다.
const asyncHandler = require('express-async-handler');
// const { db } = require('../models'); // 실제 프로젝트의 DB 모델 경로에 맞게 수정해주세요.

// =======================================================
//   게시글(Article) CRUD API
// =======================================================

// 1. 게시글 생성 (POST /articles)
router.post('/', asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) { // 간단한 유효성 검사
    return res.status(400).json({ message: '제목과 내용은 필수입니다.' });
  }
  const newArticle = await db.article.create({
    data: { title, content },
  });
  res.status(201).json(newArticle);
}));

// 2. 게시글 목록 조회 (GET /articles) - 이전에 기능 심화 완료!
router.get('/', asyncHandler(async (req, res) => {
  const { sortBy = 'createdAt', sortOrder = 'desc', search, page, limit } = req.query;
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const offset = (pageNum - 1) * limitNum;
  const whereCondition = search ? { OR: [{ title: { contains: search } }, { content: { contains: search } }] } : {};

  const articles = await prisma.article.findMany({
    where: whereCondition,
    orderBy: { [sortBy]: sortOrder.toLowerCase() },
    skip: offset,
    take: limitNum,
  });
  res.json(articles);
}));

// 3. 게시글 상세 조회 (GET /articles/:articleId)
router.get('/:articleId', asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const article = await db.article.findUnique({
    where: { id: Number(articleId) },
  });
  if (!article) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
  }
  res.json(article);
}));

// 4. 게시글 수정 (PATCH /articles/:articleId)
router.patch('/:articleId', asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const { title, content } = req.body;
  const updatedArticle = await db.article.update({
    where: { id: Number(articleId) },
    data: { title, content },
  });
  res.json(updatedArticle);
}));

// 5. 게시글 삭제 (DELETE /articles/:articleId)
router.delete('/:articleId', asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  await db.article.delete({
    where: { id: Number(articleId) },
  });
  res.status(204).send();
}));


// =======================================================
//   특정 게시글의 댓글(Comment)에 대한 API
// =======================================================

// GET /articles/:articleId/comments - 댓글 목록 조회 (커서 기반)
router.get('/:articleId/comments', asyncHandler(async (req, res) => {
    // ... 이전에 완성한 커서 기반 페이지네이션 코드 ...
}));

// POST /articles/:articleId/comments - 댓글 생성
router.post('/:articleId/comments', asyncHandler(async (req, res) => {
    // ... 이전에 완성한 댓글 생성 코드 ...
}));


module.exports = router;