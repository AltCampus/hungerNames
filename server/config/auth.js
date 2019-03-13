const jwt = require('jsonwebtoken');
const Student = require('../model/Student');

module.exports = {
  isLoggedIn(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.json({ message: 'unAuthorized Student' });
    const BearerToken = token.split(' ');
    const headerBearer = BearerToken[1];
    jwt.verify(headerBearer, 'secret', (err, decode) => {
      if (err) return res.json({
        message: 'Send proper token dude'
      }) 
      next()  
    })

  }
}