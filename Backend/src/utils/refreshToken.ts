import crypto from "crypto"

export const hashToken = (token: string): string => {
  console.log(token)
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export const generateRefreshToken = (): string => {
    return crypto.randomBytes(64).toString("hex");
}

export const validateRefreshToken = (plainToken: string, hashedToken: string): boolean => {
  return hashToken(plainToken) === hashedToken;
}

export const isRefreshTokenExpired = (expiresIn: string): boolean => {
    const now = new Date();
    const expiresInDate = new Date(expiresIn);
    return expiresInDate > now;
}