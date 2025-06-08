import Joi from 'joi';

// 상품(Product) 데이터 유효성 검증을 위한 스키마
const productSchema = Joi.object({
    // title은 문자열 타입에, 최소 1글자 이상이어야 하며, 필수 항목입니다.
    title: Joi.string().min(1).required().messages({
        'string.base': '상품명(title)은 문자열이어야 합니다.',
        'string.empty': '상품명(title)을 입력해주세요.',
        'string.min': '상품명(title)은 최소 1글자 이상이어야 합니다.',
        'any.required': '상품명(title)은 필수 항목입니다.',
    }),
    // description은 문자열 타입에, 최소 1글자 이상이어야 하며, 필수 항목입니다.
    description: Joi.string().min(1).required().messages({
        'string.base': '상품 설명(description)은 문자열이어야 합니다.',
        'string.empty': '상품 설명(description)을 입력해주세요.',
        'string.min': '상품 설명(description)은 최소 1글자 이상이어야 합니다.',
        'any.required': '상품 설명(description)은 필수 항목입니다.',
    }),
    // status는 문자열 타입이며, 'FOR_SALE' 또는 'SOLD_OUT' 값만 허용합니다.
    // 이 필드는 선택 사항이므로 .required()를 붙이지 않습니다.
    status: Joi.string().valid('FOR_SALE', 'SOLD_OUT').messages({
        'string.base': '상품 상태(status)는 문자열이어야 합니다.',
        'any.only': '상품 상태(status)는 [FOR_SALE, SOLD_OUT] 중 하나여야 합니다.',
    }),
});

// 상품 유효성 검증 미들웨어
export const productValidator = async (req, res, next) => {
    try {
        // req.body의 데이터 유효성을 productSchema를 기준으로 검증합니다.
        await productSchema.validateAsync(req.body);
        next(); // 유효성 검사를 통과하면 다음 미들웨어 또는 라우터 핸들러로 이동
    } catch (error) {
        // 유효성 검사에 실패하면 400 Bad Request 상태 코드와 함께 에러 메시지를 응답합니다.
        res.status(400).json({ message: error.details[0].message });
    }
};