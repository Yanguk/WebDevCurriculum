import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PRIVATE_KEY } from '../../libs/constant';
import UserRequest from '../../types/UserRequest';
import User from '../../models/User';
import Some from '../../types/Option';

export const verifyToken: RequestHandler = async (
  req: UserRequest,
  _res,
  next
) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('토큰이 존재하지 않음');
    }

    const decoded = jwt.verify(token, PRIVATE_KEY) as JwtPayload;

    const user = Some.wrapNull(
      await User.findOne({ where: { userId: decoded.id } })
    ).unwrap();

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
