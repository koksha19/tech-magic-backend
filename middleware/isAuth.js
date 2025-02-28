const jwt = require('jsonwebtoken');
const handleError = require('../util/handleError');

const isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      next(error);
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.customerId = decodedToken.customerId;
    req.roles = decodedToken.roles;
    next();
  } catch (error) {
    handleError(error, next);
  }
};

module.exports = isAuth;
