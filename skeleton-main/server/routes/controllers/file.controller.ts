import { RequestHandler } from 'express';
import File from '../../models/File';
import UserRequest from '../../types/UserRequest';

export const getAll: RequestHandler = async (req: UserRequest, res, next) => {
  try {
    const { user } = req;

    const files = await File.findAll({ where: { owner: user?.id } });

    res.json({ message: 'getAll', data: files });
  } catch (err) {
    next(err);
  }
};

export const addFile: RequestHandler = async (req: UserRequest, res, next) => {
  try {
    const { user, body } = req;
    const { name, content } = body;

    const file = await File.create({
      owner: user?.id,
      name,
      content,
      activeTab: true,
    });

    res.json({ ok: true, data: file });
  } catch (err) {
    next(err);
  }
};

export const deleteFile: RequestHandler = (req, res, next) => {
  next();
};
