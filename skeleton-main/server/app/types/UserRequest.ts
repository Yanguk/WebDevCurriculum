import { Request } from 'express';
import User from '../models/User';

export default interface UserRequest extends Request {
  user?: User
}
