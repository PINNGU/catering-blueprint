const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

let adminCollection; 

const failedAttemptsByIP = new Map();
const MAX_FAILED_ATTEMPTS = 3;
const BLOCK_TIME_MS = 15 * 60 * 1000;

function setAdminCollection(collection) {
  adminCollection = collection;
}

function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ success: false, message });
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.ip;

  if (typeof username !== 'string' || typeof password !== 'string') {
    return sendError(res, 400, 'Invalid characters detected in input.');
  }

  if (username.length < 3 || username.length > 20) {
    return sendError(res, 400, 'Invalid characters detected in input.');
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return sendError(res, 400, 'Invalid characters detected in input.');
  }

  if (password.length < 6 || password.length > 100) {
    return sendError(res, 400, 'Invalid characters detected in input.');
  }


  const attemptInfo = failedAttemptsByIP.get(ip);
  if (attemptInfo && attemptInfo.blocked && Date.now() < attemptInfo.blockedUntil) {
    
    return sendError(res, 403, 'Your IP is temporarily blocked. Please try again later.');
  }

  const admin = await adminCollection.findOne({ username });
  if (!admin) {
    handleFailedAttempt(ip);

    return sendError(res, 401, 'Invalid username or password.');
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    handleFailedAttempt(ip);

   return sendError(res, 401, 'Invalid username or password.');
  }


  failedAttemptsByIP.delete(ip);

  const token = jwt.sign(
    { adminId: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
  res.json({ token });
});

function handleFailedAttempt(ip) {
  const prev = failedAttemptsByIP.get(ip) || { count: 0 };
  const updatedCount = prev.count + 1;
  const block = updatedCount >= MAX_FAILED_ATTEMPTS;

  failedAttemptsByIP.set(ip, {
    count: updatedCount,
    blocked: block,
    blockedUntil: block ? Date.now() + BLOCK_TIME_MS : null
  });
}

module.exports = { router, setAdminCollection };
