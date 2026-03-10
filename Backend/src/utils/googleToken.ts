import { OAuth2Client } from "google-auth-library";
import { GoogleUser } from "../models/Auth";

export async function verifyGoogleToken(idToken: string): Promise<GoogleUser> {

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken
    });

    const payload = ticket.getPayload();

    if (!payload) {
        throw new Error("Invalid Google token");
    }

    return {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture
    };
}