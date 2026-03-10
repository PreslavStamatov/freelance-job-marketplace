import type { User } from "../store/models/userTypes";

export type LoginSuccess = {
    accessToken: string;
    user: User;
}

export type AccountSetupState = {
    firstName: string | null;
    lastName: string | null;
    role: "freelancer" | "employer" | null;
}