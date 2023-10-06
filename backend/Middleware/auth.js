const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorize!' });
  }
  const verified = jwt.verify(token, process.env.JWT_KEY);
  if (!verified) {
    return res.status(401).json({ message: 'Token is not valid!' });
  }
  req.user = verified.id;
  next();
}
module.exports = auth;
