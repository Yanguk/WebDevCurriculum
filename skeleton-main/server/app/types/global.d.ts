import { User } from "../models";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface StatusError extends Error {
  status?: number;
}
