import { jwtDecrypt, JWTPayload, SignJWT } from "jose";

const secretKey = new TextEncoder().encode("my-very-secret-key");
const expiresIn = "10min";

export async function createJWT(payload: JWTPayload) {
  if (!payload.userId) {
    throw Error("UserId іs required in JWT payload");
  }

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

export async function decodeToken(token: string) {
  try {
    return jwtDecrypt(token, secretKey);
  } catch (error) {
    return null;
  }
}