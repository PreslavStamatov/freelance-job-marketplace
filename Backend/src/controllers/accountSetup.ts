import { Request, Response } from "express"
import { AccountSetupImportDto, AuthenticatedUser, PersistedUser } from "../models/Auth";
import { setupAccount } from "../repositories/user";
import { openDb } from "../db";

export const accountSetupControler = async (req: Request, res: Response) => {
    const db = await openDb();
    const body: AccountSetupImportDto = await req.body;
    const userId = req.user?.id;
    try {
        const persistedUser: PersistedUser | undefined = await setupAccount(db, body, userId);

        return res.status(200).json({
                    user: {id: persistedUser?.id, email: persistedUser?.email, firstName: persistedUser?.firstName, lastName: persistedUser?.lastName, role: persistedUser?.role}
        })
    } catch (err) {
        return res.status(409).json({error: err})
    }

}