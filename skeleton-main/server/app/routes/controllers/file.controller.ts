import { RequestHandler } from 'express';
import File from '../../models/File';
import Some from '../../types/Option';
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

    const userId = Some.wrapNull(user?.dataValues.id).unwrap();

    const file = await File.create({
      owner: userId,
      name,
      content,
      activeTab: true,
    });

    res.json({ ok: true, data: file });
  } catch (err) {
    next(err);
  }
};

export const putFile: RequestHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const { fileId, name, content } = body;

    await File.update({ name, content }, { where: { id: fileId } });
  } catch (err) {
    next(err);
  }
};


export const deleteFile: RequestHandler = async (req: UserRequest, res, next) => {
  try {
    const { body } = req;
    const { fileId } = body;

    await File.destroy({ where: { id: fileId } });

    res.json({ ok: true, message: 'delete File' });
  } catch (err) {
    next(err);
  }
};
