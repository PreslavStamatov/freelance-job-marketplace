import type { Request, Response } from 'express';
import { PersistedUser, RegisterUser, Role } from '../models/Auth';
import { openDb } from '../db';
import { hashPassword } from '../utils/passwords';
import { generateAccessToken } from '../utils/jwt';
import { assignRefreshTokenToUser } from './refreshToken';


export const registerController = async (req: Request, res: Response) => {
    let user: RegisterUser = req.body;
    const hashedPassword = await hashPassword(user.password);
    user = {...user, password: hashedPassword};
    const db = await openDb();
    const querry = `INSERT INTO users(email, password) VALUES (?, ?)`;

    try {
        await db.run(querry, user.email, user.password);
        const persistedUser: PersistedUser | undefined = await db.get(`SELECT id, email, password, role FROM users WHERE email = ?`, user.email);
        let accessToken: string | null = null;
        if(!persistedUser) {
            return res.status(500).json({ message: "User creation failed" });
        } 
        else if (persistedUser) {
            accessToken = generateAccessToken({id: persistedUser.id, email: persistedUser.email, role: persistedUser.role as Role});
            await assignRefreshTokenToUser(res, persistedUser.id);
        }

        ////////////////

        const usersTable = await db.all(`SELECT email, rt.tokenHash FROM users LEFT JOIN refresh_tokens rt ON users.id = rt.userId`);
        // console.table(usersTable);

        /////////////////

        return res.status(201).json(
            {
                accessToken: accessToken,
                user: user
            }
        );
    } catch (err: any){
        return res.status(409).json(
            {
                error: err,
                message: err.message
            }
        );
    }
}