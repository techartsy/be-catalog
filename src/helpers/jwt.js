const jwt = require('jsonwebtoken');
const secretKey = 'diestanalies';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    secretKey
  )
}

const verifyToken = (access_token) => {
  return jwt.verify(access_token, secretKey)
}

module.exports = { generateToken, verifyToken }