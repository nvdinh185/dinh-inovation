const { pathOr } = require('ramda');
const { pareJwtToken } = require('../utils/jwt-token');

const jwtTokenVerify = (req, res, next) => {
  const token = pathOr(null, ['authorization'], req.headers);

  // console.log('headers', req.headers); 
  // console.log('token', token);  

  const user = pareJwtToken(token);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({
      message: 'Invalid jwt token'
    })
  }
}

module.exports = jwtTokenVerify;