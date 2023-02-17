const router = require('express').Router();
const dbModel = require('../models/DbModel');

router.get('/', async (req, res, next) => {
  try {
    const files = await dbModel.getAll();

    res.json(files);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, content } = req.body;

    if (!name) {
      return res.status(400).json({ ok: false, message: 'name is necessary' });
    }

    await dbModel.writeFile(name, content);
    console.log(`log: write file [${name}]`);

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { oldName, newName } = req.body;

    if (!oldName || !newName) {
      return res
        .status(400)
        .json({ ok: false, message: 'oldName, newName is necessary' });
    }

    await dbModel.updateName(oldName, newName);
    console.log(`log: rename file [${newName}]`);

    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false });
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(req.body);
    if (!name) {
      return res.status(400).json({ ok: false, message: 'name is necessary' });
    }

    await dbModel.remove(name);
    console.log(`log: delete file [${name}]`);

    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false });
  }
});

module.exports = router;
