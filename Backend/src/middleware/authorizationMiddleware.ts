import { Role } from "../models/Auth";
import { Request, Response, NextFunction } from "express"

export const authorize = (allowedRoles: Role[]) => 
    (req: Request, res: Response, next: NextFunction) => {

        if(req.user && allowedRoles.length && !allowedRoles.includes(req.user?.role)) {
            // console.log(req.user)
            return res.status(403).json({error: "No permision"})
        }

        next()
    }