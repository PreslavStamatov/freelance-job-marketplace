import { Request, Response } from "express"
import { openDb } from "../db";
import { hashToken, isRefreshTokenExpired } from "../utils/refreshToken";
import { generateAccessToken } from "../utils/jwt";
import { PersistedUser, RefreshToken, Role } from "../models/Auth";

export const refreshController = async (req: Request, res: Response) => {
    const refreshToken = await req.cookies.refreshToken;
    const db = await openDb();

    const getRefreshTokenQuerry = `SELECT * FROM refresh_tokens WHERE tokenHash = ?`

    const persistedRefreshToken: RefreshToken | undefined = await db.get(getRefreshTokenQuerry, hashToken(refreshToken as string))

    const getPersistedUserQuerry = `SELECT u.id, u.email, u.password, u.role FROM refresh_tokens rt LEFT JOIN users u ON u.id = rt.userId WHERE rt.tokenHash = ?`
    const persistedUser: PersistedUser | undefined = await db.get(getPersistedUserQuerry, hashToken(refreshToken));


    if (persistedUser && persistedRefreshToken && isRefreshTokenExpired(persistedRefreshToken.expiresAt)) {
        const newAccessToken: string = generateAccessToken({id: persistedUser.id, email: persistedUser.email, role: persistedUser.role as Role});
        res.status(201).json({
            accessToken: newAccessToken
        })
    } else if (persistedUser && persistedRefreshToken && !isRefreshTokenExpired(persistedRefreshToken.expiresAt)) {
        res.status(409).json({
            error: "Refresh token expired" 
        })
    }

}