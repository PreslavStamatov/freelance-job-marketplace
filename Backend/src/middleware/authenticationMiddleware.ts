import { Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import { AccessTokenPayload } from "../models/Auth";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({error: "Missing access token"})
    }

    const accessToken: string | undefined = authHeader.split(" ")[1];

    try {
        if(accessToken) {
            const decodedUser: AccessTokenPayload = jwt.verify(accessToken, JWT_SECRET) as AccessTokenPayload;
            // console.log("decoded user", decodedUser)
            req.user = decodedUser;
        }
        next();
    } catch {
        return res.status(401).json({error: "Invalid or expired access token"})
    }
}   