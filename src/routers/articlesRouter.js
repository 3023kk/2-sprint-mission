import express from 'express';
import { withAsync } from '../lib/withAsync.js';
import {
  createArticle,
  getArticleList,
  getArticle,
  updateArticle,
  deleteArticle,
  createComment,
  getCommentList,
} from '../controllers/articlesController.js';
import authMiddleware from '../middlewares/auth.middleware.js';
//import { createArticle } from '../controllers/articlesController.js';

const router = express.Router();

router.post('/articles', authMiddleware, (req, res) => {
  // 여기부터는 로그인된 사용자만 접근 가능!
  res.send(`안녕하세요, ${req.user.email}님!`);
});
router.post('/', authMiddleware, createArticle);

const articlesRouter = express.Router();

articlesRouter.post('/', authMiddleware, withAsync(createArticle));
articlesRouter.get('/', withAsync(getArticleList));
articlesRouter.get('/:id', withAsync(getArticle));
articlesRouter.patch('/:id', withAsync(updateArticle));
articlesRouter.delete('/:id', withAsync(deleteArticle));
articlesRouter.post('/:id/comments', withAsync(createComment));
articlesRouter.get('/:id/comments', withAsync(getCommentList));

export default  router;
