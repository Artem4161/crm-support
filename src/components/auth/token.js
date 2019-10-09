const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const config = require('../../config');
const TokenService = require('../../services/refreshToken');

const {
  jwt: { secret },
} = config;

class Token {
  async issueTokenPair(
    userId,
    role,
    expiresIn = config.jwt.expiresIn,
  ) {
    const newRefreshToken = uuid();
    const token = jwt.sign(
      {
        id: userId,
        role,
        timestamp: new Date().getMilliseconds(),
      },
      secret,
      {
        expiresIn,
      },
    );
    await TokenService.add({
      refreshToken: newRefreshToken,
      token,
      userId,
      role,
    });
    return {
      token,
      refreshToken: newRefreshToken,
    };
  }

  verifyToken(token) {
    return jwt.verify(token, secret);
  }
}

module.exports = new Token();
