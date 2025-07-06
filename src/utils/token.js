import jwt from 'jsonwebtoken';
import {
JWT_ACCESS_TOKEN_SECRET,
JWT_REFRESH_TOKEN_SECRET,
 } from '../lib/constants.js';

function generateTokens(userId) {
  const accessToken = jwt.sign({ sub: userId }, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
  const refreshToken = jwt.sign({ sub: userId }, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });
  return { accessToken, refreshToken };
}

function verifyAccessToken(token) {
  const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
  return { userId: decoded.sub };
}

function verifyRefreshToken(token) {
  const decoded = jwt.verify(token, JWT_REFRESH_TOKEN_SECRET);
  return { userId: decoded.sub };
}


import { program } from 'commander';

program
  .name('token')
  .description('사용자 토큰을 발급합니다.')
  .requiredOption('-e, --email <email>', '사용자 이메일')
  .requiredOption('-p, --password <pw>', '사용자 비밀번호')
  .parse(process.argv);

const { email, password } = program.opts();
console.log('email:', email, 'password:', password);

// 여기서 실제 토큰 발급 로직 수행...
const { accessToken, refreshToken } = generateTokens(user.id);
console.log('발급된 Access Token:', accessToken);
console.log('발급된 Refresh Token:', refreshToken);

export { generateTokens, verifyAccessToken, verifyRefreshToken };