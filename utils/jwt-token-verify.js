const { pathOr } = require('ramda');
const { pareJwtToken } = require('./jwt-token');
const url = require('url');

const jwtTokenVerify = (req, res, next) => {

  let token = pathOr(null, ['x-access-token'], req.headers) || pathOr(null, ['authorization'], req.headers);
  //lấy token theo phương thức kèm url, truyền qua phương thức ?token=
  if (!token) token = url.parse(req.url, true, false).query.token;
  //lấy token theo phương thức post kèm json_data;
  if (!token) token = req.json_data ? req.json_data.token : undefined;
  //cắt bỏ chuỗi Bearer nếu nó có kèm trong token (cái này dùng trong interceptor)
  token = token && token.startsWith('Bearer ') ? token.slice(7) : token;

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