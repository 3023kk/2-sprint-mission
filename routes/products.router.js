// routes/products.router.js (최종 진짜 마지막 수정본)

import express from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../utils/prisma.js';
import { productValidator } from '../middlewares/product-validator.middleware.js';

const router = express.Router();

/** 상품 등록 API (+유효성 검증) **/
router.post('/', productValidator, asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const authorId = 1; // 임시로 사용자 ID를 1로 설정합니다.

    const newProduct = await prisma.products.create({
        data: { authorId, title, description },
    });

    res.status(201).json(newProduct);
}));

/** 상품 목록 조회 API **/
router.get('/', asyncHandler(async (req, res) => {
    const { sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const products = await prisma.products.findMany({
        orderBy: { [sortBy]: sortOrder.toLowerCase() },
    });
    res.json(products);
}));

/** 상품 상세 조회 API **/
router.get('/:productId', asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const product = await prisma.products.findUnique({
        where: { productId: Number(productId) },
    });
    if (!product) return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    res.json(product);
}));

/** 상품 수정 API **/
router.patch('/:productId', asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { title, description, status } = req.body;
    const authorId = 1; // 임시로 사용자 ID를 1로 설정합니다.

    const product = await prisma.products.findUnique({ where: { productId: Number(productId) } });
    if (!product) return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    if (product.authorId !== authorId) return res.status(403).json({ message: '수정 권한이 없습니다.' });

    const updatedProduct = await prisma.products.update({
        where: { productId: Number(productId) },
        data: { title, description, status },
    });
    res.json(updatedProduct);
}));

/** 상품 삭제 API **/
router.delete('/:productId', asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const authorId = 1; // 임시로 사용자 ID를 1로 설정합니다.

    const product = await prisma.products.findUnique({ where: { productId: Number(productId) } });
    if (!product) return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    if (product.authorId !== authorId) return res.status(403).json({ message: '삭제 권한이 없습니다.' });

    await prisma.products.delete({ where: { productId: Number(productId) } });
    res.status(204).send();
}));

export default router;