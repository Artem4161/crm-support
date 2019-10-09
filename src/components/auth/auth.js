const BaseComponent = require('../base');
const {
  AdminService,
  TokenService,
} = require('../../services');
const { verifyToken } = require('./token');

class AuthComponent extends BaseComponent {
  async getToken(req, res) {
    const { authorization } = req.headers;
    const token = this._getToken(authorization);
    const getToken = await TokenService.find({ token });
    if (!getToken) {
      return super.sendError(res, 401, {}, 'Token is invalid');
    }
    return getToken;
  }

  _getToken(str) {
    return str.split('Bearer ')[1];
  }

  async getUser(req, res) {
    let token = await this.getToken(req, res);
    if (!token) {
      return super.sendError(res, 401, {}, 'Token is expired');
    }
    const { userId: _id, token: t } = token;
    const { tokenVerify, role } = verifyToken(t);
    token = token.token;
    if (!tokenVerify) {
      const user = await AdminService.find({ _id });
      return { role, token, user };
    }
    throw new Error('Auth is invalid');
  }
}

module.exports = new AuthComponent();
