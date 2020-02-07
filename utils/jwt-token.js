const jwt = require("jsonwebtoken");

const config = {
  SESSION: {
    jwtSecret: 'mobifone-ebil-scret-key'
  }
}

const jwtToken = (data = {}) => {
    try {
        return jwt.sign(data, config.SESSION.jwtSecret);
    } catch {
        return null;
    }
}

const pareJwtToken = (token) => {
    try {
        return jwt.verify(token, config.SESSION.jwtSecret);
    } catch {
        return null;
    }
}

module.exports = {
  jwtToken,
  pareJwtToken
}