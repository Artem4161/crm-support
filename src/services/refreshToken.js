const Token = require('../models/token.js');

class TokenService {
  async find(query) {
    Logger.mongodb('Find pair tokens for refresh token');
    const pairTokens = await Token.findOne(query).exec();
    return pairTokens;
  }

  async add(pairTokens) {
    Logger.mongodb('Save pair tokens');
    const data = await new Token(pairTokens).save();
    return data;
  }

  async remove(pairTokens) {
    Logger.mongodb(`Remove pair tokens for token ${pairTokens.token}`);
    const removedPairTokens = await Token.findOneAndRemove({
      token: pairTokens.token,
    }).exec();
    return removedPairTokens;
  }
}

module.exports = new TokenService();
