import { Database } from "sqlite"
import { AccountSetupImportDto, AuthenticatedUser, GoogleUserPersistDb, PersistedUser } from "../models/Auth";

export const getUserByGoogleId = async (db: Database, googleId: string) => {
    const querry = "SELECT id, email, firstName, lastName, role FROM users WHERE googleId = ?";
    const user: AuthenticatedUser | undefined = await db.get(querry, googleId);
    return user;
}

export const getUserByEmail = async (db: Database, email: string | undefined) => {
    const querry = "SELECT id, email, firstName, lastName, role FROM users WHERE email = ?";
    const user: AuthenticatedUser | undefined = await db.get(querry, email);
    return user;
}

export const getUserById = async (db: Database, id: number | undefined) => {
    const querry = "SELECT id, email, password, firstName, lastName, role FROM users WHERE id = ?";
    const user: PersistedUser | undefined = await db.get(querry, id);
    return user;
}

export const createGoogleUser = async (db: Database, googleUser: GoogleUserPersistDb) => {
    const querry = 'INSERT INTO users(googleId, firstName, lastName, email) VALUES (?, ?, ?, ?)';
    return await db.run(querry, [googleUser.googleId, googleUser.firstName, googleUser.lastName ? googleUser.lastName : null, googleUser.email]);
}

export const getAllUsers = async (db: Database) => {
    return await db.all("SELECT * FROM users");
}

export const assignGoogleIdToUser = async(db: Database, googleId: string, email: string | undefined) => {
    return await db.run("UPDATE users SET googleId = ? WHERE email = ?", [googleId, email])
}

export const setupAccount = async (db: Database, accountSetup: AccountSetupImportDto, userId: number | undefined): Promise<PersistedUser | undefined> => {
    await db.run(`UPDATE users SET firstName = ?, lastName = ?, role = ? WHERE id = ?`,
        [accountSetup.firstName, accountSetup.lastName, accountSetup.role, userId])
    return await getUserById(db, userId);
}