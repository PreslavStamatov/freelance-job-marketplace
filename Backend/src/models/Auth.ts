import { JwtPayload } from "jsonwebtoken";

export type RegisterUser= {
    email: string;
    password: string;
}

export type User = {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role?: Role;
    image?: string;
}

export type Role = "freelancer" | "employer";

export interface AccessTokenPayload extends JwtPayload {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    role: Role;
}

export interface AuthenticatedUser extends AccessTokenPayload {
    
}

export type PersistedUser = {
    id: number;
    email: string;
    password: string;
    role: string;
    firstName: string;
    lastName: string;
}

export type LoginInfo = {
    email: string;
    password: string;
}

export type RefreshToken = {
    id: number;
    userId: number;
    tokenHash: string;
    expiresAt: string;
    createdAt: string;
}

export type LoginWithGoogleBody = {
    credential: string;
}

export type GoogleUser = {
    googleId: string;
    email: string | undefined;
    name: string | undefined;
    picture: string | undefined;
}

export type GoogleUserPersistDb = {
    googleId: string;
    firstName: string | undefined;
    lastName?: string | undefined;
    email: string | undefined;
}

export type AccountSetupImportDto = {
    firstName: string;
    lastName: string;
    role: "freelancer" | "employer";
}