import { RequestHandler } from 'express';
import { Maybe } from 'uk-fp';
import { File } from '../../models';

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req;

    const files = await File.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ['id', 'name'],
      //   },
      // ],
      attributes: ['id', 'name', 'content', 'activeTab'],
      where: { owner: user?.id },
    });

    res.json({ ok: true, data: files });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const addFile: RequestHandler = async (req, res, next) => {
  try {
    const { user, body } = req;
    const { name, content } = body;

    const userId = Maybe.wrap(user?.dataValues.id).unwrap();
    const file = await File.create({
      owner: userId,
      name,
      content,
      activeTab: false,
    });

    res.json({ ok: true, data: file });
  } catch (err) {
    const error = err as Error;
    console.error(error.message);

    next(err);
  }
};

export const putFile: RequestHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const { fileId, name, content } = body;

    await File.update({ name, content }, { where: { id: fileId } });

    res.json({
      ok: true,
      data: {
        id: fileId,
        name,
        content,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteFile: RequestHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const { fileId } = body;

    await File.destroy({ where: { id: fileId } });

    res.json({ ok: true, message: 'delete File' });
  } catch (err) {
    next(err);
  }
};
