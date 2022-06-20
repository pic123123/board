import * as Crypto from 'crypto';
/**
 * 비밀번호 단방향 암호화 함수
 */
export function hashPassword(password: string): string {
  const hash = Crypto.createHash('sha512') //(algorithm)
    .update(password + process.env.SALT)
    .digest('base64'); //(Encoding method)
  return hash;
}
