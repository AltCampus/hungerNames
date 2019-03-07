const jwt = require('jsonwebtoken');
const User = require('../model/User');

module.exports = {
  isLoggedIn(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.json({ message: 'unAuthorized user' });
    const BearerToken = token.split(' ');
    const headerBearer = BearerToken[1];
    jwt.verify(headerBearer, 'secret', (err, decodeT) => {
      console.log(decodeT, 'inside auth.js');
      if (err) throw err
      res.json({
        decode,
        message: 'Authorized user'
      })
    })
    next()
  }
}