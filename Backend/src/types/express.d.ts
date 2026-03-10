import { AccessTokenPayload, AuthenticatedUser } from "../models/Auth";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}