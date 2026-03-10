import { Request, Response } from "express"
import { AuthenticatedUser, GoogleUser, LoginWithGoogleBody, PersistedUser, Role } from "../models/Auth";
import { verifyGoogleToken } from "../utils/googleToken";
import { openDb } from "../db";
import { assignGoogleIdToUser, createGoogleUser, getAllUsers, getUserByEmail, getUserByGoogleId } from "../repositories/user";
import { generateAccessToken } from "../utils/jwt";
import { assignRefreshTokenToUser } from "./refreshToken";

export const loginWithGoogleController = async (req: Request, res: Response) => {

    const body: LoginWithGoogleBody = req.body;
    const db = await openDb();
    const googleUser: GoogleUser = await verifyGoogleToken(body.credential);

    //1. CHECK IF USER WITH THIS GOOGLE EMAIL EXISTS IN DB(SEARCH BY GOOGLE ID FIRST THEN IF NO USER IS FOUND BY EMAIL)
    //2. IF USER DOESNT EXIST CREATE USER
    //3. ASSIGN GOOGLE ID TO USER
    //4. PROVIDE JWT
    let user: AuthenticatedUser | undefined = await getUserByGoogleId(db, googleUser.googleId);

    if(!user) {
        user = await getUserByEmail(db, googleUser.email);
        await assignGoogleIdToUser(db, googleUser.googleId, googleUser.email)
    }

    if(!user) {
        const fullName: string[] | undefined = googleUser.name?.split(" ");
        if(fullName) {
            createGoogleUser(db, {googleId: googleUser.googleId, firstName: fullName[0], lastName: fullName[1], email: googleUser.email})
            user = await getUserByGoogleId(db, googleUser.googleId);
        }
    }


    if(user) {
        const accessToken = generateAccessToken({id: user?.id, email: user?.email, role: user?.role as Role})
        await assignRefreshTokenToUser(res, user.id);
        return res.status(200).json({
            accessToken: accessToken,
            user: {id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role}
        })
    }
    
}