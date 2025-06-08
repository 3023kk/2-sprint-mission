// prisma/seed.js

import { prisma } from '../utils/prisma.js'; // 우리가 만든 prisma 클라이언트
import bcrypt from 'bcrypt'; // 비밀번호 암호화를 위한 bcrypt

async function main() {
  console.log('시딩 작업을 시작합니다...');

  // 1. 테스트용 사용자 생성
  const testUser = await prisma.users.create({
    data: {
      email: 'test@example.com',
      // 비밀번호는 반드시 암호화해서 저장해야 합니다.
      password: await bcrypt.hash('password123', 10),
    },
  });
  console.log('테스트 사용자가 생성되었습니다: test@example.com');

  // 2. 테스트용 상품 2개 생성 (위에서 만든 사용자와 연결)
  await prisma.products.create({
    data: {
      authorId: testUser.userId, // 생성된 사용자의 ID를 사용
      title: '테스트 상품 1',
      description: '이것은 시딩 데이터로 생성된 첫 번째 테스트 상품입니다.',
      status: 'FOR_SALE',
    },
  });

  await prisma.products.create({
    data: {
      authorId: testUser.userId,
      title: '테스트 상품 2 (판매 완료)',
      description: '이것은 시딩 데이터로 생성된 두 번째 테스트 상품입니다.',
      status: 'SOLD_OUT',
    },
  });
  console.log('테스트 상품 2개가 생성되었습니다.');
  console.log('시딩 작업이 성공적으로 완료되었습니다.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 스크립트 실행이 끝나면 Prisma 클라이언트와의 연결을 끊습니다.
    await prisma.$disconnect();
  });