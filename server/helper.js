const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    console.log("req.headers['authorization']", req.headers['authorization']);
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Token missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
    console.log("req.user.Role",req.user);
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin role required.' });
  }
};

const isUser = (req, res, next) => {
    console.log("req.user.role", req.user.role);
  if (req.user.role === 'user') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. User role required.' });
  }
};

module.exports = {isAdmin, isUser, verifyToken};
