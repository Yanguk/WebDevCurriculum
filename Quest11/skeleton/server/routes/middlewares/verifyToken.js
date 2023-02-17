const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../../libs/constant');
const User = require('../../models/User');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, PRIVATE_KEY);

    const user = await User.findOne({ where: { userId: decoded.id } });
    req.user = user.dataValues;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
