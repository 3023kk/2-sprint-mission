import { create } from 'superstruct';
import { prismaClient } from '../lib/prismaClient.js';
import bcrypt from 'bcrypt';
import { generateTokens } from '../utils/token.js';
import { signupBodyStruct, loginBodyStruct } from '../structs/usersStructs.js';


// 1) 회원가입(signup)
export async function signup(req, res) {
  // -- 1. 요청 데이터 유효성 검사
  const data = create(req.body, signupBodyStruct);

  // -- 2. 이메일·닉네임 중복 검사
  const { email, nickname, password } = data;
  if (await prismaClient.user.findUnique({ where: { email } })) {
    return res.status(400).json({ message: '이미 사용 중인 이메일입니다.' });
  }
  if (await prismaClient.user.findFirst({ where: { nickname } })) {
    return res.status(400).json({ message: '이미 사용 중인 닉네임입니다.' });
  }

  // -- 3. 비밀번호 해싱
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // -- 4. 유저 생성
  const user = await prismaClient.user.create({
    data: { email, nickname, password: hashedPassword }
  });

  // -- 5. 토큰 발급
  const tokens = generateTokens(user.id);

  // -- 6. 응답: 민감 정보 제외 + 토큰 포함
  const { password: _, ...safeUser } = user;
  return res.status(201).json({
    message: '회원가입 완료',
    user: safeUser,
    tokens,
  });
}

// 2) 로그인(login)
export async function login(req, res) {
  const data = create(req.body, loginBodyStruct);
  const { email, password } = data;

  // -- 2. 유저 조회
  const user = await prismaClient.user.findUnique({ 
    where: { email } 
  });
  if (!user) {
    return res.status(401).json({ message: '존재하지 않는 사용자입니다.' });
  }

  // -- 3. 비밀번호 비교
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
  }

  // -- 4. 토큰 발급
    const { accessToken, refreshToken } = generateTokens(user.id);

  // -- 5. 응답: 민감 정보 제외 + 토큰 포함
  const { password: _, ...safeUser } = user;
  return res.status(200).json({
    message: '로그인 성공',
    user: safeUser,
    tokens: { accessToken, refreshToken }
  });
}

// 3) 내 정보 조회(getMyProfile)
export async function getMyProfile(req, res) {
  // authMiddleware로 보장된 req.user.id 사용
  const userId = req.user.userId;
  const user = await prismaClient.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
  }
  const { password, ...safeUser } = user;
  return res.status(200).json(safeUser);
}

// 4) 내 정보 수정(updateMyProfile) 
export async function updateMyProfile(req, res) {
  const userId = req.user.userId;
  const updates = req.body;
  if (updates.password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(updates.password, salt);
  }
  const updated = await prismaClient.user.update({
    where: { id: userId },
    data: updates,
  });
  const { password, ...safeUser } = updated;
  return res.status(200).json(safeUser);
}

// 6) 로그아웃(logout)
export async function logout(req, res) {
  res.clearCookie(process.env.ACCESS_TOKEN_COOKIE_NAME);
  res.clearCookie(process.env.REFRESH_TOKEN_COOKIE_NAME);
  return res.status(204).end();
}

// 5) 회원 탈퇴(deleteUser)
export async function deleteUser(req, res) {
  const userId = req.user.userId;
  await prismaClient.user.delete({ where: { id: userId } });
  return res.status(204).end();
}

