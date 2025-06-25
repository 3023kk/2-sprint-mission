// routes/products.js
import express from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../utils/prisma/index.js';
import { productValidator } from '../middlewares/product-validator.middleware.js';

// 3. router 선언은 한 번만 합니다.
const router = express.Router();

/** 상품 목록 조회 API (검색, 정렬, 페이지네이션 포함) **/
router.get('/', asyncHandler(async (req, res) => { 
    const { sortBy = 'createdAt', sortOrder = 'desc', search, page, limit } = req.query;

    const whereCondition = search
        ? {
            OR: [
                { title: { contains: search } },
                { description: { contains: search } },
            ]
        }
        : {};
    
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skipNum = (pageNum - 1) * limitNum;

    const products = await prisma.products.findMany({
        where: whereCondition,
        orderBy: {
            [sortBy]: sortOrder.toLowerCase(),
        },
        take: limitNum,
        skip: skipNum,
    });

    res.json(products);
}));

/** 상품 상세 조회 API **/
router.get('/:productId', asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const product = await prisma.products.findUnique({
        where: { productId: Number(productId) },
    });

    if (!product) {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    res.json(product);
}));

/** 상품 등록 API (+유효성 검증) **/
router.post('/', productValidator, asyncHandler(async (req, res) => {
    const { title, description } = req.body; 
    
    // 사용자 인증 기능 구현 후 실제 사용자 ID를 넣을 예정
    const authorId = req.user.userId;

    const newProduct = await prisma.products.create({
        data: { 
            authorId, // 누가 작성했는지
            title,      // 상품 이름
            description // 상품 설명
        },
    });

    res.status(201).json(newProduct);
}));

export default router;
