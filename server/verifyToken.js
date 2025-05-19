const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

let adminCollection; // We will inject this from server.js

function setAdminCollection(collection) {
  adminCollection = collection;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Authorization header:', authHeader); // 🪵 DEBUG HERE
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided'); // 🪵
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err); // 🪵
      return res.sendStatus(403);
    }

    req.adminId = decoded.adminId;
    next();
  });
}
module.exports = authenticateToken;
module.exports.setAdminCollection = setAdminCollection;

