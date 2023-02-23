import { RequestHandler } from 'express';

import { CLIENT_URL } from '../../libs/constant';

export const setCorsHeader: RequestHandler = (req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Content-Type, Credentials'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, OPTIONS, POST, PUT, DELETE, OPTIONS'
  );
  res.header('Access-Control-Allow-Origin', CLIENT_URL);
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  return next();
};
