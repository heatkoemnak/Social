const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json('You are not authenticated!');

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.status(403).json('Token is not valid!');
    req.user = user;
    next();
  });
};

