import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Maybe } from 'uk-fp';

import { PRIVATE_KEY } from '../../libs/constant';
import User from '../../models/User';
import logger from '../../libs/logger';

export const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('토큰이 존재하지 않음');
    }

    const decoded = jwt.verify(token, PRIVATE_KEY) as JwtPayload;

    const user = Maybe.wrap(
      await User.findOne({ where: { id: decoded.id } })
    ).expect('Not found User');

    req.user = user;

    next();
  } catch (err) {
    logger.error(err);

    res.status(403).json({ ok: false, message: 'forbidden' });
  }
};
