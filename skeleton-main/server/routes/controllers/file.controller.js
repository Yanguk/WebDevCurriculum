const File = require('../../models/File');

const getAll = async (req, res, next) => {
  try {
    const { user } = req;

    const files = await File.findAll({ where: { owner: user.id } });

    res.json({ message: 'getAll', data: files });
  } catch (err) {
    next(err);
  }
};

const addFile = async (req, res, next) => {
  try {
    const { user, body } = req;
    const { name, content } = body;

    const file = await File.create({
      owner: user.id,
      name,
      content,
      activeTab: true,
    });

    res.json({ ok: true, data: file });
  } catch (err) {
    next(err);
  }
};

const deleteFile = (req, res, next) => {
  try {
  } catch (err) {}
};

module.exports = {
  getAll,
  addFile,
  deleteFile,
};
