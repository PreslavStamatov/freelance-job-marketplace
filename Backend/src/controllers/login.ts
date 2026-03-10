import {  Request, Response } from "express"
import { openDb } from "../db"
import { LoginInfo, PersistedUser, Role } from "../models/Auth";
import { verifyPassword } from "../utils/passwords";
import { generateAccessToken } from "../utils/jwt";
import { assignRefreshTokenToUser } from "./refreshToken";

export const loginController = async (req: Request, res: Response) => {
    const db = await openDb();
    const loginInfo: LoginInfo = req.body;
    const querry = `SELECT id, email, password, firstName, lastName, role FROM users WHERE email = ?`
    const persistedUser: PersistedUser | undefined = await db.get<PersistedUser>(querry, loginInfo.email);

    if (!persistedUser) {
        return res.status(404).json({message: "Wrong email"})
    }

    const isPasswordVerified = await verifyPassword(loginInfo.password, persistedUser.password);

    if (!isPasswordVerified) {
        return res.status(404).json({message: "Wrong password"})
    }

    try {
        const accessToken = generateAccessToken({id: persistedUser.id, email: persistedUser.email, role: persistedUser.role as Role})
        await assignRefreshTokenToUser(res, persistedUser.id);

        const usersTable = await db.all(`SELECT email, rt.tokenHash FROM users LEFT JOIN refresh_tokens rt ON users.id = rt.userId`);

        return res.status(200).json({
            accessToken: accessToken,
            user: {id: persistedUser.id, email: persistedUser.email, firstName: persistedUser.firstName, lastName: persistedUser.lastName, role: persistedUser.role}
        })
    } catch (err) {
        return res.status(409).json({error: err})
    }
}