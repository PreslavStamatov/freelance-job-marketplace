import jwt from "jsonwebtoken"
import { AccessTokenPayload } from "../models/Auth";

const JWT_SECRET = process.env.JWT_SECRET as string;
const ACCESS_TOKEN_TTL = "2m";

export const generateAccessToken = (payload: AccessTokenPayload): string => {
    if (!JWT_SECRET) {
        // console.log("secre not defined")
    }
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_TTL
    })
}