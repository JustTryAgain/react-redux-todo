import { jwtDecrypt, JWTPayload, SignJWT } from "jose";

const secretKey = new TextEncoder().encode("my-very-secret-key");
// min
export const expiresIn = 10;

export async function createJWT(payload: JWTPayload) {
  if (!payload.userId) {
    throw Error("UserId іs required in JWT payload");
  }

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + expiresIn * 60 * 1000))
    .sign(secretKey);
}

export async function decodeToken(token: string) {
  try {
    return jwtDecrypt(token, secretKey);
  } catch (error) {
    return null;
  }
}