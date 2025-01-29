const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: 'Login first' });
  }

  try {
    const decoded = jwt.verify(token, "hgsfjahjf");
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
