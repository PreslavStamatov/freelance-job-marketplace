import { openDb } from "../db";
import type { Response } from 'express';
import { generateRefreshToken, hashToken } from "../utils/refreshToken";

export const assignRefreshTokenToUser = async (res: Response, userId: number) => {

    const refreshToken = generateRefreshToken();
    const hashedRefreshToken = hashToken(refreshToken);
    const db = await openDb();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await db.run(`
            DELETE FROM refresh_tokens WHERE userId = ?
    `, userId);

    await db.run(`
            INSERT INTO refresh_tokens (userId, tokenHash, expiresAt)
            VALUES (?, ?, ?)
        `,
        userId,
        hashedRefreshToken,
        expiresAt.toISOString()
    );
    
    res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/auth/refresh"
    });
}