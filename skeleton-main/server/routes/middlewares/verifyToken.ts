import { RequestHandler } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PRIVATE_KEY } from "../../libs/constant";
import UserRequest from "../../types/UserRequest";

const User = require('../../models/User');

export const verifyToken: RequestHandler = async (req: UserRequest, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('토큰이 존재하지 않음');
    }

    const decoded = jwt.verify(token, PRIVATE_KEY) as JwtPayload;

    const user = await User.findOne({ where: { userId: decoded.id } });
    req.user = user.dataValues;

    next();
  } catch (err) {
    next(err);
  }
};
